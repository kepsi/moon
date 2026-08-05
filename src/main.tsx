import React from "react";
import { Root, createRoot } from "react-dom/client";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Coffee,
  Eye,
  Heart,
  Mail,
  MapPin,
  Moon,
  Orbit,
  Sparkles,
  SunMedium,
  Sunrise,
  Sunset,
  User
} from "lucide-react";
import { Body, EclipticGeoMoon, MoonPhase, Observer, SearchMoonPhase, SearchRiseSet } from "astronomy-engine";
import tzLookup from "tz-lookup";
import { getLunarSourceDay, getLunarDaySourceList, type LunarSourceDay } from "./lunarDaySource";
import { getTithiWisdom } from "./tithiSource";
import { getHeroWisdom } from "./heroWisdomSource";
import { getPracticeWisdom, getDreamPrep } from "./practiceWisdomSource";
import { getZodiacSigns } from "./zodiacSource";
import { LanguageProvider, useLanguage, LANGUAGES, type Language } from "./i18n";
import { t, getPhaseNameLabel, WEEKDAY_LABELS, DATE_LOCALE } from "./strings";
import "./styles.css";

type MoonDay = {
  date: Date;
  phaseAngle: number;
  phaseName: string;
  phasePercent: number;
  lunarDayNumber: number;
  tithiNumber: number;
  tithiName: string;
  paksha: "Shukla" | "Krishna";
};

type Coords = { lat: number; lon: number };
type LocationStatus = "idle" | "pending" | "denied" | "unsupported";

type LadderEntry = { number: number; start: Date; end: Date };

// The lunar day carried by the Vronsky Lunar Days symbols (sourced via OM Journal):
// moonrise-to-moonrise when we know the reader's location, otherwise a calendar-day
// (local midnight) estimate.
type SymbolDay = {
  number: number;
  start: Date;
  end: Date;
  approximate: boolean;
  source: LunarSourceDay;
};

const SYNODIC_MONTH = 29.530588853;

const tithiNames = [
  "Pratipada", "Dvitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dvadashi", "Trayodashi", "Chaturdashi"
];

// The 15th tithi is named for which fortnight it closes: Purnima (full moon) in Shukla
// Paksha, Amavasya (new moon) in Krishna Paksha — never a generic "15th tithi".
function getTithiName(tithiNumber: number, paksha: "Shukla" | "Krishna") {
  if (tithiNumber === 15) return paksha === "Shukla" ? "Purnima" : "Amavasya";
  return tithiNames[tithiNumber - 1];
}

function normalizeDegrees(degrees: number) {
  return ((degrees % 360) + 360) % 360;
}

function getMoonZodiac(date: Date, language: Language) {
  const longitude = normalizeDegrees(EclipticGeoMoon(date).lon);
  const signIndex = Math.floor(longitude / 30);

  return {
    longitude,
    sign: getZodiacSigns(language)[signIndex],
    signIndex,
    degreeInSign: Math.floor(longitude % 30)
  };
}

function angularDiff(a: number, b: number) {
  const diff = normalizeDegrees(a - b);
  return diff > 180 ? diff - 360 : diff;
}

function getMoonLongitude(date: Date) {
  return normalizeDegrees(EclipticGeoMoon(date).lon);
}

