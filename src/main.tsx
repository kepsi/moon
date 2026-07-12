import React from "react";
import { Root, createRoot } from "react-dom/client";
import { Bell, BookOpen, CalendarDays, Check, ChevronLeft, ChevronRight, Eye, Moon, Orbit, Sparkles, SunMedium } from "lucide-react";
import { EclipticGeoMoon, MoonPhase } from "astronomy-engine";
import { getLunarSourceDay, lunarDaySource } from "./lunarDaySource";
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
  symbol: string;
  archetype: string;
  headline: string;
  guidance: string;
  focus: string[];
  ritual: string;
  affirmation: string;
};

type ZodiacSign = {
  name: string;
  shortName: string;
  element: string;
  mode: string;
  guidance: string;
  bestFor: string[];
  watch: string;
};

const SYNODIC_MONTH = 29.530588853;
const zodiacSigns: ZodiacSign[] = [
  {
    name: "Aries",
    shortName: "Ari",
    element: "Fire",
    mode: "Cardinal",
    guidance: "Moon in Aries wants honest movement. Lead with courage, start the thing, and let emotion pass through action instead of argument.",
    bestFor: ["first steps", "body heat", "decisions"],
    watch: "Impatience, sharp replies, rushing before the body has caught up."
  },
  {
    name: "Taurus",
    shortName: "Tau",
    element: "Earth",
    mode: "Fixed",
    guidance: "Moon in Taurus steadies the nervous system through touch, food, nature, and slow work. Choose what is simple and real.",
    bestFor: ["rest", "money care", "sensual grounding"],
    watch: "Stubbornness, comfort loops, mistaking safety for aliveness."
  },
  {
    name: "Gemini",
    shortName: "Gem",
    element: "Air",
    mode: "Mutable",
    guidance: "Moon in Gemini opens the mind. Talk, write, ask, sort, and let curiosity loosen what has become too fixed.",
    bestFor: ["messages", "learning", "light planning"],
    watch: "Scattered attention, overexplaining, living only in the head."
  },
  {
    name: "Cancer",
    shortName: "Can",
    element: "Water",
    mode: "Cardinal",
    guidance: "Moon in Cancer turns attention toward home, memory, and emotional shelter. Tend the inner room before performing for the outer world.",
    bestFor: ["home care", "family repair", "soft meals"],
    watch: "Moodiness, clinging, confusing old feelings with present facts."
  },
  {
    name: "Leo",
    shortName: "Leo",
    element: "Fire",
    mode: "Fixed",
    guidance: "Moon in Leo asks for warm-hearted expression. Create, celebrate, praise generously, and let visibility serve joy.",
    bestFor: ["creativity", "romance", "confidence"],
    watch: "Pride, dramatizing a need that could be spoken plainly."
  },
  {
    name: "Virgo",
    shortName: "Vir",
    element: "Earth",
    mode: "Mutable",
    guidance: "Moon in Virgo restores through order and usefulness. Edit the system, care for the body, and make one thing cleaner than it was.",
    bestFor: ["routines", "health notes", "organizing"],
    watch: "Perfectionism, worry disguised as responsibility."
  },
  {
    name: "Libra",
    shortName: "Lib",
    element: "Air",
    mode: "Cardinal",
    guidance: "Moon in Libra seeks proportion, beauty, and right relationship. Choose the graceful repair, not the pleasing performance.",
    bestFor: ["conversation", "design", "agreements"],
    watch: "Avoiding truth to keep the surface smooth."
  },
  {
    name: "Scorpio",
    shortName: "Sco",
    element: "Water",
    mode: "Fixed",
    guidance: "Moon in Scorpio deepens the emotional field. Keep confidence, investigate gently, and let honesty transform what secrecy has hardened.",
    bestFor: ["shadow work", "intimacy", "release"],
    watch: "Suspicion, control, testing people instead of trusting signals."
  },
  {
    name: "Sagittarius",
    shortName: "Sag",
    element: "Fire",
    mode: "Mutable",
    guidance: "Moon in Sagittarius needs meaning and horizon. Study, move, pray, tell the truth kindly, and let perspective return.",
    bestFor: ["travel plans", "teaching", "faith"],
    watch: "Restlessness, bluntness, skipping details that matter."
  },
  {
    name: "Capricorn",
    shortName: "Cap",
    element: "Earth",
    mode: "Cardinal",
    guidance: "Moon in Capricorn favors discipline and devotion. Make the promise practical, respect limits, and build what can hold weight.",
    bestFor: ["priorities", "career", "long-term plans"],
    watch: "Coldness, self-pressure, measuring worth only by output."
  },
  {
    name: "Aquarius",
    shortName: "Aqu",
    element: "Air",
    mode: "Fixed",
    guidance: "Moon in Aquarius brings distance and pattern recognition. Think systemically, refresh friendships, and give your feelings some sky.",
    bestFor: ["community", "ideas", "technology"],
    watch: "Detachment, contrarian reflexes, explaining feelings away."
  },
  {
    name: "Pisces",
    shortName: "Pis",
    element: "Water",
    mode: "Mutable",
    guidance: "Moon in Pisces thins the veil. Dream, make art, meditate, forgive gently, and protect your sensitivity with clear edges.",
    bestFor: ["dreamwork", "music", "compassion"],
    watch: "Blurred boundaries, escapism, absorbing emotions that are not yours."
  }
];

