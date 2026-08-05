import type { Language } from "./i18n";

// All UI chrome text (labels, headings, button text, tooltips) that isn't part of the
// per-day/per-sign content datasets. Content (lunar day guidance, zodiac guidance, hero
// headlines, practices, dream text) lives in its own *.de.ts sibling files instead — this file
// is only the surrounding interface text.
//
// Sanskrit/technical terms (Shukla, Krishna, Purnima, Amavasya, the tithi names Pratipada
// through Chaturdashi) are intentionally NOT translated — they're proper nouns kept as-is by
// virtually every Vedic-astrology reference, in German ones included.

type StringKey =
  | "appLabel"
  | "accountAria"
  | "buyMeCoffeeAria"
  | "locationTimeZoneTitle"
  | "previousDayAria"
  | "nextDayAria"
  | "lunarDayCivilTitle"
  | "fullMoon"
  | "newMoon"
  | "lunarDayLabel"
  | "zodiacTitle"
  | "moonInLabel"
  | "vronskySymbolTitle"
  | "tithiPreciseTitle"
  | "tithiLabel"
  | "moonrise"
  | "moonset"
  | "sunrise"
  | "sunset"
  | "locatingHero"
  | "locationBlockedHero"
  | "locationUnsupportedHero"
  | "enableLocationHero"
  | "locationBlockedSymbol"
  | "locationUnsupportedSymbol"
  | "enableLocationSymbol"
  | "dreamsHeading"
  | "dreamWokeWith"
  | "dreamEarlierAria"
  | "dreamLaterAria"
  | "dreamEarlierLabel"
  | "dreamLaterLabel"
  | "dreamEstimate"
  | "todaysPracticeHeading"
  | "started"
  | "startedEstimate"
  | "ends"
  | "endsEstimate"
  | "ruledBy"
  | "favor"
  | "avoid"
  | "lunarDaySymbolHeading"
  | "dayLabel"
  | "sourceLinkLabel"
  | "bodyNourishmentHeading"
  | "activeAreas"
  | "meditationLabel"
  | "foodMoonDayLabel"
  | "foodZodiacLabel"
  | "relationshipsHeading"
  | "moonDayLabel"
  | "businessHouseworkGardenHeading"
  | "openCalendarAria"
  | "previousYearAria"
  | "previousMonthAria"
  | "nextMonthAria"
  | "nextYearAria"
  | "jumpToToday"
  | "weekOutlookAria"
  | "supportCtaText"
  | "buyMeCoffeeAlt"
  | "newMoonTitle"
  | "fullMoonTitle";