// Bisects a bracketed sign change to find the moment the Moon's ecliptic longitude crosses targetLon.
function bisectLongitudeCrossing(startMs: number, endMs: number, targetLon: number) {
  let lo = startMs;
  let hi = endMs;
  const loSign = Math.sign(angularDiff(getMoonLongitude(new Date(lo)), targetLon)) || 1;

  for (let i = 0; i < 28; i++) {
    const mid = (lo + hi) / 2;
    const midSign = Math.sign(angularDiff(getMoonLongitude(new Date(mid)), targetLon)) || loSign;
    if (midSign === loSign) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return new Date((lo + hi) / 2);
}

// No built-in search for geocentric Moon longitude crossings, so step in 3h increments to
// bracket the sign change, then bisect. The Moon moves ~13deg/day, so a zodiac sign (30deg)
// is never crossed in under ~2 days — 40 steps of 3h (5 days) is a safe search window.
function findMoonLongitudeCrossing(from: Date, targetLon: number, searchBackward: boolean) {
  const stepMs = (searchBackward ? -3 : 3) * 60 * 60 * 1000;
  let t0 = from.getTime();
  let sign0 = Math.sign(angularDiff(getMoonLongitude(new Date(t0)), targetLon)) || 1;

  for (let i = 0; i < 40; i++) {
    const t1 = t0 + stepMs;
    const sign1 = Math.sign(angularDiff(getMoonLongitude(new Date(t1)), targetLon)) || sign0;
    if (sign1 !== sign0) {
      return bisectLongitudeCrossing(searchBackward ? t1 : t0, searchBackward ? t0 : t1, targetLon);
    }
    t0 = t1;
    sign0 = sign1;
  }

  return from;
}

// Start/end of the Moon's current zodiac sign transit (sign ingress/egress times).
function getZodiacWindow(date: Date, signIndex: number) {
  const lowLon = signIndex * 30;
  const highLon = ((signIndex + 1) * 30) % 360;

  return {
    start: findMoonLongitudeCrossing(date, lowLon, true),
    end: findMoonLongitudeCrossing(date, highLon, false)
  };
}

// Start/end of the current lunar day (tithi): the moments the Moon-Sun angle
// crosses the 12deg boundaries bracketing this tithi.
function getTithiWindow(date: Date, lunarDayNumber: number) {
  const lowAngle = (lunarDayNumber - 1) * 12;
  const highAngle = (lunarDayNumber * 12) % 360;
  const start = SearchMoonPhase(lowAngle, date, -3);
  const end = SearchMoonPhase(highAngle, date, 3);

  return {
    start: start ? start.date : date,
    end: end ? end.date : date
  };
}

function getPhaseName(age: number) {
  if (age < 1.2 || age > 28.3) return "New Moon";
  if (age < 6.4) return "Waxing Crescent";
  if (age < 8.9) return "First Quarter";
  if (age < 13.8) return "Waxing Gibbous";
  if (age < 15.8) return "Full Moon";
  if (age < 21.1) return "Waning Gibbous";
  if (age < 23.6) return "Last Quarter";
  return "Waning Crescent";
}

function getMoonDay(date: Date): MoonDay {
  const phaseAngle = MoonPhase(date);
  const lunarAge = (phaseAngle / 360) * SYNODIC_MONTH;
  const lunarDayNumber = Math.min(30, Math.floor(phaseAngle / 12) + 1);
  const tithiNumber = ((lunarDayNumber - 1) % 15) + 1;
  const paksha = lunarDayNumber <= 15 ? "Shukla" : "Krishna";
  const illumination = (1 - Math.cos((phaseAngle * Math.PI) / 180)) / 2;

  return {
    date,
    phaseAngle,
    phaseName: getPhaseName(lunarAge),
    phasePercent: Math.round(illumination * 100),
    lunarDayNumber,
    tithiNumber,
    tithiName: getTithiName(tithiNumber, paksha),
    paksha
  };
}

// "Lunar day number": the civil, calendar-day version of the tithi — whichever tithi is
// active at local midnight governs the whole calendar date, the way simple moon-calendar
// apps show one "Day N" per date (unlike the precise Tithi, which can flip mid-day).
function getCivilLunarDay(date: Date) {
  const anchor = getMoonDay(atHour(date, 0));
  return {
    number: anchor.lunarDayNumber,
    tithiName: anchor.tithiName,
    start: atHour(date, 0),
    end: atHour(addDays(date, 1), 0)
  };
}

// Builds a run of moonrise-to-moonrise windows for the current lunar month. Day 1 begins at
// the New Moon itself (same anchor as tithi's Day 1) and runs to the first subsequent
// moonrise; every later day runs moonrise to moonrise. Confirmed against OM Journal's own
// site: their "Day 4" started at the moonrise following our un-shifted "Day 3" — an
// off-by-one that this New-Moon-anchored Day 1 corrects. Reused for every symbol-day lookup
// in a render pass instead of re-searching from the New Moon each time.
function buildMoonriseLadder(observer: Observer, from: Date, daysAhead: number): LadderEntry[] {
  const newMoon = SearchMoonPhase(0, from, -40);
  if (!newMoon) return [];

  const firstRise = SearchRiseSet(Body.Moon, observer, 1, newMoon.date, 3);
  if (!firstRise) return [];

  const ladder: LadderEntry[] = [];
  const limit = addDays(from, daysAhead + 2).getTime();
  let start = newMoon.date;
  let end = firstRise.date;
  let number = 1;

  while (start.getTime() < limit && number <= 33) {
    ladder.push({ number, start, end });
    if (end.getTime() >= limit) break;
    const next = SearchRiseSet(Body.Moon, observer, 1, new Date(end.getTime() + 60_000), 3);
    if (!next) break;
    start = end;
    end = next.date;
    number += 1;
  }

  return ladder;
}

function findLadderEntry(ladder: LadderEntry[], date: Date) {
  return ladder.find((entry) => date >= entry.start && date < entry.end);
}

// Resolves the Vronsky Lunar Days "symbol day" for a moment: moonrise-to-moonrise when we have the
// reader's coordinates and a ladder covering that moment, otherwise the civil-day estimate.
function getSymbolDay(date: Date, ladder: LadderEntry[] | null, language: Language): SymbolDay {
  const entry = ladder ? findLadderEntry(ladder, date) : undefined;

  if (entry) {
    return { number: entry.number, start: entry.start, end: entry.end, approximate: false, source: getLunarSourceDay(entry.number, language) };
  }

  const civil = getCivilLunarDay(date);
  return { number: civil.number, start: civil.start, end: civil.end, approximate: true, source: getLunarSourceDay(civil.number, language) };
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(date.getDate() + days);
  return next;
}

function atHour(date: Date, hour: number) {
  const next = new Date(date);
  next.setHours(hour, 0, 0, 0);
  return next;
}

function isSameLocalDate(first: Date, second: Date) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function formatDate(date: Date, timeZone: string | undefined, language: Language) {
  return new Intl.DateTimeFormat(DATE_LOCALE[language], {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone
  }).format(date);
}

function formatClock(date: Date, timeZone: string, language: Language) {
  return new Intl.DateTimeFormat(DATE_LOCALE[language], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone,
    timeZoneName: "short"
  }).format(date);
}

function formatPeriodMoment(date: Date, timeZone: string, language: Language) {
  return new Intl.DateTimeFormat(DATE_LOCALE[language], {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone
  }).format(date);
}

function formatTimeOnly(date: Date, timeZone: string, language: Language) {
  return new Intl.DateTimeFormat(DATE_LOCALE[language], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone
  }).format(date);
}

function moonIconStyle(percent: number, phaseAngle: number) {
  const waxing = phaseAngle <= 180;
  const shade = waxing
    ? `linear-gradient(90deg, rgba(16, 20, 24, 0.82) ${100 - percent}%, transparent ${100 - percent}%)`
    : `linear-gradient(90deg, transparent ${percent}%, rgba(16, 20, 24, 0.82) ${percent}%)`;

  return {
    background: `${shade}, radial-gradient(circle at 38% 36%, #fff8cf 0 14%, #e7d59b 34%, #b3a676 66%, #5a5d54 100%)`
  };
}

function wheelLabelStyle(index: number, total: number, radius = 44, centerOffsetDeg = 0) {
  const angle = (index / total) * 360 - 90 + centerOffsetDeg;
  const radians = (angle * Math.PI) / 180;

  return {
    left: `${50 + Math.cos(radians) * radius}%`,
    top: `${50 + Math.sin(radians) * radius}%`
  };
}

