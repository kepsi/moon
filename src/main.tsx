import React from "react";
import { Root, createRoot } from "react-dom/client";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  MapPin,
  Moon,
  Orbit,
  Sparkles,
  SunMedium,
  Sunrise,
  Sunset
} from "lucide-react";
import { Body, EclipticGeoMoon, MoonPhase, Observer, SearchMoonPhase, SearchRiseSet } from "astronomy-engine";
import tzLookup from "tz-lookup";
import { getLunarSourceDay, lunarDaySource, type LunarSourceDay } from "./lunarDaySource";
import { getTithiWisdom } from "./tithiSource";
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
  archetype: string;
  headline: string;
  guidance: string;
  focus: string[];
  ritual: string;
  affirmation: string;
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

type ZodiacSign = {
  name: string;
  shortName: string;
  symbol: string;
  element: string;
  mode: string;
  guidance: string;
  bestFor: string[];
  watch: string;
  activeOrgans: string[];
  foodNote: string;
};

const SYNODIC_MONTH = 29.530588853;
const zodiacSigns: ZodiacSign[] = [
  {
    name: "Aries",
    shortName: "Ari",
    symbol: "♈",
    element: "Fire",
    mode: "Cardinal",
    guidance: "Moon in Aries wants honest movement. Lead with courage, start the thing, and let emotion pass through action instead of argument.",
    bestFor: ["first steps", "body heat", "decisions"],
    watch: "Impatience, sharp replies, rushing before the body has caught up.",
    activeOrgans: ["Head", "Brain", "Eyes", "Face"],
    foodNote: "Iron-rich vegetables and energizing foods. Avoid excess spice or caffeine that overheats the system."
  },
  {
    name: "Taurus",
    shortName: "Tau",
    symbol: "♉",
    element: "Earth",
    mode: "Fixed",
    guidance: "Moon in Taurus steadies the nervous system through touch, food, nature, and slow work. Choose what is simple and real.",
    bestFor: ["rest", "money care", "sensual grounding"],
    watch: "Stubbornness, comfort loops, mistaking safety for aliveness.",
    activeOrgans: ["Throat", "Neck", "Thyroid", "Vocal cords", "Ears"],
    foodNote: "Nourishing, grounding foods eaten slowly. Avoid overeating; chew thoroughly and savor the meal."
  },
  {
    name: "Gemini",
    shortName: "Gem",
    symbol: "♊",
    element: "Air",
    mode: "Mutable",
    guidance: "Moon in Gemini opens the mind. Talk, write, ask, sort, and let curiosity loosen what has become too fixed.",
    bestFor: ["messages", "learning", "light planning"],
    watch: "Scattered attention, overexplaining, living only in the head.",
    activeOrgans: ["Shoulders", "Arms", "Hands", "Lungs", "Nervous system"],
    foodNote: "Light, varied foods. Breathing exercises and lung-supportive herbs benefit this placement."
  },
  {
    name: "Cancer",
    shortName: "Can",
    symbol: "♋",
    element: "Water",
    mode: "Cardinal",
    guidance: "Moon in Cancer turns attention toward home, memory, and emotional shelter. Tend the inner room before performing for the outer world.",
    bestFor: ["home care", "family repair", "soft meals"],
    watch: "Moodiness, clinging, confusing old feelings with present facts.",
    activeOrgans: ["Stomach", "Breasts", "Chest", "Lymphatic system"],
    foodNote: "Comfort foods and easy-to-digest meals. Warm soups, dairy, and gentle stews are supportive and soothing."
  },
  {
    name: "Leo",
    shortName: "Leo",
    symbol: "♌",
    element: "Fire",
    mode: "Fixed",
    guidance: "Moon in Leo asks for warm-hearted expression. Create, celebrate, praise generously, and let visibility serve joy.",
    bestFor: ["creativity", "romance", "confidence"],
    watch: "Pride, dramatizing a need that could be spoken plainly.",
    activeOrgans: ["Heart", "Spine", "Upper back"],
    foodNote: "Warming, generous foods. Heart-healthy choices: berries, leafy greens, olive oil."
  },
  {
    name: "Virgo",
    shortName: "Vir",
    symbol: "♍",
    element: "Earth",
    mode: "Mutable",
    guidance: "Moon in Virgo restores through order and usefulness. Edit the system, care for the body, and make one thing cleaner than it was.",
    bestFor: ["routines", "health notes", "organizing"],
    watch: "Perfectionism, worry disguised as responsibility.",
    activeOrgans: ["Intestines", "Digestive system", "Pancreas", "Spleen"],
    foodNote: "Clean, easily digestible foods. Fermented foods and fiber support the intestines. Eat regular, moderate meals."
  },
  {
    name: "Libra",
    shortName: "Lib",
    symbol: "♎",
    element: "Air",
    mode: "Cardinal",
    guidance: "Moon in Libra seeks proportion, beauty, and right relationship. Choose the graceful repair, not the pleasing performance.",
    bestFor: ["conversation", "design", "agreements"],
    watch: "Avoiding truth to keep the surface smooth.",
    activeOrgans: ["Kidneys", "Lower back", "Adrenal glands", "Skin"],
    foodNote: "Alkaline, balanced diet. Cucumber, watermelon, and lemon water support the kidneys."
  },
  {
    name: "Scorpio",
    shortName: "Sco",
    symbol: "♏",
    element: "Water",
    mode: "Fixed",
    guidance: "Moon in Scorpio deepens the emotional field. Keep confidence, investigate gently, and let honesty transform what secrecy has hardened.",
    bestFor: ["shadow work", "intimacy", "release"],
    watch: "Suspicion, control, testing people instead of trusting signals.",
    activeOrgans: ["Reproductive organs", "Colon", "Bladder", "Pelvis"],
    foodNote: "Cleansing, regenerating foods. Avoid extremes; deep, purposeful nourishment is favored."
  },
  {
    name: "Sagittarius",
    shortName: "Sag",
    symbol: "♐",
    element: "Fire",
    mode: "Mutable",
    guidance: "Moon in Sagittarius needs meaning and horizon. Study, move, pray, tell the truth kindly, and let perspective return.",
    bestFor: ["travel plans", "teaching", "faith"],
    watch: "Restlessness, bluntness, skipping details that matter.",
    activeOrgans: ["Hips", "Thighs", "Liver", "Sciatic nerve"],
    foodNote: "Generous, liver-supportive foods. Bitter greens, beets, and artichoke are especially beneficial."
  },
  {
    name: "Capricorn",
    shortName: "Cap",
    symbol: "♑",
    element: "Earth",
    mode: "Cardinal",
    guidance: "Moon in Capricorn favors discipline and devotion. Make the promise practical, respect limits, and build what can hold weight.",
    bestFor: ["priorities", "career", "long-term plans"],
    watch: "Coldness, self-pressure, measuring worth only by output.",
    activeOrgans: ["Knees", "Bones", "Joints", "Teeth", "Nails"],
    foodNote: "Mineral-rich foods: bone broth, leafy greens, dairy. Support structural health and the skeletal system."
  },
  {
    name: "Aquarius",
    shortName: "Aqu",
    symbol: "♒",
    element: "Air",
    mode: "Fixed",
    guidance: "Moon in Aquarius brings distance and pattern recognition. Think systemically, refresh friendships, and give your feelings some sky.",
    bestFor: ["community", "ideas", "technology"],
    watch: "Detachment, contrarian reflexes, explaining feelings away.",
    activeOrgans: ["Shins", "Ankles", "Circulatory system"],
    foodNote: "Light, hydrating foods. Good circulation is supported by moderate movement and steady fluid intake."
  },
  {
    name: "Pisces",
    shortName: "Pis",
    symbol: "♓",
    element: "Water",
    mode: "Mutable",
    guidance: "Moon in Pisces thins the veil. Dream, make art, meditate, forgive gently, and protect your sensitivity with clear edges.",
    bestFor: ["dreamwork", "music", "compassion"],
    watch: "Blurred boundaries, escapism, absorbing emotions that are not yours.",
    activeOrgans: ["Feet", "Lymphatic system", "Immune system"],
    foodNote: "Gentle, nourishing foods. Fish and easily digestible proteins are supportive. Avoid anything intoxicating."
  }
];

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