const tithiNames = [
  "Pratipada",
  "Dvitiya",
  "Tritiya",
  "Chaturthi",
  "Panchami",
  "Shashthi",
  "Saptami",
  "Ashtami",
  "Navami",
  "Dashami",
  "Ekadashi",
  "Dvadashi",
  "Trayodashi",
  "Chaturdashi",
  "Purnima / Amavasya"
];

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
    guidance: "Structure helps the magic land. Organize, decide, refine, and let your future self benefit from today’s clarity.",
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
  const source = getLunarSourceDay(lunarDayNumber);
  const illumination = (1 - Math.cos((phaseAngle * Math.PI) / 180)) / 2;

  return {
    date,
    phaseAngle,
    phaseName: getPhaseName(lunarAge),
    phasePercent: Math.round(illumination * 100),
    lunarDayNumber,
    tithiNumber,
    tithiName: tithiNames[tithiNumber - 1],
    paksha,
    symbol: source.symbol,
    ...wisdom
  };
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
  return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate();
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

function moonIconStyle(percent: number, phaseAngle: number) {
  const waxing = phaseAngle <= 180;
  const shade = waxing
    ? `linear-gradient(90deg, rgba(16, 20, 24, 0.82) ${100 - percent}%, transparent ${100 - percent}%)`
    : `linear-gradient(90deg, transparent ${percent}%, rgba(16, 20, 24, 0.82) ${percent}%)`;

  return {
    background: `${shade}, radial-gradient(circle at 38% 36%, #fff8cf 0 14%, #e7d59b 34%, #b3a676 66%, #5a5d54 100%)`
  };
}