function pointerStyle(degrees: number) {
  return {
    transform: `translate(-50%, -100%) rotate(${degrees}deg)`
  };
}

// Start/end timestamps for a calendar's current unit (lunar day, zodiac sign, ...)
function PeriodRange({
  start,
  end,
  timeZone,
  centered,
  approximate
}: {
  start: Date;
  end: Date;
  timeZone: string;
  centered?: boolean;
  approximate?: boolean;
}) {
  const { language } = useLanguage();

  return (
    <div className={`period-range${centered ? " centered" : ""}${approximate ? " approximate" : ""}`}>
      <div className="period-point">
        <small>{t(approximate ? "startedEstimate" : "started", language)}</small>
        <strong>{formatPeriodMoment(start, timeZone, language)}</strong>
      </div>
      <ChevronRight className="period-arrow" size={14} />
      <div className="period-point align-end">
        <small>{t(approximate ? "endsEstimate" : "ends", language)}</small>
        <strong>{formatPeriodMoment(end, timeZone, language)}</strong>
      </div>
    </div>
  );
}

// Combined dial for the hero: zodiac ring (outer, 12), tithi ring (inner, 30 ticks +
// pointer), moon-day symbol ring (30 ticks + the day's glyph) — all three lunar/solar
// calendars this app tracks, positioned around one moon orb.
function MoonZodiacHero({
  day,
  zodiac,
  symbolDay,
  nextNewMoon,
  nextFullMoon,
  timeZone
}: {
  day: MoonDay;
  zodiac: ReturnType<typeof getMoonZodiac>;
  symbolDay: SymbolDay;
  nextNewMoon: Date | null;
  nextFullMoon: Date | null;
  timeZone: string;
}) {
  const { language } = useLanguage();
  const phaseLabel = getPhaseNameLabel((day.phaseAngle / 360) * SYNODIC_MONTH, language);

  return (
    <div
      className="moon-zodiac-hero"
      aria-label={`${phaseLabel}, ${day.phasePercent}%, Tithi ${day.tithiNumber} (${day.paksha}), ${t("moonInLabel", language, { inPhrase: zodiac.sign.inPhrase })}, ${symbolDay.source.symbol}`}
    >
      <span className="hero-tick-ring zodiac-ring-ticks" aria-hidden="true" />
      <span className="hero-tick-ring tithi-ring" aria-hidden="true" />
      <span className="hero-tick-ring symbol-ring" aria-hidden="true" />

      {getLunarDaySourceList(language).map((source) => (
        <span
          key={source.lunarDay}
          className={`hero-symbol-glyph${source.lunarDay === symbolDay.number ? " active" : ""}`}
          style={wheelLabelStyle(source.lunarDay - 1, 30, 34, 6)}
          title={t("dayLabel", language, { n: source.lunarDay }) + ": " + source.symbol}
        >
          {source.emoji}
        </span>
      ))}

      <div className="hero-tithi-pointer" style={pointerStyle(day.phaseAngle)} />

      {day.tithiName === "Amavasya" ? (
        // New Moon is the boundary shared by Amavasya (ending) and Pratipada (starting) —
        // a seam, not a slot — so its marker sits exactly at bearing 0 (12 o'clock) rather
        // than at a slot-center offset, replacing the plain tithi number for this one day.
        <span
          className="hero-syzygy-marker new-moon"
          style={wheelLabelStyle(0, 1, 24, 0)}
          title={nextNewMoon ? t("newMoonTitle", language, { time: formatPeriodMoment(nextNewMoon, timeZone, language) }) : t("newMoon", language)}
        >
          ● {nextNewMoon ? formatTimeOnly(nextNewMoon, timeZone, language) : ""}
        </span>
      ) : day.tithiName === "Purnima" ? (
        <span
          className="hero-syzygy-marker full-moon"
          style={wheelLabelStyle(0, 1, 24, 180)}
          title={nextFullMoon ? t("fullMoonTitle", language, { time: formatPeriodMoment(nextFullMoon, timeZone, language) }) : t("fullMoon", language)}
        >
          ○ {nextFullMoon ? formatTimeOnly(nextFullMoon, timeZone, language) : ""}
        </span>
      ) : (
        <span
          className="hero-tithi-glyph"
          style={wheelLabelStyle(day.lunarDayNumber - 1, 30, 24, 6)}
          title={`Tithi ${day.tithiNumber} (${day.paksha}): ${day.tithiName}`}
        >
          {day.tithiNumber}
        </span>
      )}

      {getZodiacSigns(language).map((sign, index) => (
        <span
          key={sign.name}
          className={`zodiac-hero-label${index === zodiac.signIndex ? " active" : ""}`}
          style={wheelLabelStyle(index, 12, 46, 15)}
          title={`${sign.name} — ${sign.element} ${sign.mode}`}
        >
          {sign.symbol}
        </span>
      ))}

      <div className="hero-degree-pointer" style={pointerStyle(zodiac.longitude)} />

      <div className="hero-moon-disk" style={moonIconStyle(day.phasePercent, day.phaseAngle)} />

      <div className="hero-moon-badge-wrap">
        <div className="hero-moon-badge">
          <span>{phaseLabel}</span>
          <strong>{day.phasePercent}%</strong>
        </div>
      </div>
    </div>
  );
}