const strings: Record<StringKey, Record<Language, string>> = {
  appLabel: { en: "Application", de: "Anwendung" },
  accountAria: { en: "Account & more features", de: "Konto & weitere Funktionen" },
  buyMeCoffeeAria: { en: "Buy me a coffee", de: "Spendier mir einen Kaffee" },
  locationTimeZoneTitle: {
    en: "Using your location's time zone (device is set to {tz})",
    de: "Zeitzone deines Standorts wird verwendet (Gerät ist auf {tz} eingestellt)"
  },
  previousDayAria: { en: "Previous day", de: "Vorheriger Tag" },
  nextDayAria: { en: "Next day", de: "Nächster Tag" },
  lunarDayCivilTitle: {
    en: "Lunar day number — civil count, resets at local midnight",
    de: "Mondtagnummer — Kalenderzählung, wechselt um Mitternacht"
  },
  fullMoon: { en: "Full Moon", de: "Vollmond" },
  newMoon: { en: "New Moon", de: "Neumond" },
  lunarDayLabel: { en: "Lunar Day {n}", de: "Mondtag {n}" },
  zodiacTitle: { en: "Zodiac — Moon sign, 30° ecliptic longitude", de: "Tierkreis — Mondzeichen, 30° ekliptikale Länge" },
  moonInLabel: { en: "Moon {inPhrase}", de: "Mond {inPhrase}" },
  vronskySymbolTitle: { en: "Vronsky Lunar Days symbol, moonrise to moonrise", de: "Vronsky-Mondtage-Symbol, Mondaufgang bis Mondaufgang" },
  tithiPreciseTitle: { en: "Tithi — precise Moon-Sun angle", de: "Tithi — genauer Mond-Sonne-Winkel" },
  tithiLabel: { en: "Tithi {n} · {paksha}", de: "Tithi {n} · {paksha}" },
  moonrise: { en: "Moonrise", de: "Mondaufgang" },
  moonset: { en: "Moonset", de: "Monduntergang" },
  sunrise: { en: "Sunrise", de: "Sonnenaufgang" },
  sunset: { en: "Sunset", de: "Sonnenuntergang" },
  locatingHero: { en: "Locating…", de: "Standort wird ermittelt…" },
  locationBlockedHero: {
    en: "Location blocked — moon day symbol uses a calendar-day estimate",
    de: "Standort blockiert — Mondtag-Symbol nutzt eine Kalendertag-Schätzung"
  },
  locationUnsupportedHero: {
    en: "Location unavailable — moon day symbol uses a calendar-day estimate",
    de: "Standort nicht verfügbar — Mondtag-Symbol nutzt eine Kalendertag-Schätzung"
  },
  enableLocationHero: {
    en: "Enable location for moonrise/moonset & exact moon-day symbol times",
    de: "Standort aktivieren für Mondauf-/-untergang & exakte Mondtag-Zeiten"
  },
  locationBlockedSymbol: { en: "Location blocked — showing calendar-day estimate", de: "Standort blockiert — zeige Kalendertag-Schätzung" },
  locationUnsupportedSymbol: { en: "Location unavailable — showing calendar-day estimate", de: "Standort nicht verfügbar — zeige Kalendertag-Schätzung" },
  enableLocationSymbol: { en: "Enable location for exact moonrise-based times", de: "Standort aktivieren für exakte, mondaufgangsbasierte Zeiten" },
  dreamsHeading: { en: "Dreams After Waking", de: "Träume nach dem Aufwachen" },
  dreamWokeWith: { en: "Dream you woke with", de: "Traum, mit dem du aufgewacht bist" },
  dreamEarlierAria: { en: "Earlier in the night, before the lunar day changed", de: "Früher in der Nacht, bevor der Mondtag wechselte" },
  dreamLaterAria: { en: "Later in the night, toward morning", de: "Später in der Nacht, Richtung Morgen" },
  dreamEarlierLabel: { en: "earlier in the night", de: "früher in der Nacht" },
  dreamLaterLabel: { en: "later, toward morning", de: "später, Richtung Morgen" },
  dreamEstimate: { en: " (est.)", de: " (geschätzt)" },
  todaysPracticeHeading: { en: "Today's Practice", de: "Heutige Praxis" },
  started: { en: "Started", de: "Beginn" },
  startedEstimate: { en: "Started (est.)", de: "Beginn (geschätzt)" },
  ends: { en: "Ends", de: "Ende" },
  endsEstimate: { en: "Ends (est.)", de: "Ende (geschätzt)" },
  ruledBy: { en: "Ruled by {deity}", de: "Beherrscht von {deity}" },
  favor: { en: "Favor", de: "Günstig" },
  avoid: { en: "Avoid", de: "Vermeiden" },
  lunarDaySymbolHeading: { en: "Lunar Day Symbol · {symbol}", de: "Mondtag-Symbol · {symbol}" },
  dayLabel: { en: "Day {n}", de: "Tag {n}" },
  sourceLinkLabel: { en: "Source: Vronsky Lunar Days, day {n} — via OM Journal →", de: "Quelle: Vronsky-Mondtage, Tag {n} — via OM Journal →" },
  bodyNourishmentHeading: { en: "Body & Nourishment", de: "Körper & Ernährung" },
  activeAreas: { en: "Active areas", de: "Aktive Bereiche" },
  meditationLabel: { en: "Meditation", de: "Meditation" },
  foodMoonDayLabel: { en: "Food — moon day {n}", de: "Ernährung — Mondtag {n}" },
  foodZodiacLabel: { en: "Food — {symbol} {name}", de: "Ernährung — {symbol} {name}" },
  relationshipsHeading: { en: "Relationships", de: "Beziehungen" },
  moonDayLabel: { en: "Moon day {n} · {symbol}", de: "Mondtag {n} · {symbol}" },
  businessHouseworkGardenHeading: { en: "Business, Housework & Garden", de: "Arbeit, Haushalt & Garten" },
  openCalendarAria: { en: "Open calendar", de: "Kalender öffnen" },
  previousYearAria: { en: "Previous year", de: "Vorheriges Jahr" },
  previousMonthAria: { en: "Previous month", de: "Vorheriger Monat" },
  nextMonthAria: { en: "Next month", de: "Nächster Monat" },
  nextYearAria: { en: "Next year", de: "Nächstes Jahr" },
  jumpToToday: { en: "Jump to today", de: "Zu heute springen" },
  weekOutlookAria: { en: "Seven day moon outlook", de: "Sieben-Tage-Mondüberblick" },
  supportCtaText: {
    en: "Enjoying this app and want more — notifications, personalised birth-date guidance, and beyond? Send me an email or consider buying me a coffee.",
    de: "Gefällt dir die App und du willst mehr — Benachrichtigungen, persönliche Geburtsdatum-Guidance und mehr? Schreib mir eine E-Mail oder spendier mir gern einen Kaffee."
  },
  buyMeCoffeeAlt: { en: "Buy me a coffee", de: "Spendier mir einen Kaffee" },
  newMoonTitle: { en: "New Moon — {time}", de: "Neumond — {time}" },
  fullMoonTitle: { en: "Full Moon — {time}", de: "Vollmond — {time}" }
};