const dayWisdom = [
  {
    archetype: "The first stir",
    headline: "Begin gently, before the shape is obvious.",
    guidance: "The lunar field is fresh and impressionable. Choose one intention that feels alive, then protect it from too much noise.",
    focus: ["quiet starts", "seed intentions", "clearing space"],
    ritual: "Write one sentence for what you are ready to grow, then make one visible space for it.",
    affirmation: "I begin without forcing the ending."
  },
  {
    archetype: "The second breath",
    headline: "Let desire become direction.",
    guidance: "Today supports small commitments and honest preference. Notice what pulls you forward without needing drama.",
    focus: ["choice", "stability", "body signals"],
    ritual: "Take a slow walk and name three things you are choosing on purpose.",
    affirmation: "My yes becomes clearer when I move slowly."
  },
  {
    archetype: "The bright thread",
    headline: "Shape the idea with your hands.",
    guidance: "Creative momentum gathers when you make something tangible. Draft, sketch, plan, cook, arrange, touch the material world.",
    focus: ["creation", "beauty", "play"],
    ritual: "Give twenty minutes to a beautiful useful action, without measuring the result.",
    affirmation: "I let beauty make the work easier."
  },
  {
    archetype: "The threshold keeper",
    headline: "Meet resistance as information.",
    guidance: "A snag may reveal where energy is leaking. Simplify the path, remove one obstacle, and avoid turning friction into a verdict.",
    focus: ["discernment", "repair", "boundaries"],
    ritual: "Choose one irritation and ask what it is trying to protect.",
    affirmation: "Obstacles can refine me without defining me."
  },
  {
    archetype: "The living current",
    headline: "Nourish what wants to continue.",
    guidance: "The day favors healing, learning, and steady care. Feed the practices that make your system more spacious.",
    focus: ["care", "learning", "devotion"],
    ritual: "Drink water slowly, then do one act of maintenance you have been postponing.",
    affirmation: "What I tend with care becomes trustworthy."
  },
  {
    archetype: "The disciplined flame",
    headline: "Use effort cleanly.",
    guidance: "This is a useful day for commitments, training, and courageous follow-through. Keep ambition warm, not harsh.",
    focus: ["practice", "discipline", "courage"],
    ritual: "Set a timer for one focused sprint and stop when it rings.",
    affirmation: "My effort can be devoted and kind."
  },
  {
    archetype: "The solar mirror",
    headline: "Let confidence become service.",
    guidance: "Visibility rises. Share what is true, offer what is useful, and let recognition pass through you without gripping it.",
    focus: ["visibility", "generosity", "leadership"],
    ritual: "Send one sincere appreciation or useful resource to someone.",
    affirmation: "I shine best when warmth moves through me."
  },
  {
    archetype: "The deep gate",
    headline: "Pause before you react.",
    guidance: "Intensity can make everything feel urgent. Give emotions room to speak, then choose the response that preserves your integrity.",
    focus: ["shadow work", "patience", "inner truth"],
    ritual: "Place a hand on your heart and exhale longer than you inhale for nine breaths.",
    affirmation: "I can feel deeply and still choose wisely."
  },
  {
    archetype: "The inner compass",
    headline: "Return to meaning.",
    guidance: "The day asks for perspective. Study, pray, plan travel, or reconnect with the larger why behind your ordinary tasks.",
    focus: ["meaning", "study", "faith"],
    ritual: "Read one paragraph from a text that enlarges you, then note the sentence that stays.",
    affirmation: "My path becomes clearer when I remember why it matters."
  },
  {
    archetype: "The clean ascent",
    headline: "Make the next right thing elegant.",
    guidance: "Structure helps the magic land. Organize, decide, refine, and let your future self benefit from today's clarity.",
    focus: ["order", "decisions", "craft"],
    ritual: "Clean one surface or close one loop before starting something new.",
    affirmation: "Clarity is a form of tenderness toward my future."
  },
  {
    archetype: "The sacred pause",
    headline: "Choose less, and mean it more.",
    guidance: "This is a contemplative lunar tone. Fasting from distraction may reveal the hunger underneath the habit.",
    focus: ["restraint", "spiritual focus", "renewal"],
    ritual: "Take a two-hour break from one default distraction.",
    affirmation: "I make room for what is subtle and true."
  },
  {
    archetype: "The restoring tide",
    headline: "Repair the bond between body and promise.",
    guidance: "Gentle completion is favored. Follow up, apologize, hydrate, stretch, and let steadiness rebuild trust.",
    focus: ["repair", "follow-through", "wellbeing"],
    ritual: "Send one overdue reply or make one practical repair at home.",
    affirmation: "I restore trust through small completed acts."
  },
  {
    archetype: "The blessing hand",
    headline: "Offer what has ripened.",
    guidance: "Generosity and gratitude open the day. Share results, teach what you know, and receive support without minimizing it.",
    focus: ["gratitude", "sharing", "completion"],
    ritual: "Name five things that helped you arrive here, including your own effort.",
    affirmation: "I let giving and receiving belong to the same circle."
  },
  {
    archetype: "The final veil",
    headline: "Release the almost-finished story.",
    guidance: "A cycle is thinning. Tie off what you can, forgive the imperfect parts, and let old pressure leave with the fading light.",
    focus: ["release", "forgiveness", "transition"],
    ritual: "Write down one burden, then tear or fold the paper as a closing gesture.",
    affirmation: "I do not have to carry what has completed its lesson."
  },
  {
    archetype: "The turning moon",
    headline: "Stand at the threshold with reverence.",
    guidance: "Fullness or darkness marks a hinge in the cycle. Celebrate what is illuminated, or rest inside what is not yet visible.",
    focus: ["thresholds", "integration", "surrender"],
    ritual: "Light a candle for what is complete, then sit quietly for what is coming.",
    affirmation: "I trust the turning, even when I cannot see the whole arc."
  }
];