// Tithi panel — the precise Vedic lunar day, driven by the exact Moon-Sun angle. The wheel
// visual now lives combined into the hero dial; this panel carries the traditional
// Panchang-style reference content (deity, tithi class, dos/don'ts).
function TithiPanel({ day, window, timeZone }: { day: MoonDay; window: { start: Date; end: Date }; timeZone: string }) {
  const { language } = useLanguage();
  const wisdom = getTithiWisdom(day.tithiNumber, day.paksha, language);

  return (
    <article className="panel zodiac-guide-panel">
      <div className="panel-heading">
        <Orbit size={19} />
        <h2>{t("tithiLabel", language, { n: day.tithiNumber, paksha: day.tithiName })}</h2>
      </div>

      <div className="zodiac-guide-header">
        <span className="zodiac-symbol-large">{day.tithiNumber}</span>
        <div>
          <div className="zodiac-meta">
            <span>{day.paksha}</span>
            <span>{wisdom.group}</span>
          </div>
          <p className="zodiac-degree-note">{t("ruledBy", language, { deity: wisdom.deity })}</p>
        </div>
      </div>

      <PeriodRange start={window.start} end={window.end} timeZone={timeZone} />

      <p>{wisdom.nature}</p>

      <div className="organ-row">
        <small>{t("favor", language)}</small>
        <div className="organ-chips">
          {wisdom.auspiciousFor.map((item) => (
            <span key={item} className="organ-chip green">{item}</span>
          ))}
        </div>
      </div>

      <div className="organ-row">
        <small>{t("avoid", language)}</small>
        <div className="organ-chips">
          {wisdom.avoid.map((item) => (
            <span key={item} className="organ-chip red">{item}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

// Zodiac guidance text panel (the clock visual has moved into the hero)
function ZodiacGuidancePanel({
  zodiac,
  window,
  timeZone
}: {
  zodiac: ReturnType<typeof getMoonZodiac>;
  window: { start: Date; end: Date };
  timeZone: string;
}) {
  const { language } = useLanguage();

  return (
    <article className="panel zodiac-guide-panel">
      <div className="panel-heading">
        <Sparkles size={19} />
        <h2>{t("moonInLabel", language, { inPhrase: zodiac.sign.inPhrase })}</h2>
      </div>

      <div className="zodiac-guide-header">
        <span className="zodiac-symbol-large">{zodiac.sign.symbol}</span>
        <div>
          <div className="zodiac-meta">
            <span>{zodiac.sign.element}</span>
            <span>{zodiac.sign.mode}</span>
          </div>
          <p className="zodiac-degree-note">{zodiac.degreeInSign}° {zodiac.sign.inPhrase}</p>
        </div>
      </div>

      <PeriodRange start={window.start} end={window.end} timeZone={timeZone} />

      <p>{zodiac.sign.guidance}</p>

      <div className="organ-row">
        <small>{t("favor", language)}</small>
        <div className="organ-chips">
          {zodiac.sign.bestFor.map((item) => (
            <span key={item} className="organ-chip green">{item}</span>
          ))}
        </div>
      </div>

      <div className="organ-row">
        <small>{t("avoid", language)}</small>
        <div className="organ-chips">
          {zodiac.sign.avoid.map((item) => (
            <span key={item} className="organ-chip red">{item}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

// Symbol panel — the Vronsky Lunar Days archetype (sourced via OM Journal), moonrise-to-
// moonrise. The wheel visual now lives combined into the hero dial; this panel carries the
// fuller reference content (tagline, overview, stones, meditation, relationships) alongside
// the existing do/avoid and dream fields.
function SymbolPanel({
  symbolDay,
  timeZone,
  locationStatus,
  onEnableLocation
}: {
  symbolDay: SymbolDay;
  timeZone: string;
  locationStatus: LocationStatus;
  onEnableLocation: () => void;
}) {
  const source = symbolDay.source;
  const { language } = useLanguage();

  return (
    <article className="panel zodiac-guide-panel">
      <div className="panel-heading">
        <BookOpen size={19} />
        <h2>{t("lunarDaySymbolHeading", language, { symbol: source.symbol })}</h2>
      </div>

      <div className="zodiac-guide-header">
        <span className="zodiac-symbol-large" aria-hidden="true">{source.emoji}</span>
        <div>
          <div className="zodiac-meta">
            <span>{t("dayLabel", language, { n: symbolDay.number })}</span>
          </div>
          <p className="zodiac-degree-note">{source.tagline}</p>
        </div>
      </div>

      {symbolDay.approximate ? (
        <button className="location-prompt" onClick={onEnableLocation} disabled={locationStatus === "pending"}>
          <MapPin size={14} />
          {locationStatus === "pending"
            ? t("locatingHero", language)
            : locationStatus === "denied"
            ? t("locationBlockedSymbol", language)
            : locationStatus === "unsupported"
            ? t("locationUnsupportedSymbol", language)
            : t("enableLocationSymbol", language)}
        </button>
      ) : null}

      <PeriodRange start={symbolDay.start} end={symbolDay.end} timeZone={timeZone} approximate={symbolDay.approximate} />

      <p>{source.overview}</p>

      <div className="organ-row">
        <small>{t("favor", language)}</small>
        <div className="organ-chips">
          {source.doToday.map((item) => (
            <span key={item} className="organ-chip green">{item}</span>
          ))}
        </div>
      </div>

      <div className="organ-row">
        <small>{t("avoid", language)}</small>
        <div className="organ-chips">
          {source.avoidToday.map((item) => (
            <span key={item} className="organ-chip red">{item}</span>
          ))}
        </div>
      </div>

      <a href={source.sourceUrl} target="_blank" rel="noreferrer">
        {t("sourceLinkLabel", language, { n: symbolDay.number })}
      </a>
    </article>
  );
}

// Body wisdom — active areas from all three sources (color-tagged gold/silver/blue for
// tithi/vronsky/zodiac), do/avoid chips, meditation, and food guidance.
function BodyWisdomPanel({
  day,
  zodiac,
  symbolDay
}: {
  day: MoonDay;
  zodiac: ReturnType<typeof getMoonZodiac>;
  symbolDay: SymbolDay;
}) {
  const daySource = symbolDay.source;
  const { language } = useLanguage();
  const tithiWisdom = getTithiWisdom(day.tithiNumber, day.paksha, language);

  return (
    <article className="panel body-wisdom-panel">
      <div className="panel-heading">
        <Activity size={19} />
        <h2>{t("bodyNourishmentHeading", language)}</h2>
      </div>

      <div className="wisdom-grid">
        <div className="wisdom-section">
          <h3>{t("activeAreas", language)}</h3>
          <div className="organ-chips">
            {tithiWisdom.activeOrgans.map((organ) => (
              <span key={`tithi-${organ}`} className="organ-chip gold">{organ}</span>
            ))}
            {daySource.activeOrgans.map((organ) => (
              <span key={`symbol-${organ}`} className="organ-chip silver">{organ}</span>
            ))}
            {zodiac.sign.activeOrgans.map((organ) => (
              <span key={`zodiac-${organ}`} className="organ-chip blue">{organ}</span>
            ))}
          </div>
        </div>

        <div className="wisdom-section">
          <h3>{t("favor", language)}</h3>
          <div className="organ-chips">
            {tithiWisdom.dietFavor.map((item) => (
              <span key={`tithi-${item}`} className="organ-chip green">{item}</span>
            ))}
            {daySource.foodFavor.map((item) => (
              <span key={`symbol-${item}`} className="organ-chip green">{item}</span>
            ))}
            {zodiac.sign.foodFavor.map((item) => (
              <span key={`zodiac-${item}`} className="organ-chip green">{item}</span>
            ))}
          </div>
        </div>

        <div className="wisdom-section">
          <h3>{t("avoid", language)}</h3>
          <div className="organ-chips">
            {tithiWisdom.dietAvoid.map((item) => (
              <span key={`tithi-${item}`} className="organ-chip red">{item}</span>
            ))}
            {daySource.foodAvoid.map((item) => (
              <span key={`symbol-${item}`} className="organ-chip red">{item}</span>
            ))}
            {zodiac.sign.foodAvoid.map((item) => (
              <span key={`zodiac-${item}`} className="organ-chip red">{item}</span>
            ))}
          </div>
        </div>

        <div className="wisdom-section">
          <h3 className="silver">{t("meditationLabel", language)}</h3>
          <p>{daySource.meditation}</p>
        </div>

        <div className="wisdom-section food-section">
          <h3 className="silver">{t("foodMoonDayLabel", language, { n: symbolDay.number })}</h3>
          <p>{daySource.foodNote}</p>
          <h3 className="blue">{t("foodZodiacLabel", language, { symbol: zodiac.sign.symbol, name: zodiac.sign.name })}</h3>
          <p>{zodiac.sign.foodNote}</p>
        </div>
      </div>
    </article>
  );
}

// Relationships — merges the Vronsky lunar-day angle (silver) with the Moon-sign angle (blue).
function RelationshipsPanel({
  zodiac,
  symbolDay
}: {
  zodiac: ReturnType<typeof getMoonZodiac>;
  symbolDay: SymbolDay;
}) {
  const { language } = useLanguage();

  return (
    <article className="panel relationships-panel">
      <div className="panel-heading">
        <Heart size={19} />
        <h2>{t("relationshipsHeading", language)}</h2>
      </div>

      <div className="wisdom-grid dual-source-grid">
        <div className="wisdom-section">
          <h3 className="silver">{t("moonDayLabel", language, { n: symbolDay.number, symbol: symbolDay.source.symbol })}</h3>
          <p>{symbolDay.source.relationships}</p>
        </div>
        <div className="wisdom-section">
          <h3 className="blue">{t("moonInLabel", language, { inPhrase: zodiac.sign.inPhrase })}</h3>
          <p>{zodiac.sign.relationships}</p>
        </div>
      </div>
    </article>
  );
}

// Business, Housework & Garden — same dual-source layout as Relationships; the zodiac side
// additionally carries gardening guidance (om-journal's root/leaf/flower/fruit-day theory).
function BusinessHouseworkGardenPanel({
  zodiac,
  symbolDay
}: {
  zodiac: ReturnType<typeof getMoonZodiac>;
  symbolDay: SymbolDay;
}) {
  const { language } = useLanguage();

  return (
    <article className="panel business-panel">
      <div className="panel-heading">
        <Briefcase size={19} />
        <h2>{t("businessHouseworkGardenHeading", language)}</h2>
      </div>

      <div className="wisdom-grid dual-source-grid">
        <div className="wisdom-section">
          <h3 className="silver">{t("moonDayLabel", language, { n: symbolDay.number, symbol: symbolDay.source.symbol })}</h3>
          <p>{symbolDay.source.business}</p>
          <p>{symbolDay.source.housework}</p>
        </div>
        <div className="wisdom-section">
          <h3 className="blue">{t("moonInLabel", language, { inPhrase: zodiac.sign.inPhrase })}</h3>
          <p>{zodiac.sign.business}</p>
          <p>{zodiac.sign.housework}</p>
          <p>{zodiac.sign.gardening}</p>
        </div>
      </div>
    </article>
  );
}

// The topbar's calendar button: a small month-grid popover for jumping straight to any date,
// instead of paging through the hero's prev/next-day arrows one day at a time.
function CalendarButton({ selectedDate, onSelectDate }: { selectedDate: Date; onSelectDate: (date: Date) => void }) {
  const { language } = useLanguage();
  const [open, setOpen] = React.useState(false);
  const [viewMonth, setViewMonth] = React.useState(() => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  const wrapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;

    const handlePointer = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const handleToggle = () => {
    setViewMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
    setOpen((value) => !value);
  };

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: firstWeekday }, (): Date | null => null),
    ...Array.from({ length: daysInMonth }, (_, index) => new Date(year, month, index + 1))
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const today = new Date();

  return (
    <div className="calendar-button-wrap" ref={wrapRef}>
      <button className="icon-button calendar-button" aria-label={t("openCalendarAria", language)} aria-expanded={open} onClick={handleToggle}>
        <CalendarDays size={19} />
      </button>

      {open ? (
        <div className="calendar-popover">
          <div className="calendar-popover-header">
            <div className="calendar-nav-group">
              <button className="calendar-nav-btn" onClick={() => setViewMonth(new Date(year - 1, month, 1))} aria-label={t("previousYearAria", language)}>
                <ChevronsLeft size={15} />
              </button>
              <button className="calendar-nav-btn" onClick={() => setViewMonth(new Date(year, month - 1, 1))} aria-label={t("previousMonthAria", language)}>
                <ChevronLeft size={15} />
              </button>
            </div>
            <span>{viewMonth.toLocaleDateString(DATE_LOCALE[language], { month: "long", year: "numeric" })}</span>
            <div className="calendar-nav-group">
              <button className="calendar-nav-btn" onClick={() => setViewMonth(new Date(year, month + 1, 1))} aria-label={t("nextMonthAria", language)}>
                <ChevronRight size={15} />
              </button>
              <button className="calendar-nav-btn" onClick={() => setViewMonth(new Date(year + 1, month, 1))} aria-label={t("nextYearAria", language)}>
                <ChevronsRight size={15} />
              </button>
            </div>
          </div>

          <div className="calendar-popover-weekdays">
            {WEEKDAY_LABELS[language].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          <div className="calendar-popover-grid">
            {cells.map((date, index) =>
              date ? (
                <button
                  key={date.toISOString()}
                  className={`calendar-day${isSameLocalDate(date, selectedDate) ? " selected" : ""}${
                    isSameLocalDate(date, today) ? " today" : ""
                  }`}
                  onClick={() => {
                    onSelectDate(date);
                    setOpen(false);
                  }}
                >
                  {date.getDate()}
                </button>
              ) : (
                <span key={index} />
              )
            )}
          </div>

          <button
            className="calendar-popover-today"
            onClick={() => {
              onSelectDate(new Date());
              setOpen(false);
            }}
          >
            {t("jumpToToday", language)}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher" role="group" aria-label="Language">
      {LANGUAGES.map((option) => (
        <button
          key={option.code}
          className={`language-switcher-option${option.code === language ? " active" : ""}`}
          onClick={() => setLanguage(option.code)}
          aria-pressed={option.code === language}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

const COORDS_KEY = "mondkalender.coords";

function App() {
  const { language } = useLanguage();
  const [selectedDate, setSelectedDate] = React.useState(() => new Date());
  const [now, setNow] = React.useState(() => new Date());
  const [deviceTimeZone] = React.useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [coords, setCoords] = React.useState<Coords | null>(() => {
    const saved = window.localStorage.getItem(COORDS_KEY);
    return saved ? (JSON.parse(saved) as Coords) : null;
  });
  const [locationStatus, setLocationStatus] = React.useState<LocationStatus>("idle");
  const [dreamPart, setDreamPart] = React.useState<"early" | "late">("early");

  const handleEnableLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocationStatus("unsupported");
      return;
    }

    setLocationStatus("pending");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const next = { lat: position.coords.latitude, lon: position.coords.longitude };
        setCoords(next);
        window.localStorage.setItem(COORDS_KEY, JSON.stringify(next));
        setLocationStatus("idle");
      },
      () => setLocationStatus("denied"),
      { maximumAge: 6 * 60 * 60 * 1000, timeout: 10_000 }
    );
  };

  React.useEffect(() => {
    const clock = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(clock);
  }, []);

  const selectedMoment = isSameLocalDate(selectedDate, now) ? now : atHour(selectedDate, 12);
  const today = getMoonDay(selectedMoment);
  // A lunar day can change mid-sleep, so the dream you woke with may belong to either the
  // lunar day active at bedtime or the one active toward morning. Offer both when they differ.
  const bedtimeMoment = atHour(addDays(selectedDate, -1), 23);
  const morningMoment = atHour(selectedDate, 7);
  const tonightBedtimeMoment = atHour(selectedDate, 23);
  const moonZodiac = getMoonZodiac(today.date, language);
  const week = Array.from({ length: 7 }, (_, index) => getMoonDay(atHour(addDays(selectedDate, index - 2), 12)));

  const dayKey = today.date.toDateString();
  React.useEffect(() => {
    setDreamPart("early");
  }, [dayKey]);
  const tithiWindow = React.useMemo(
    () => getTithiWindow(today.date, today.lunarDayNumber),
    [dayKey, today.lunarDayNumber]
  );
  const zodiacWindow = React.useMemo(
    () => getZodiacWindow(today.date, moonZodiac.signIndex),
    [dayKey, moonZodiac.signIndex]
  );

  const observer = React.useMemo(() => (coords ? new Observer(coords.lat, coords.lon, 0) : null), [coords]);
  // Once we know where the reader actually is, prefer that place's zone over the browser/OS
  // zone — those diverge while traveling (e.g. a UK-configured laptop carried to Berlin),
  // and every rise/set and window time below must be read in local wall-clock time to be
  // meaningful.
  const locationTimeZone = React.useMemo(() => {
    if (!coords) return null;
    try {
      return tzLookup(coords.lat, coords.lon);
    } catch {
      return null;
    }
  }, [coords]);
  const timeZone = locationTimeZone ?? deviceTimeZone;

  const moonriseLadder = React.useMemo(
    () => (observer ? buildMoonriseLadder(observer, today.date, 9) : null),
    [observer, dayKey]
  );

  const civilLunarDay = getCivilLunarDay(selectedDate);
  const symbolDay = getSymbolDay(today.date, moonriseLadder, language);
  const heroWisdom = getHeroWisdom(
    symbolDay.number,
    symbolDay.source.doToday,
    { signIndex: moonZodiac.signIndex, bestFor: moonZodiac.sign.bestFor },
    language
  );
  const practiceWisdom = getPracticeWisdom(symbolDay.number, moonZodiac.signIndex, language);

  const wakeSymbolDayBedtime = getSymbolDay(bedtimeMoment, moonriseLadder, language);
  const wakeSymbolDayMorning = getSymbolDay(morningMoment, moonriseLadder, language);
  // Only offer the toggle when we have real moonrise data: the civil-day fallback changes at
  // every local midnight regardless of the actual moon, which would make it fire every single
  // night and say nothing meaningful.
  const dreamSplitsOvernight =
    !wakeSymbolDayBedtime.approximate && wakeSymbolDayBedtime.number !== wakeSymbolDayMorning.number;
  const wakeSymbolDay = dreamPart === "late" && dreamSplitsOvernight ? wakeSymbolDayMorning : wakeSymbolDayBedtime;

  // Tonight's own bedtime lunar day (may already differ from today's displayed one) — used only
  // to check whether it's a day whose dream calls for preparing before sleep.
  const tonightSymbolDay = getSymbolDay(tonightBedtimeMoment, moonriseLadder, language);
  const dreamPrep = getDreamPrep(tonightSymbolDay.number, language);

  const weekSymbolDays = week.map((day) => getSymbolDay(day.date, moonriseLadder, language));

  const todayMoonrise = moonriseLadder ? findLadderEntry(moonriseLadder, today.date) : undefined;
  const todayMoonset =
    observer && todayMoonrise ? SearchRiseSet(Body.Moon, observer, -1, todayMoonrise.start, 2) : null;
  const todaySunrise = observer ? SearchRiseSet(Body.Sun, observer, 1, atHour(today.date, 0), 2) : null;
  const todaySunset = observer ? SearchRiseSet(Body.Sun, observer, -1, atHour(today.date, 0), 2) : null;

  // Exact instants of syzygy (phase angle 0/180), independent of location — always shown.
  // Search from yesterday's midnight, not "now": searching from "now" would skip today's own
  // syzygy once it's already passed today and jump straight to next month's instead.
  const syzygySearchAnchor = atHour(addDays(today.date, -1), 0);
  const nextNewMoon = SearchMoonPhase(0, syzygySearchAnchor, 40);
  const nextFullMoon = SearchMoonPhase(180, syzygySearchAnchor, 40);

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <nav className="topbar" aria-label={t("appLabel", language)}>
          <div className="brand">
            <span className="brand-mark">
              <Moon size={18} strokeWidth={2.3} />
            </span>
            <span className="brand-name">Mondkalender</span>
          </div>
          <div className="top-actions">
            <div className="clock-row">
              <LanguageSwitcher />
              <button
                className="icon-button"
                onClick={() =>
                  document.getElementById("support-cta")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                aria-label={t("accountAria", language)}
              >
                <User size={18} />
              </button>
              <a
                className="icon-button"
                href="https://buymeacoffee.com/drliebhoff"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("buyMeCoffeeAria", language)}
              >
                <Coffee size={18} />
              </a>
              <div
                className="live-clock"
                aria-label={`Current time in ${timeZone}`}
                title={
                  locationTimeZone && locationTimeZone !== deviceTimeZone
                    ? t("locationTimeZoneTitle", language, { tz: deviceTimeZone })
                    : undefined
                }
              >
                <span>{formatClock(now, timeZone, language)}</span>
                <small className="live-clock-zone">
                  {timeZone}
                  {locationTimeZone && locationTimeZone !== deviceTimeZone ? <MapPin size={10} /> : null}
                </small>
              </div>
            </div>
            <CalendarButton selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          </div>
        </nav>

        <div className="hero-grid">
          <MoonZodiacHero
            day={today}
            zodiac={moonZodiac}
            symbolDay={symbolDay}
            nextNewMoon={nextNewMoon ? nextNewMoon.date : null}
            nextFullMoon={nextFullMoon ? nextFullMoon.date : null}
            timeZone={timeZone}
          />

          <article className="daily-reading">
            <div className="date-row">
              <button
                className="icon-button"
                onClick={() => setSelectedDate(addDays(selectedDate, -1))}
                aria-label={t("previousDayAria", language)}
              >
                <ChevronLeft size={19} />
              </button>
              <p>{formatDate(today.date, timeZone, language)}</p>
              <button
                className="icon-button"
                onClick={() => setSelectedDate(addDays(selectedDate, 1))}
                aria-label={t("nextDayAria", language)}
              >
                <ChevronRight size={19} />
              </button>
            </div>

            <div className="tithi-line">
              <span title={t("lunarDayCivilTitle", language)}>
                {civilLunarDay.tithiName === "Purnima"
                  ? t("fullMoon", language)
                  : civilLunarDay.tithiName === "Amavasya"
                  ? t("newMoon", language)
                  : t("lunarDayLabel", language, { n: civilLunarDay.number })}
              </span>
              <span className="tithi-sep" aria-hidden="true">–</span>
              <span title={t("zodiacTitle", language)}>{t("moonInLabel", language, { inPhrase: moonZodiac.sign.inPhrase })}</span>
              <span className="tithi-sep" aria-hidden="true">–</span>
              <span title={t("vronskySymbolTitle", language)}>{symbolDay.source.symbol}</span>
              <span className="tithi-sep" aria-hidden="true">–</span>
              <span title={t("tithiPreciseTitle", language)}>
                {today.tithiName === "Purnima" || today.tithiName === "Amavasya"
                  ? today.tithiName
                  : t("tithiLabel", language, { n: today.tithiNumber, paksha: today.paksha })}
              </span>
            </div>

            {observer ? (
              <>
                <div className="rise-set-row">
                  <span>
                    <ArrowUpRight size={14} /> {t("moonrise", language)} {todayMoonrise ? formatTimeOnly(todayMoonrise.start, timeZone, language) : "—"}
                  </span>
                  <span>
                    <ArrowDownRight size={14} /> {t("moonset", language)} {todayMoonset ? formatTimeOnly(todayMoonset.date, timeZone, language) : "—"}
                  </span>
                </div>
                <div className="rise-set-row sun-row">
                  <span>
                    <Sunrise size={14} /> {t("sunrise", language)} {todaySunrise ? formatTimeOnly(todaySunrise.date, timeZone, language) : "—"}
                  </span>
                  <span>
                    <Sunset size={14} /> {t("sunset", language)} {todaySunset ? formatTimeOnly(todaySunset.date, timeZone, language) : "—"}
                  </span>
                </div>
              </>
            ) : (
              <button className="location-prompt hero-location-prompt" onClick={handleEnableLocation} disabled={locationStatus === "pending"}>
                <MapPin size={14} />
                {locationStatus === "pending"
                  ? t("locatingHero", language)
                  : locationStatus === "denied"
                  ? t("locationBlockedHero", language)
                  : locationStatus === "unsupported"
                  ? t("locationUnsupportedHero", language)
                  : t("enableLocationHero", language)}
              </button>
            )}

            <h1>{heroWisdom.headline}</h1>
            <p className="guidance">{heroWisdom.guidance}</p>

            <div className="focus-list">
              {heroWisdom.focus.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="calendar-trio">
        <ZodiacGuidancePanel zodiac={moonZodiac} window={zodiacWindow} timeZone={timeZone} />
        <SymbolPanel symbolDay={symbolDay} timeZone={timeZone} locationStatus={locationStatus} onEnableLocation={handleEnableLocation} />
        <TithiPanel day={today} window={tithiWindow} timeZone={timeZone} />
      </section>

      <section className="content-grid">
        <BodyWisdomPanel day={today} zodiac={moonZodiac} symbolDay={symbolDay} />

        <RelationshipsPanel zodiac={moonZodiac} symbolDay={symbolDay} />

        <BusinessHouseworkGardenPanel zodiac={moonZodiac} symbolDay={symbolDay} />

        <article className="panel dream-panel">
          <div className="panel-heading">
            <Eye size={19} />
            <h2>{t("dreamsHeading", language)}</h2>
          </div>
          <div className="dream-context">
            <div className="dream-context-heading">
              <span>{t("dreamWokeWith", language)}</span>
              {dreamSplitsOvernight ? (
                <div className="dream-toggle">
                  <button
                    className="icon-button"
                    onClick={() => setDreamPart("early")}
                    disabled={dreamPart === "early"}
                    aria-label={t("dreamEarlierAria", language)}
                  >
                    <ChevronLeft size={13} />
                  </button>
                  <small>{t(dreamPart === "early" ? "dreamEarlierLabel" : "dreamLaterLabel", language)}</small>
                  <button
                    className="icon-button"
                    onClick={() => setDreamPart("late")}
                    disabled={dreamPart === "late"}
                    aria-label={t("dreamLaterAria", language)}
                  >
                    <ChevronRight size={13} />
                  </button>
                </div>
              ) : null}
            </div>
            <strong>
              {wakeSymbolDay.source.emoji} {t("dayLabel", language, { n: wakeSymbolDay.number })} · {wakeSymbolDay.source.symbol}
            </strong>
            <span className="dream-window">
              {formatPeriodMoment(wakeSymbolDay.start, timeZone, language)} – {formatPeriodMoment(wakeSymbolDay.end, timeZone, language)}
              {wakeSymbolDay.approximate ? t("dreamEstimate", language) : null}
            </span>
          </div>
          <h3>{wakeSymbolDay.source.dreamFocus}</h3>
          <p>{wakeSymbolDay.source.dreamGuidance}</p>
          <p>{wakeSymbolDay.source.dreamTiming}</p>
          <p>{wakeSymbolDay.source.dreamTip}</p>
          {wakeSymbolDay.source.dreamRemedy ? <p>{wakeSymbolDay.source.dreamRemedy}</p> : null}
        </article>

        <article className="panel ritual-panel">
          <div className="panel-heading">
            <SunMedium size={19} />
            <h2>{t("todaysPracticeHeading", language)}</h2>
          </div>
          <p>{practiceWisdom}</p>
          {dreamPrep ? <p className="dream-prep-note">{dreamPrep}</p> : null}
          <blockquote>{symbolDay.source.tagline}</blockquote>
        </article>

        <section className="week-strip" aria-label={t("weekOutlookAria", language)}>
          {week.map((day, index) => (
            <button
              className={`day-chip${day.date.toDateString() === selectedDate.toDateString() ? " active" : ""}`}
              key={day.date.toISOString()}
              onClick={() => setSelectedDate(day.date)}
            >
              <span>{new Intl.DateTimeFormat(DATE_LOCALE[language], { weekday: "short" }).format(day.date)}</span>
              <i style={moonIconStyle(day.phasePercent, day.phaseAngle)} />
              <strong>{weekSymbolDays[index].source.emoji}</strong>
              <small>{weekSymbolDays[index].number}</small>
            </button>
          ))}
        </section>

        <section className="support-cta" id="support-cta">
          <p>{t("supportCtaText", language)}</p>
          <div className="support-cta-actions">
            <a className="support-email" href="mailto:moon@liebhoff.com">
              <Mail size={16} />
              moon@liebhoff.com
            </a>
            <a
              className="support-coffee"
              href="https://buymeacoffee.com/drliebhoff"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt={t("buyMeCoffeeAlt", language)}
                height={36}
              />
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}

declare global {
  interface Window {
    mondkalenderRoot?: Root;
  }
}

const rootElement = document.getElementById("root")!;
window.mondkalenderRoot ??= createRoot(rootElement);
window.mondkalenderRoot.render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