function wheelLabelStyle(index: number, total: number, radius = 44) {
  const angle = (index / total) * 360 - 90;
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

function LunarSymbolClock({ day }: { day: MoonDay }) {
  const moonAngle = day.phaseAngle;
  const currentSource = getLunarSourceDay(day.lunarDayNumber);

  return (
    <article className="panel clock-panel">
      <div className="panel-heading">
        <Orbit size={19} />
        <h2>Lunar Month Clock</h2>
      </div>
      <div className="clock-face lunar-clock" aria-label={`Lunar month pointer on day ${day.lunarDayNumber}`}>
        {lunarDaySource.map((source) => (
          <span
            className={`clock-label ${source.lunarDay === day.lunarDayNumber ? "active" : ""}`}
            key={source.lunarDay}
            style={wheelLabelStyle(source.lunarDay - 1, lunarDaySource.length)}
            title={source.symbol}
          >
            {source.lunarDay}
          </span>
        ))}
        <div className="clock-pointer moon-pointer" style={pointerStyle(moonAngle)} />
        <div className="clock-center">
          <span>{day.phaseName}</span>
          <strong>{currentSource.symbol}</strong>
          <small>day {day.lunarDayNumber}</small>
        </div>
      </div>
    </article>
  );
}

function ZodiacClock({ zodiac }: { zodiac: ReturnType<typeof getMoonZodiac> }) {
  return (
    <article className="panel clock-panel zodiac-guidance-panel">
      <div className="panel-heading">
        <Sparkles size={19} />
        <h2>Moon Zodiac Clock</h2>
      </div>
      <div className="clock-with-copy">
        <div className="clock-face zodiac-clock" aria-label={`Moon in ${zodiac.sign.name}`}>
          {zodiacSigns.map((sign, index) => (
            <span
              className={`clock-label zodiac-label ${index === zodiac.signIndex ? "active" : ""}`}
              key={sign.name}
              style={wheelLabelStyle(index, zodiacSigns.length, 42)}
              title={sign.name}
            >
              {sign.shortName}
            </span>
          ))}
          <div className="clock-pointer zodiac-pointer" style={pointerStyle(zodiac.longitude)} />
          <div className="clock-center">
            <span>Moon in</span>
            <strong>{zodiac.sign.name}</strong>
            <small>approx. {zodiac.degreeInSign} degrees</small>
          </div>
        </div>
        <div className="zodiac-copy">
          <div className="zodiac-meta">
            <span>{zodiac.sign.element}</span>
            <span>{zodiac.sign.mode}</span>
          </div>
          <p>{zodiac.sign.guidance}</p>
          <div className="focus-list compact">
            {zodiac.sign.bestFor.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p className="watch-note">{zodiac.sign.watch}</p>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [selectedDate, setSelectedDate] = React.useState(() => new Date());
  const [now, setNow] = React.useState(() => new Date());
  const [timeZone] = React.useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [notificationTime, setNotificationTime] = React.useState("07:30");
  const [notificationsOn, setNotificationsOn] = React.useState(false);

  React.useEffect(() => {
    const clock = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(clock);
  }, []);

  const selectedMoment = isSameLocalDate(selectedDate, now) ? now : atHour(selectedDate, 12);
  const today = getMoonDay(selectedMoment);
  const todaySource = getLunarSourceDay(today.lunarDayNumber);
  const wakeDreamDay = getMoonDay(atHour(addDays(selectedDate, -1), 23));
  const wakeDreamSource = getLunarSourceDay(wakeDreamDay.lunarDayNumber);
  const tonightDreamDay = getMoonDay(atHour(selectedDate, 23));
  const tonightDreamSource = getLunarSourceDay(tonightDreamDay.lunarDayNumber);
  const moonZodiac = getMoonZodiac(today.date);
  const week = Array.from({ length: 7 }, (_, index) => getMoonDay(atHour(addDays(selectedDate, index - 2), 12)));

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
            <div className="live-clock" aria-label={`Current browser time in ${timeZone}`}>
              <span>{formatClock(now, timeZone)}</span>
              <small>{timeZone}</small>
            </div>
            <button className="icon-button" aria-label="Open calendar">
              <CalendarDays size={19} />
            </button>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="moon-stage" aria-label={`${today.phaseName}, ${today.phasePercent}% illuminated`}>
            <div className="moon-orb" style={moonIconStyle(today.phasePercent, today.phaseAngle)} />
            <div className="phase-card">
              <span>{today.phaseName}</span>
              <strong>{today.phasePercent}%</strong>
            </div>
          </div>

          <article className="daily-reading">
            <div className="date-row">
              <button className="icon-button" onClick={() => setSelectedDate(addDays(selectedDate, -1))} aria-label="Previous day">
                <ChevronLeft size={19} />
              </button>
              <p>{formatDate(today.date, timeZone)}</p>
              <button className="icon-button" onClick={() => setSelectedDate(addDays(selectedDate, 1))} aria-label="Next day">
                <ChevronRight size={19} />
              </button>
            </div>

            <div className="tithi-line">
              <Sparkles size={16} />
              <span>
                Lunar day {today.lunarDayNumber} · {today.paksha} Paksha · Symbol: {today.symbol}
              </span>
            </div>

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

      <section className="content-grid">
        <section className="clock-dashboard" aria-label="Lunar and zodiac clocks">
          <LunarSymbolClock day={today} />
          <ZodiacClock zodiac={moonZodiac} />
        </section>

        <article className="panel symbol-panel">
          <div className="panel-heading">
            <BookOpen size={19} />
            <h2>Symbol of the Day</h2>
          </div>
          <div className="symbol-lockup">
            <span>{today.lunarDayNumber}</span>
            <div>
              <strong>{today.symbol}</strong>
              <p>
                OM Journal links this symbol with lunar day {today.lunarDayNumber}. In this app it anchors the daily
                reflection and the dream reading.
              </p>
            </div>
          </div>
          <a href={todaySource.sourceUrl} target="_blank" rel="noreferrer">
            Source: OM Journal lunar day {today.lunarDayNumber}
          </a>
        </article>

        <article className="panel dream-panel">
          <div className="panel-heading">
            <Eye size={19} />
            <h2>Dreams After Waking</h2>
          </div>
          <div className="dream-context">
            <span>Dream you woke with</span>
            <strong>
              Lunar day {wakeDreamDay.lunarDayNumber} · {wakeDreamSource.symbol}
            </strong>
          </div>
          <h3>{wakeDreamSource.dreamFocus}</h3>
          <p>{wakeDreamSource.dreamGuidance}</p>
          <div className="tonight-note">
            <span>Tonight</span>
            <strong>
              Lunar day {tonightDreamDay.lunarDayNumber} · {tonightDreamSource.dreamFocus}
            </strong>
          </div>
        </article>

        <article className="panel ritual-panel">
          <div className="panel-heading">
            <SunMedium size={19} />
            <h2>Today’s Practice</h2>
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
            <input type="checkbox" checked={notificationsOn} onChange={(event) => setNotificationsOn(event.target.checked)} />
          </label>
          <label className="time-row">
            <span>Delivery time</span>
            <input type="time" value={notificationTime} onChange={(event) => setNotificationTime(event.target.value)} />
          </label>
          <div className="notification-preview">
            <Check size={16} />
            <span>
              {notificationsOn
                ? `${notificationTime} · ${today.headline}`
                : "Turn on notifications when you are ready for a daily lunar prompt."}
            </span>
          </div>
        </article>

        <section className="week-strip" aria-label="Seven day moon outlook">
          {week.map((day) => (
            <button
              className={`day-chip ${day.date.toDateString() === selectedDate.toDateString() ? "active" : ""}`}
              key={day.date.toISOString()}
              onClick={() => setSelectedDate(day.date)}
            >
              <span>{new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(day.date)}</span>
              <i style={moonIconStyle(day.phasePercent, day.phaseAngle)} />
              <strong>{day.lunarDayNumber}</strong>
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