function normalizeDegrees(degrees: number) {
  return ((degrees % 360) + 360) % 360;
}

function getMoonZodiac(date: Date) {
  const longitude = normalizeDegrees(EclipticGeoMoon(date).lon);
  const signIndex = Math.floor(longitude / 30);

  return {
    longitude,
    sign: zodiacSigns[signIndex],
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
  const wisdom = dayWisdom[tithiNumber - 1];
  const illumination = (1 - Math.cos((phaseAngle * Math.PI) / 180)) / 2;

  return {
    date,
    phaseAngle,
    phaseName: getPhaseName(lunarAge),
    phasePercent: Math.round(illumination * 100),
    lunarDayNumber,
    tithiNumber,
    tithiName: getTithiName(tithiNumber, paksha),
    paksha,
    ...wisdom
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
function getSymbolDay(date: Date, ladder: LadderEntry[] | null): SymbolDay {
  const entry = ladder ? findLadderEntry(ladder, date) : undefined;

  if (entry) {
    return { number: entry.number, start: entry.start, end: entry.end, approximate: false, source: getLunarSourceDay(entry.number) };
  }

  const civil = getCivilLunarDay(date);
  return { number: civil.number, start: civil.start, end: civil.end, approximate: true, source: getLunarSourceDay(civil.number) };
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

function formatDate(date: Date, timeZone?: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone
  }).format(date);
}

function formatClock(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone,
    timeZoneName: "short"
  }).format(date);
}