function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
}

export function t(key: StringKey, language: Language, vars?: Record<string, string | number>): string {
  return interpolate(strings[key][language], vars);
}

// Moon phase names (New Moon, Waxing Crescent, ...) — display-only, no logic depends on the
// exact string, so these are safe to localize freely.
type PhaseKey =
  | "newMoon"
  | "waxingCrescent"
  | "firstQuarter"
  | "waxingGibbous"
  | "fullMoon"
  | "waningGibbous"
  | "lastQuarter"
  | "waningCrescent";

const phaseNames: Record<PhaseKey, Record<Language, string>> = {
  newMoon: { en: "New Moon", de: "Neumond" },
  waxingCrescent: { en: "Waxing Crescent", de: "Zunehmende Sichel" },
  firstQuarter: { en: "First Quarter", de: "Erstes Viertel" },
  waxingGibbous: { en: "Waxing Gibbous", de: "Zunehmender Mond" },
  fullMoon: { en: "Full Moon", de: "Vollmond" },
  waningGibbous: { en: "Waning Gibbous", de: "Abnehmender Mond" },
  lastQuarter: { en: "Last Quarter", de: "Letztes Viertel" },
  waningCrescent: { en: "Waning Crescent", de: "Abnehmende Sichel" }
};

export function getPhaseNameLabel(age: number, language: Language): string {
  let key: PhaseKey;
  if (age < 1.2 || age > 28.3) key = "newMoon";
  else if (age < 6.4) key = "waxingCrescent";
  else if (age < 8.9) key = "firstQuarter";
  else if (age < 13.8) key = "waxingGibbous";
  else if (age < 15.8) key = "fullMoon";
  else if (age < 21.1) key = "waningGibbous";
  else if (age < 23.6) key = "lastQuarter";
  else key = "waningCrescent";
  return phaseNames[key][language];
}

export const WEEKDAY_LABELS: Record<Language, string[]> = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  de: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
};

// Locale tag used for Intl.DateTimeFormat calls (month names, weekday names, date ordering).
export const DATE_LOCALE: Record<Language, string> = {
  en: "en-GB",
  de: "de-DE"
};