function formatPeriodMoment(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone
  }).format(date);
}

function formatTimeOnly(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
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
  return (
    <div className={`period-range${centered ? " centered" : ""}${approximate ? " approximate" : ""}`}>
      <div className="period-point">
        <small>{approximate ? "Started (est.)" : "Started"}</small>
        <strong>{formatPeriodMoment(start, timeZone)}</strong>
      </div>
      <ChevronRight className="period-arrow" size={14} />
      <div className="period-point align-end">
        <small>{approximate ? "Ends (est.)" : "Ends"}</small>
        <strong>{formatPeriodMoment(end, timeZone)}</strong>
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
  return (
    <div
      className="moon-zodiac-hero"
      aria-label={`${day.phaseName}, ${day.phasePercent}% illuminated, Tithi ${day.tithiNumber} (${day.paksha}), Moon in ${zodiac.sign.name}, Vronsky lunar day symbol ${symbolDay.source.symbol}`}
    >
      <span className="hero-tick-ring zodiac-ring-ticks" aria-hidden="true" />
      <span className="hero-tick-ring tithi-ring" aria-hidden="true" />
      <span className="hero-tick-ring symbol-ring" aria-hidden="true" />

      {lunarDaySource.map((source) => (
        <span
          key={source.lunarDay}
          className={`hero-symbol-glyph${source.lunarDay === symbolDay.number ? " active" : ""}`}
          style={wheelLabelStyle(source.lunarDay - 1, 30, 34, 6)}
          title={`Day ${source.lunarDay}: ${source.symbol}`}
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
          title={nextNewMoon ? `New Moon — ${formatPeriodMoment(nextNewMoon, timeZone)}` : "New Moon"}
        >
          ● {nextNewMoon ? formatTimeOnly(nextNewMoon, timeZone) : ""}
        </span>
      ) : day.tithiName === "Purnima" ? (
        <span
          className="hero-syzygy-marker full-moon"
          style={wheelLabelStyle(0, 1, 24, 180)}
          title={nextFullMoon ? `Full Moon — ${formatPeriodMoment(nextFullMoon, timeZone)}` : "Full Moon"}
        >
          ○ {nextFullMoon ? formatTimeOnly(nextFullMoon, timeZone) : ""}
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

      {zodiacSigns.map((sign, index) => (
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
          <span>{day.phaseName}</span>
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
  const wisdom = getTithiWisdom(day.tithiNumber, day.paksha);

  return (
    <article className="panel zodiac-guide-panel">
      <div className="panel-heading">
        <Orbit size={19} />
        <h2>Tithi {day.tithiNumber} · {day.tithiName}</h2>
      </div>

      <div className="zodiac-guide-header">
        <span className="zodiac-symbol-large">{day.tithiNumber}</span>
        <div>
          <div className="zodiac-meta">
            <span>{day.paksha}</span>
            <span>{wisdom.group}</span>
          </div>
          <p className="zodiac-degree-note">Ruled by {wisdom.deity}</p>
        </div>
      </div>

      <PeriodRange start={window.start} end={window.end} timeZone={timeZone} />

      <p>{wisdom.nature}</p>

      <div className="focus-list compact">
        {wisdom.auspiciousFor.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <p className="watch-note">Avoid: {wisdom.avoid.join(", ")}.</p>
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
  return (
    <article className="panel zodiac-guide-panel">
      <div className="panel-heading">
        <Sparkles size={19} />
        <h2>Moon in {zodiac.sign.name}</h2>
      </div>

      <div className="zodiac-guide-header">
        <span className="zodiac-symbol-large">{zodiac.sign.symbol}</span>
        <div>
          <div className="zodiac-meta">
            <span>{zodiac.sign.element}</span>
            <span>{zodiac.sign.mode}</span>
          </div>
          <p className="zodiac-degree-note">{zodiac.degreeInSign}° in {zodiac.sign.name}</p>
        </div>
      </div>

      <PeriodRange start={window.start} end={window.end} timeZone={timeZone} />

      <p>{zodiac.sign.guidance}</p>

      <div className="focus-list compact">
        {zodiac.sign.bestFor.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <p className="watch-note">{zodiac.sign.watch}</p>

      <div className="organ-row">
        <small>Active body areas</small>
        <div className="organ-chips">
          {zodiac.sign.activeOrgans.map((organ) => (
            <span key={organ} className="organ-chip teal">{organ}</span>
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

  return (
    <article className="panel zodiac-guide-panel">
      <div className="panel-heading">
        <BookOpen size={19} />
        <h2>Lunar Day Symbol · {source.symbol}</h2>
      </div>

      <div className="zodiac-guide-header">
        <span className="zodiac-symbol-large" aria-hidden="true">{source.emoji}</span>
        <div>
          <div className="zodiac-meta">
            <span>Day {symbolDay.number}</span>
          </div>
          <p className="zodiac-degree-note">{source.tagline}</p>
        </div>
      </div>

      {symbolDay.approximate ? (
        <button className="location-prompt" onClick={onEnableLocation} disabled={locationStatus === "pending"}>
          <MapPin size={14} />
          {locationStatus === "pending"
            ? "Locating…"
            : locationStatus === "denied"
            ? "Location blocked — showing calendar-day estimate"
            : locationStatus === "unsupported"
            ? "Location unavailable — showing calendar-day estimate"
            : "Enable location for exact moonrise-based times"}
        </button>
      ) : null}

      <PeriodRange start={symbolDay.start} end={symbolDay.end} timeZone={timeZone} approximate={symbolDay.approximate} />

      <p>{source.overview}</p>

      <div className="focus-list compact">
        {source.doToday.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <p className="watch-note">Avoid: {source.avoidToday.join(", ")}.</p>

      <div className="organ-row">
        <small>Active body areas</small>
        <div className="organ-chips">
          {source.activeOrgans.map((organ) => (
            <span key={organ} className="organ-chip teal">{organ}</span>
          ))}
        </div>
      </div>

      <div className="wisdom-grid symbol-extra-grid">
        <div className="wisdom-section">
          <h3>Stones</h3>
          <p>{source.stones}</p>
        </div>
        <div className="wisdom-section">
          <h3>Meditation</h3>
          <p>{source.meditation}</p>
        </div>
        <div className="wisdom-section">
          <h3>Relationships</h3>
          <p>{source.relationships}</p>
        </div>
        <div className="wisdom-section">
          <h3>Dreams</h3>
          <p>{source.dreamGuidance}</p>
        </div>
      </div>

      <a href={source.sourceUrl} target="_blank" rel="noreferrer">
        Source: Vronsky Lunar Days, day {symbolDay.number} — via OM Journal →
      </a>
    </article>
  );
}

// Body wisdom — active organs from both sources, do/avoid chips, food guidance
function BodyWisdomPanel({ zodiac, symbolDay }: { zodiac: ReturnType<typeof getMoonZodiac>; symbolDay: SymbolDay }) {
  const daySource = symbolDay.source;
  const combinedOrgans = [...new Set([...daySource.activeOrgans, ...zodiac.sign.activeOrgans])];

  return (
    <article className="panel body-wisdom-panel">
      <div className="panel-heading">
        <Activity size={19} />
        <h2>Body & Nourishment</h2>
      </div>

      <div className="wisdom-grid">
        <div className="wisdom-section">
          <h3>Active today</h3>
          <div className="organ-chips">
            {combinedOrgans.map((organ) => (
              <span key={organ} className="organ-chip teal">{organ}</span>
            ))}
          </div>
        </div>

        <div className="wisdom-section">
          <h3>Favor</h3>
          <div className="organ-chips">
            {daySource.doToday.map((item) => (
              <span key={item} className="organ-chip green">{item}</span>
            ))}
          </div>
        </div>

        <div className="wisdom-section">
          <h3>Avoid</h3>
          <div className="organ-chips">
            {daySource.avoidToday.map((item) => (
              <span key={item} className="organ-chip amber">{item}</span>
            ))}
          </div>
        </div>

        <div className="wisdom-section food-section">
          <h3>Food — moon day {symbolDay.number}</h3>
          <p>{daySource.foodNote}</p>
          <h3>Food — {zodiac.sign.symbol} {zodiac.sign.name}</h3>
          <p>{zodiac.sign.foodNote}</p>
        </div>
      </div>
    </article>
  );
}

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// The topbar's calendar button: a small month-grid popover for jumping straight to any date,
// instead of paging through the hero's prev/next-day arrows one day at a time.
function CalendarButton({ selectedDate, onSelectDate }: { selectedDate: Date; onSelectDate: (date: Date) => void }) {
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
      <button className="icon-button calendar-button" aria-label="Open calendar" aria-expanded={open} onClick={handleToggle}>
        <CalendarDays size={19} />
      </button>

      {open ? (
        <div className="calendar-popover">
          <div className="calendar-popover-header">
            <div className="calendar-nav-group">
              <button className="calendar-nav-btn" onClick={() => setViewMonth(new Date(year - 1, month, 1))} aria-label="Previous year">
                <ChevronsLeft size={15} />
              </button>
              <button className="calendar-nav-btn" onClick={() => setViewMonth(new Date(year, month - 1, 1))} aria-label="Previous month">
                <ChevronLeft size={15} />
              </button>
            </div>
            <span>{viewMonth.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</span>
            <div className="calendar-nav-group">
              <button className="calendar-nav-btn" onClick={() => setViewMonth(new Date(year, month + 1, 1))} aria-label="Next month">
                <ChevronRight size={15} />
              </button>
              <button className="calendar-nav-btn" onClick={() => setViewMonth(new Date(year + 1, month, 1))} aria-label="Next year">
                <ChevronsRight size={15} />
              </button>
            </div>
          </div>

          <div className="calendar-popover-weekdays">
            {WEEKDAY_LABELS.map((label) => (
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
            Jump to today
          </button>
        </div>
      ) : null}
    </div>
  );
}

const NOTIFICATION_TIME_KEY = "mondkalender.notificationTime";
const NOTIFICATION_ON_KEY = "mondkalender.notificationsOn";
const COORDS_KEY = "mondkalender.coords";

function App() {
  const [selectedDate, setSelectedDate] = React.useState(() => new Date());
  const [now, setNow] = React.useState(() => new Date());
  const [deviceTimeZone] = React.useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [notificationTime, setNotificationTime] = React.useState(
    () => window.localStorage.getItem(NOTIFICATION_TIME_KEY) ?? "07:30"
  );
  const [notificationsOn, setNotificationsOn] = React.useState(
    () => window.localStorage.getItem(NOTIFICATION_ON_KEY) === "true"
  );
  const [notificationStatus, setNotificationStatus] = React.useState<"idle" | "denied" | "unsupported">("idle");
  const [coords, setCoords] = React.useState<Coords | null>(() => {
    const saved = window.localStorage.getItem(COORDS_KEY);
    return saved ? (JSON.parse(saved) as Coords) : null;
  });
  const [locationStatus, setLocationStatus] = React.useState<LocationStatus>("idle");

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

  React.useEffect(() => {
    window.localStorage.setItem(NOTIFICATION_TIME_KEY, notificationTime);
    window.localStorage.setItem(NOTIFICATION_ON_KEY, String(notificationsOn));
  }, [notificationTime, notificationsOn]);

  const handleToggleNotifications = async (checked: boolean) => {
    if (!checked) {
      setNotificationsOn(false);
      return;
    }

    if (!("Notification" in window)) {
      setNotificationStatus("unsupported");
      setNotificationsOn(false);
      return;
    }

    const permission =
      Notification.permission === "default" ? await Notification.requestPermission() : Notification.permission;

    if (permission !== "granted") {
      setNotificationStatus("denied");
      setNotificationsOn(false);
      return;
    }

    setNotificationStatus("idle");
    setNotificationsOn(true);
  };

  React.useEffect(() => {
    if (!notificationsOn || !("Notification" in window) || Notification.permission !== "granted") {
      return;
    }

    let timeoutId: number;

    const scheduleNext = () => {
      const [hours, minutes] = notificationTime.split(":").map(Number);
      const target = new Date();
      target.setHours(hours, minutes, 0, 0);
      if (target.getTime() <= Date.now()) {
        target.setDate(target.getDate() + 1);
      }

      timeoutId = window.setTimeout(() => {
        const moonDay = getMoonDay(atHour(new Date(), 12));
        new Notification("Mondkalender", {
          body: moonDay.headline,
          tag: "mondkalender-daily"
        });
        scheduleNext();
      }, target.getTime() - Date.now());
    };

    scheduleNext();
    return () => window.clearTimeout(timeoutId);
  }, [notificationsOn, notificationTime]);

  const selectedMoment = isSameLocalDate(selectedDate, now) ? now : atHour(selectedDate, 12);
  const today = getMoonDay(selectedMoment);
  const wakeDreamMoment = atHour(addDays(selectedDate, -1), 23);
  const tonightDreamMoment = atHour(selectedDate, 23);
  const moonZodiac = getMoonZodiac(today.date);
  const week = Array.from({ length: 7 }, (_, index) => getMoonDay(atHour(addDays(selectedDate, index - 2), 12)));

  const dayKey = today.date.toDateString();
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
  const symbolDay = getSymbolDay(today.date, moonriseLadder);
  const wakeSymbolDay = getSymbolDay(wakeDreamMoment, moonriseLadder);
  const tonightSymbolDay = getSymbolDay(tonightDreamMoment, moonriseLadder);
  const weekSymbolDays = week.map((day) => getSymbolDay(day.date, moonriseLadder));

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
        <nav className="topbar" aria-label="Application">
          <div className="brand">
            <span className="brand-mark">
              <Moon size={18} strokeWidth={2.3} />
            </span>
            <span>Mondkalender</span>
          </div>
          <div className="top-actions">
            <div
              className="live-clock"
              aria-label={`Current time in ${timeZone}`}
              title={
                locationTimeZone && locationTimeZone !== deviceTimeZone
                  ? `Using your location's time zone (device is set to ${deviceTimeZone})`
                  : undefined
              }
            >
              <span>{formatClock(now, timeZone)}</span>
              <small className="live-clock-zone">
                {timeZone}
                {locationTimeZone && locationTimeZone !== deviceTimeZone ? <MapPin size={10} /> : null}
              </small>
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
                aria-label="Previous day"
              >
                <ChevronLeft size={19} />
              </button>
              <p>{formatDate(today.date, timeZone)}</p>
              <button
                className="icon-button"
                onClick={() => setSelectedDate(addDays(selectedDate, 1))}
                aria-label="Next day"
              >
                <ChevronRight size={19} />
              </button>
            </div>

            <div className="tithi-line">
              <span title="Lunar day number — civil count, resets at local midnight">
                {civilLunarDay.tithiName === "Purnima"
                  ? "Full Moon"
                  : civilLunarDay.tithiName === "Amavasya"
                  ? "New Moon"
                  : `Lunar Day ${civilLunarDay.number}`}
              </span>
              <span className="tithi-sep" aria-hidden="true">–</span>
              <span title="Zodiac — Moon sign, 30° ecliptic longitude">Moon in {moonZodiac.sign.name}</span>
              <span className="tithi-sep" aria-hidden="true">–</span>
              <span title="Vronsky Lunar Days symbol, moonrise to moonrise">{symbolDay.source.symbol}</span>
              <span className="tithi-sep" aria-hidden="true">–</span>
              <span title="Tithi — precise Moon-Sun angle">
                {today.tithiName === "Purnima" || today.tithiName === "Amavasya"
                  ? today.tithiName
                  : `Tithi ${today.tithiNumber} · ${today.paksha}`}
              </span>
            </div>

            {observer ? (
              <>
                <div className="rise-set-row">
                  <span>
                    <ArrowUpRight size={14} /> Moonrise {todayMoonrise ? formatTimeOnly(todayMoonrise.start, timeZone) : "—"}
                  </span>
                  <span>
                    <ArrowDownRight size={14} /> Moonset {todayMoonset ? formatTimeOnly(todayMoonset.date, timeZone) : "—"}
                  </span>
                </div>
                <div className="rise-set-row sun-row">
                  <span>
                    <Sunrise size={14} /> Sunrise {todaySunrise ? formatTimeOnly(todaySunrise.date, timeZone) : "—"}
                  </span>
                  <span>
                    <Sunset size={14} /> Sunset {todaySunset ? formatTimeOnly(todaySunset.date, timeZone) : "—"}
                  </span>
                </div>
              </>
            ) : (
              <button className="location-prompt hero-location-prompt" onClick={handleEnableLocation} disabled={locationStatus === "pending"}>
                <MapPin size={14} />
                {locationStatus === "pending"
                  ? "Locating…"
                  : locationStatus === "denied"
                  ? "Location blocked — moon day symbol uses a calendar-day estimate"
                  : locationStatus === "unsupported"
                  ? "Location unavailable — moon day symbol uses a calendar-day estimate"
                  : "Enable location for moonrise/moonset & exact moon-day symbol times"}
              </button>
            )}

            <h1>{today.headline}</h1>
            <p className="guidance">{today.guidance}</p>

            <div className="focus-list">
              {today.focus.map((item) => (
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
        <BodyWisdomPanel zodiac={moonZodiac} symbolDay={symbolDay} />

        <article className="panel dream-panel">
          <div className="panel-heading">
            <Eye size={19} />
            <h2>Dreams After Waking</h2>
          </div>
          <div className="dream-context">
            <span>Dream you woke with</span>
            <strong>
              {wakeSymbolDay.source.emoji} Day {wakeSymbolDay.number} · {wakeSymbolDay.source.symbol}
            </strong>
          </div>
          <h3>{wakeSymbolDay.source.dreamFocus}</h3>
          <p>{wakeSymbolDay.source.dreamGuidance}</p>
          <div className="tonight-note">
            <span>Tonight</span>
            <strong>
              {tonightSymbolDay.source.emoji} Day {tonightSymbolDay.number} · {tonightSymbolDay.source.dreamFocus}
            </strong>
          </div>
        </article>

        <article className="panel ritual-panel">
          <div className="panel-heading">
            <SunMedium size={19} />
            <h2>Today's Practice</h2>
          </div>
          <p>{today.ritual}</p>
          <blockquote>{today.affirmation}</blockquote>
        </article>

        <article className="panel notification-panel">
          <div className="panel-heading">
            <Bell size={19} />
            <h2>Daily Notification</h2>
          </div>
          <label className="switch-row">
            <span>Morning lunar note</span>
            <input
              type="checkbox"
              checked={notificationsOn}
              onChange={(event) => handleToggleNotifications(event.target.checked)}
            />
          </label>
          <label className="time-row">
            <span>Delivery time</span>
            <input
              type="time"
              value={notificationTime}
              onChange={(event) => setNotificationTime(event.target.value)}
            />
          </label>
          <div className="notification-preview">
            <Check size={16} />
            <span>
              {notificationStatus === "denied"
                ? "Notifications are blocked in your browser settings. Allow them, then try again."
                : notificationStatus === "unsupported"
                ? "This browser does not support notifications."
                : notificationsOn
                ? `${notificationTime} · ${today.headline}`
                : "Turn on notifications when you are ready for a daily lunar prompt."}
            </span>
          </div>
        </article>

        <section className="week-strip" aria-label="Seven day moon outlook">
          {week.map((day, index) => (
            <button
              className={`day-chip${day.date.toDateString() === selectedDate.toDateString() ? " active" : ""}`}
              key={day.date.toISOString()}
              onClick={() => setSelectedDate(day.date)}
            >
              <span>{new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(day.date)}</span>
              <i style={moonIconStyle(day.phasePercent, day.phaseAngle)} />
              <strong>{weekSymbolDays[index].source.emoji}</strong>
              <small>{weekSymbolDays[index].number}</small>
            </button>
          ))}
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
window.mondkalenderRoot.render(<App />);
