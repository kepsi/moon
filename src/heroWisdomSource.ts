import type { Language } from "./i18n";
import { heroWisdomDe } from "./heroWisdomSource.de";

export type HeroWisdom = { headline: string; guidance: string; focus: string[] };

type WisdomLine = { headline: string; guidance: string };

// One genuinely blended headline + guidance per (Vronsky lunar day, Moon sign) pair — not a
// day-sentence stitched to a sign-sentence. Each line fuses the day's meaning (see
// lunarDaySource.ts) with that sign's temperament into a single short thought, in the same
// plain, direct, second-person voice throughout. No sign is named here — the tagline already
// carries it — the guidance only carries what it means today.
//
// Outer array: 30 lunar days, in lunarDaySource order (index 0 = Day 1).
// Inner array: 12 signs, in zodiacSigns order (Aries, Taurus, Gemini, Cancer, Leo, Virgo,
// Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces).
const heroWisdom: WisdomLine[][] = [
  // Day 1 — planning day, start nothing yet
  [
    { headline: "Sketch first, sprint later", guidance: "The urge to leap is strong, but this month deserves a sketch before a sprint." },
    { headline: "Let the plan settle slowly", guidance: "Slow, steady planning suits you perfectly today — let the month take shape at its own pace." },
    { headline: "Capture ideas, don't launch them", guidance: "Jot down every idea buzzing through your head, but save the calls and messages for tomorrow." },
    { headline: "Plan from somewhere safe", guidance: "Curl up with your plans rather than the world — let the month's shape form somewhere quiet." },
    { headline: "Dream big, stay backstage", guidance: "Dream big and privately today — the spotlight can wait until the plan is actually ready." },
    { headline: "Get the plan exactly right", guidance: "Get the plan detailed and tidy now; the execution will thank you for it later." },
    { headline: "Weigh it, don't decide yet", guidance: "Weigh your options quietly today rather than committing to any one path just yet." },
    { headline: "Get honest before you plan", guidance: "Go inward and get honest about what you actually want from the month ahead." },
    { headline: "Dream wide, book nothing", guidance: "Let your imagination roam far today — just don't book the ticket quite yet." },
    { headline: "Lay groundwork, launch nothing", guidance: "Lay the groundwork with real discipline; nothing launches today, and that's exactly right." },
    { headline: "Let the idea stay yours", guidance: "Let an unusual idea take shape quietly before you bring it to anyone else." },
    { headline: "Let the shape drift into view", guidance: "Let the month's shape drift into view rather than forcing any hard lines yet." }
  ],
  // Day 2 — trust what you crave, good day to start or ask
  [
    { headline: "Ask for it, now", guidance: "What you want is obvious and worth chasing hard — don't wait for a better opening." },
    { headline: "Feed what you actually crave", guidance: "Whatever you're hungry for, in food or comfort, deserves a real answer today, not a compromise." },
    { headline: "Say the want out loud", guidance: "Naming what you're craving, out loud, to someone, makes it far more likely to arrive." },
    { headline: "Nourish yourself first", guidance: "Tend to your own appetite before anyone else's — a full table starts with a full you." },
    { headline: "Treat yourself generously", guidance: "Generosity toward yourself isn't indulgence today, it's fuel — let a want be simply enjoyed." },
    { headline: "Trust the craving, skip the guilt", guidance: "The thing you want is probably the right call — resist second-guessing it into something smaller." },
    { headline: "Choose the thing you like", guidance: "Pick what genuinely appeals to you today rather than what looks good to everyone else." },
    { headline: "Follow the want that won't quiet", guidance: "One craving keeps returning for a reason — stop negotiating with it and just meet it." },
    { headline: "Chase the appetite, not the plan", guidance: "Let hunger, not strategy, choose today's direction — it knows something your planning doesn't." },
    { headline: "Earn the reward, then take it", guidance: "You've likely earned whatever you're craving — let yourself actually collect on the effort." },
    { headline: "Want something unusual, and mean it", guidance: "An offbeat craving deserves as much respect today as a sensible one — follow the odd pull." },
    { headline: "Let a soft want lead you", guidance: "A gentle craving, half-formed, is worth following today even before you can explain it." }
  ],
  // Day 3 — energetic, act don't wait, avoid money matters
  [
    { headline: "Move now, ask later", guidance: "This is pure fuel for you — act while the nerve is hot, and leave money decisions for tomorrow." },
    { headline: "Push through the resistance", guidance: "Physical effort pays off today even though instinct says wait — trust the momentum over the caution." },
    { headline: "Turn talk into motion", guidance: "Stop circling the idea in your head and do the thing — today rewards action over another round of thinking." },
    { headline: "Protect, don't retreat", guidance: "The urge to shield yourself is strong, but today asks you to stand your ground instead of pulling back." },
    { headline: "Lead with your nerve", guidance: "Boldness serves you well today — step forward and let your confidence carry the room." },
    { headline: "Act before it's perfect", guidance: "Waiting for the ideal plan will only cost you today's momentum — move with what you've already got." },
    { headline: "Pick a side and go", guidance: "Weighing every angle will only slow you down today — commit to a direction and let it carry you." },
    { headline: "Channel the intensity outward", guidance: "There's real force in you today — aim it at something worth building instead of holding it in." },
    { headline: "Take the leap you're eyeing", guidance: "Your restlessness is trying to tell you something today — follow it instead of talking yourself out of it." },
    { headline: "Push, don't just plan", guidance: "You've done enough preparing — today rewards the person who actually moves, not the one still refining the plan." },
    { headline: "Break from routine, on purpose", guidance: "Do something today that surprises even you — the usual careful pace won't serve you as well as boldness will." },
    { headline: "Let urgency override doubt", guidance: "Trust the pull to act even without full clarity — today favors motion over waiting for certainty." }
  ],
  // Day 4 — solitude, careful words, no hasty decisions
  [
    { headline: "Bite your tongue today", guidance: "Your directness could cut deeper than you mean it to — choose the softer version of what you want to say." },
    { headline: "Sit with the choice alone", guidance: "This isn't a day for input from others — trust your own steady read on what's right." },
    { headline: "Think twice before you send it", guidance: "A careless word travels further than usual today — reread the message before it leaves your hands." },
    { headline: "Withdraw and listen inward", guidance: "Time alone will tell you more today than any conversation could — let quiet do the sorting." },
    { headline: "Choose kindness over cleverness", guidance: "A sharp remark might feel satisfying, but the kinder line is the one worth choosing today." },
    { headline: "Weigh the choice carefully", guidance: "The small decision in front of you carries more weight than it looks — take the extra minute." },
    { headline: "Decide without a committee", guidance: "Today rewards your own quiet judgment more than a group opinion — sit with the choice alone." },
    { headline: "Guard what you're mid-deciding", guidance: "Keep today's choice close and unspoken until it's actually made — outside noise will only muddy it." },
    { headline: "Slow the blunt truth down", guidance: "What you want to say is probably true, but today calls for a gentler delivery than usual." },
    { headline: "Choose the careful path", guidance: "A hasty call could cost you later — today favors the slower, more deliberate route." },
    { headline: "Step back from the group", guidance: "Your own read on this is worth more today than the crowd's — trust it over consensus." },
    { headline: "Protect your solitude today", guidance: "Time alone will clarify more than company can — let today be quieter than usual." }
  ],
  // Day 5 — transformation, finish debts, me-time
  [
    { headline: "Finish it, then rest", guidance: "Close out whatever's unfinished with your usual speed, then actually stop — the rest is non-negotiable." },
    { headline: "Take the me-time, guilt-free", guidance: "You've more than earned a slower afternoon today — let rest be the whole plan, not an afterthought." },
    { headline: "Wrap up the loose thread", guidance: "One conversation or task has been dangling too long — close it today so your mind can actually rest." },
    { headline: "Tend to yourself first", guidance: "Care for yourself the way you'd care for someone you love — today asks that of you specifically." },
    { headline: "Honor what you believe", guidance: "Don't dim your convictions to keep the peace today — standing by them matters more than usual." },
    { headline: "Finish, then release the rest", guidance: "Complete the task in front of you, then let the rest go — perfection isn't today's job." },
    { headline: "Choose yourself in this one", guidance: "Where you'd normally compromise, hold your own preference today — it's not selfish, it's overdue." },
    { headline: "Let go of the debt", guidance: "Settle what you owe, literally or emotionally, and free yourself from carrying it any further." },
    { headline: "Keep your word to yourself", guidance: "A promise you made to yourself deserves the same follow-through you'd give anyone else today." },
    { headline: "Collect on your own effort", guidance: "You've been the disciplined one — today, let some of that effort come back to you." },
    { headline: "Stay true to your own read", guidance: "Don't talk yourself out of what you actually believe today just because it's the less popular view." },
    { headline: "Protect your own quiet hour", guidance: "Carve out real time for yourself today — the world can wait for the version of you that rested." }
  ],
  // Day 6 — easy day, trust intuition, good for connection
  [
    { headline: "Let ease win today", guidance: "Nothing needs forcing today — let your usual urgency rest and trust that this one moves on its own." },
    { headline: "Enjoy the smooth stretch", guidance: "Today asks little of you — settle in, and let a good conversation or meeting unfold naturally." },
    { headline: "Talk to someone new", guidance: "This is an easy day for connection — a new conversation could go somewhere worth following." },
    { headline: "Trust the calm feeling", guidance: "If today feels unusually settled, believe it — your intuition is reading the room correctly." },
    { headline: "Let charm do the work", guidance: "Today rewards warmth over effort — a relaxed conversation will open more doors than a pushy one." },
    { headline: "Let go of the checklist", guidance: "Not everything needs managing today — trust that things are working out without your usual oversight." },
    { headline: "Let a connection deepen", guidance: "A conversation today has real potential — give it more time than you'd normally spare." },
    { headline: "Trust the quiet read", guidance: "Your intuition is unusually sharp today — trust the read you're getting without needing proof." },
    { headline: "Meet someone worth meeting", guidance: "A new introduction today could matter more than it seems — stay open to who crosses your path." },
    { headline: "Let today be easy", guidance: "You don't have to earn this one — let a genuinely easy day be exactly that." },
    { headline: "Follow an interesting thread", guidance: "A conversation or idea today is worth more attention than usual — let curiosity lead the way." },
    { headline: "Trust what you're sensing", guidance: "Your read on people and moods is especially accurate today — let it guide you without second-guessing." }
  ],
  // Day 7 — words carry power, speak sparingly
  [
    { headline: "Speak less, mean more", guidance: "Your words carry extra force today — say only what you actually want to happen." },
    { headline: "Choose words that will hold", guidance: "What you say today tends to stick, so pick words solid enough to still mean it tomorrow." },
    { headline: "Say less than you want to", guidance: "Talking more than usual today risks saying something you don't quite mean — edit yourself once." },
    { headline: "Speak only from the heart", guidance: "A word said in tenderness today lands especially deep — let that be the only kind you use." },
    { headline: "Let praise be genuine", guidance: "A compliment or word of encouragement today carries real weight — make sure you mean it." },
    { headline: "Be precise, not harsh", guidance: "Say exactly what's true today, but choose the gentler phrasing over the sharper, more accurate one." },
    { headline: "Speak the honest yes or no", guidance: "Vague answers won't serve you today — say clearly what you actually think, kindly but plainly." },
    { headline: "Withhold what you don't mean", guidance: "Silence serves you better than a half-true word today — say nothing rather than something hollow." },
    { headline: "Trim the blunt edges", guidance: "Your honesty is welcome today, just softened slightly — the truth still lands without the extra force." },
    { headline: "Let your word be your bond", guidance: "A promise made today is one you'll be expected to keep — only commit to what you mean." },
    { headline: "Say the unconventional thing gently", guidance: "An unusual opinion is worth voicing today, just delivered with more warmth than bluntness." },
    { headline: "Let kind words carry weight", guidance: "A gentle word today can do more than you expect — don't underestimate a small kindness said aloud." }
  ],
  // Day 8 — unforeseen events, release old patterns
  [
    { headline: "Let the surprise move you", guidance: "Something unexpected today is an invitation, not a threat — meet it head-on instead of resisting." },
    { headline: "Let go of one old habit", guidance: "Change is knocking today even though you'd rather things stay put — let one small thing go." },
    { headline: "Follow the unexpected detour", guidance: "Plans may shift today — treat the detour as information rather than an inconvenience." },
    { headline: "Release what you've outgrown", guidance: "An old attachment is ready to loosen today — let it go gently rather than holding on out of habit." },
    { headline: "Reinvent, don't repeat", guidance: "Today favors a fresh version of yourself over the familiar one — let a little reinvention happen." },
    { headline: "Adjust the plan, don't scrap it", guidance: "Something will likely go sideways today — revise rather than abandon what you were building." },
    { headline: "Let the balance shift", guidance: "An old arrangement may need rebalancing today — don't resist the adjustment just because it's unfamiliar." },
    { headline: "Let the transformation finish", guidance: "Something in you has already changed — today just makes it visible, so don't fight the reveal." },
    { headline: "Welcome the plot twist", guidance: "An unplanned turn today probably leads somewhere better than the original route — follow it." },
    { headline: "Rebuild on your own terms", guidance: "If something breaks down today, treat it as room to rebuild it stronger, not a setback." },
    { headline: "Let the old system go", guidance: "A pattern that no longer fits deserves to be dropped today, even if it's familiar and comfortable." },
    { headline: "Flow with the change", guidance: "Resisting today's shift will cost more than moving with it — let the current carry you a little." }
  ],
  // Day 9 — unfavorable, caution, finish don't start
  [
    { headline: "Hold back the impulse", guidance: "The urge to charge ahead is strong today, but this is a day for patience, not a new start." },
    { headline: "Guard what's already yours", guidance: "Keep a closer eye on your belongings and plans today — this isn't the day to loosen your grip." },
    { headline: "Don't chase the shiny distraction", guidance: "A tempting new idea today is probably a detour — stay with what you already committed to." },
    { headline: "Protect your peace today", guidance: "Keep your circle small and familiar today — this isn't the day to let new people in close." },
    { headline: "Dim the spotlight briefly", guidance: "Today favors staying low-key over performing — let your usual glow rest until tomorrow." },
    { headline: "Finish, don't start", guidance: "Redirect today's energy toward what's already underway — a fresh project would only stall right now." },
    { headline: "Avoid the tempting compromise", guidance: "A deal or agreement today may look better than it is — hold off until you can see it clearly." },
    { headline: "See through the illusion", guidance: "Something today isn't quite what it seems — trust your suspicion more than the surface story." },
    { headline: "Rein in the wandering eye", guidance: "The urge to chase something new is strong today — stay with your current path a little longer." },
    { headline: "Stay the steady course", guidance: "Today rewards sticking to the plan over improvising — resist any pressure to change direction now." },
    { headline: "Question what looks too easy", guidance: "An appealing shortcut today deserves real scrutiny — the odd, harder path is probably the honest one." },
    { headline: "Keep illusions at arm's length", guidance: "Today blurs what's real and what you're hoping for — stay a little more grounded than usual." }
  ],
  // Day 10 — strengthen home and family, favorable for major undertakings
  [
    { headline: "Fight for your people", guidance: "Whatever you'd defend without thinking twice deserves your energy today — put it toward home or family." },
    { headline: "Invest in what lasts", guidance: "A big purchase or home decision made today is likely to hold — trust the solid choice." },
    { headline: "Call the people who matter", guidance: "A conversation with family or an old friend today is worth more than it might seem — make the call." },
    { headline: "Lean fully into home", guidance: "This is your day, really — pour today's energy into home and the people closest to you." },
    { headline: "Celebrate your people", guidance: "Let today be about honoring family or close friends — a little generosity here goes a long way." },
    { headline: "Handle the household details", guidance: "Practical home matters go smoothly today — take care of the maintenance you've been postponing." },
    { headline: "Repair a family tie", guidance: "If a relationship needs mending, today favors the honest, gentle conversation that finally does it." },
    { headline: "Deepen a close bond", guidance: "A significant relationship, especially with family, can move to more honest ground today." },
    { headline: "Bring home into the plan", guidance: "Big-picture thinking works best today when it includes the people and place you call home." },
    { headline: "Build something that lasts", guidance: "Today favors long-term commitments over quick wins — invest in what you intend to keep." },
    { headline: "Reconnect with your roots", guidance: "Even your independent streak benefits today from a little time spent with family or old ties." },
    { headline: "Let home hold you", guidance: "Let the comfort of home do some of today's emotional work — you don't have to manage everything alone." }
  ],
  // Day 11 — most energetic day, direct it, finish what's started
  [
    { headline: "Full throttle, aimed well", guidance: "You've rarely had this much fuel — point it at something that actually matters instead of everything at once." },
    { headline: "Convert energy into results", guidance: "Unusually high energy today wants a solid outlet — finish the physical task you've been circling." },
    { headline: "Focus the scattered energy", guidance: "Pick one thread out of today's buzz and follow it all the way through instead of several halfway." },
    { headline: "Feel it, then use it", guidance: "Strong emotions today are really energy in disguise — channel them into care rather than worry." },
    { headline: "Perform at full power", guidance: "This is a day built for your natural intensity — let it show fully instead of holding back." },
    { headline: "Finish with precision", guidance: "High energy plus your usual care is a strong combination today — complete the detailed task well." },
    { headline: "Balance the intensity", guidance: "Today's energy runs strong, so pair it with your usual fairness rather than letting it tip you off-center." },
    { headline: "Master the surge, don't suppress it", guidance: "This kind of intensity suits you more than most — direct it deliberately instead of letting it leak sideways." },
    { headline: "Aim big, follow through", guidance: "Today can support a genuinely ambitious move — just make sure you see it through to the end." },
    { headline: "Cash in the discipline", guidance: "All that steady effort has built toward a day like this — push hard and claim the result." },
    { headline: "Power the big idea", guidance: "An idea that's felt too large before might actually be doable today — give it real momentum." },
    { headline: "Ground the surge", guidance: "Strong energy today needs an anchor — pair it with something physical so it doesn't dissolve into daydream." }
  ],
  // Day 12 — love, compassion, charity
  [
    { headline: "Lead with tenderness", guidance: "Trade today's usual urgency for gentleness — a softer approach wins more here than force would." },
    { headline: "Let affection be physical", guidance: "A hug, a shared meal, a familiar touch — today's love speaks best through the senses." },
    { headline: "Say the kind thing", guidance: "A few genuine words of appreciation today will land further than you expect — don't hold back." },
    { headline: "Let love lead fully", guidance: "This is your natural language today — let care and closeness take priority over everything else." },
    { headline: "Give generously, from the heart", guidance: "A big-hearted gesture today, given without expecting anything back, sets today's whole tone." },
    { headline: "Show love through care", guidance: "A practical act of service today, done quietly, says more than any grand gesture would." },
    { headline: "Choose harmony over winning", guidance: "Today favors closeness over being right — let a small disagreement soften instead of settling it." },
    { headline: "Let someone in a little", guidance: "Real intimacy today asks for a bit more honesty than usual — let your guard down slightly." },
    { headline: "Be generous with your time", guidance: "Give someone your full attention today rather than a hurried version of it — presence is the gift." },
    { headline: "Let tenderness show", guidance: "You don't have to earn today's warmth — let a little softness through without the usual restraint." },
    { headline: "Care for the wider circle", guidance: "Today's compassion reaches further than usual — a kindness to someone outside your inner circle counts double." },
    { headline: "Let compassion overflow", guidance: "This is exactly your territory today — let empathy move freely, just keep a little of it for yourself too." }
  ],
  // Day 13 — break old cycles, learning, group work
  [
    { headline: "Break the pattern outright", guidance: "A repeating frustration finally has an opening today — take the direct route out of it." },
    { headline: "Change one habit, not everything", guidance: "Pick a single stuck routine and shift it today rather than trying to overhaul it all at once." },
    { headline: "Learn something that reframes it", guidance: "New information today could be exactly what breaks an old loop — stay curious about the pattern." },
    { headline: "Interrupt the old reaction", guidance: "A familiar reaction is worth catching today before it runs its usual course — pause before you repeat it." },
    { headline: "Rewrite the script you're in", guidance: "If a situation keeps playing out the same way, today's the day to change your part in it." },
    { headline: "Fix the root, not the symptom", guidance: "Look past the surface issue today to whatever keeps causing it — that's the one worth solving." },
    { headline: "Lean on someone else's view", guidance: "A pattern is easier to see today with outside input — ask someone you trust for their honest read." },
    { headline: "Face the repeating truth", guidance: "Whatever keeps resurfacing is asking for real attention today, not another round of avoidance." },
    { headline: "Widen the frame", guidance: "A bigger-picture view today can loosen a stuck pattern that close-up thinking couldn't budge." },
    { headline: "Redesign the structure", guidance: "If a system keeps failing the same way, today favors rebuilding it properly instead of patching it again." },
    { headline: "Try the unconventional fix", guidance: "An unusual solution is worth trying today — the standard approach hasn't broken the pattern so far." },
    { headline: "Notice the emotional repeat", guidance: "A recurring feeling is trying to tell you something today — trace it back instead of just riding it out again." }
  ],
  // Day 14 — fortune for new beginnings, being seen
  [
    { headline: "Launch it today", guidance: "Whatever you've been gearing up to start has real backing today — go ahead and begin." },
    { headline: "Commit to the new step", guidance: "A steady, considered new beginning holds real promise today — take it seriously and start." },
    { headline: "Pitch the idea", guidance: "Today favors putting your idea in front of someone — the reception is likely to be good." },
    { headline: "Start something close to home", guidance: "A new beginning tied to home or family carries extra promise today — it's worth pursuing." },
    { headline: "Step into the light", guidance: "Today rewards visibility — let your work or your voice be seen instead of staying in the wings." },
    { headline: "Begin the improved version", guidance: "A refined, more careful version of your plan is ready to start today — trust the preparation." },
    { headline: "Announce the partnership", guidance: "A new agreement or collaboration started today is likely to find good footing." },
    { headline: "Start the deeper project", guidance: "Today supports beginning something that actually matters to you, not just something easy to start." },
    { headline: "Say yes to the opportunity", guidance: "A new door opening today is worth walking through, even if it's bigger than you planned for." },
    { headline: "Make the career move", guidance: "Today is unusually good for taking a real step forward in your work — don't undersell it." },
    { headline: "Introduce the new idea", guidance: "An original idea gets a fair hearing today — this is the day to actually share it." },
    { headline: "Start the creative work", guidance: "A new creative or intuitive pursuit begun today has real staying power — don't wait for more certainty." }
  ],
  // Day 15 — full moon, high energy, discipline needed
  [
    { headline: "Hold the line", guidance: "Today's intensity wants an outlet fast — choose the disciplined one instead of the reckless one." },
    { headline: "Resist the overindulgence", guidance: "The pull toward more, more food, more spending, is strong today — moderation serves you better." },
    { headline: "Say less than the moment wants", guidance: "Today's energy makes everything feel urgent to say — most of it can actually wait." },
    { headline: "Steady the emotional tide", guidance: "Feelings run especially high today — give them room without letting them make your decisions." },
    { headline: "Shine without overreaching", guidance: "Your usual radiance is amplified today — let it show without tipping into excess or drama." },
    { headline: "Keep the routine simple", guidance: "Today isn't the day for a complicated plan — stick to the basics and hold steady." },
    { headline: "Avoid the extreme choice", guidance: "Today pulls toward one extreme or another — the middle path is the one worth choosing." },
    { headline: "Contain the intensity", guidance: "Today's power wants to consume everything in its path — direct it narrowly instead of letting it spread." },
    { headline: "Rein in the overreach", guidance: "Today tempts you to promise or plan more than is realistic — scale it back by half." },
    { headline: "Stay disciplined through the peak", guidance: "Today tests your usual restraint more than most — hold to it, the payoff is real." },
    { headline: "Keep distance from the peak", guidance: "Today's intensity can overwhelm your usual clarity — step back before reacting to anything." },
    { headline: "Anchor before you drift", guidance: "Today's high tide can carry you further than intended — keep something solid nearby to hold onto." }
  ],
  // Day 16 — rest, restore balance, gentle beauty
  [
    { headline: "Let yourself actually rest", guidance: "Slowing down today isn't a loss of momentum — it's what makes tomorrow's push possible." },
    { headline: "Enjoy the recovery", guidance: "Today asks nothing difficult of you — let comfort and rest be entirely enough." },
    { headline: "Quiet the mental noise", guidance: "Give your mind a break today — less input, less multitasking, more simple stillness." },
    { headline: "Restore your own comfort", guidance: "Today is for tending to yourself the way you usually tend to everyone else." },
    { headline: "Rest without performing", guidance: "You don't need to be impressive today — let today be soft and unwitnessed." },
    { headline: "Tidy gently, not thoroughly", guidance: "A light, unhurried tidy suits today far better than a deep clean or big project." },
    { headline: "Restore your own balance", guidance: "Spend today on your own equilibrium before worrying about anyone else's." },
    { headline: "Let the intensity ease", guidance: "Today doesn't need your full intensity — let things stay simple and undemanding." },
    { headline: "Rest before the next leap", guidance: "Today is a pause, not a retreat — recharge before the next big push." },
    { headline: "Allow yourself to coast", guidance: "You've earned an easier day — let today be lighter than your usual standard." },
    { headline: "Unplug for a while", guidance: "Step back from the noise and ideas today — a quieter, more private stretch suits you." },
    { headline: "Let beauty be enough", guidance: "Today doesn't need to be productive — a little beauty and rest is the whole task." }
  ],
  // Day 17 — joy, festivity, love
  [
    { headline: "Chase the fun, fully", guidance: "Let today be genuinely playful — go after the good time instead of holding back." },
    { headline: "Indulge, a little", guidance: "Today rewards real pleasure — good food, good company, a bit of indulgence without guilt." },
    { headline: "Gather the people", guidance: "A lively conversation or a spontaneous get-together fits today perfectly — say yes to it." },
    { headline: "Celebrate close to home", guidance: "Warmth and joy today come easiest with the people who already feel like family." },
    { headline: "Let today be your stage", guidance: "This is your kind of day — let yourself be the center of a little celebration." },
    { headline: "Let go of the plan", guidance: "Today doesn't need managing — let the good time happen without organizing every detail of it." },
    { headline: "Say yes to the invitation", guidance: "Today favors company and celebration — accept the invitation instead of staying in." },
    { headline: "Let joy be unguarded", guidance: "You don't have to hold back today — let real enjoyment show without the usual caution." },
    { headline: "Go bigger than planned", guidance: "Today's fun deserves a little more enthusiasm than you'd usually allow yourself." },
    { headline: "Let loose, briefly", guidance: "Today gives you permission to set the discipline aside and simply enjoy something." },
    { headline: "Celebrate with your people", guidance: "A gathering, even an unplanned one, suits today especially well — let curiosity turn social." },
    { headline: "Let the joy be dreamy", guidance: "Today's happiness doesn't need a reason — let it be soft, imaginative, and unstructured." }
  ],
  // Day 18 — outer reflects inner, self-reflection
  [
    { headline: "Notice what triggers you", guidance: "Whatever irritates you today is probably showing you something about yourself worth a second look." },
    { headline: "Check what you're avoiding", guidance: "A stubborn feeling today is worth examining rather than sitting on as usual." },
    { headline: "Listen to your own words", guidance: "Pay attention to what you keep saying today — it may reveal more than you intend." },
    { headline: "See your own reflection kindly", guidance: "Whatever comes up emotionally today deserves the same gentleness you'd offer someone else." },
    { headline: "Look past the performance", guidance: "Today asks what's real beneath the confidence — a little honest self-reflection goes further than usual." },
    { headline: "Examine the standard you hold", guidance: "Notice today whether the standard you're judging yourself by is actually fair." },
    { headline: "See your own part in it", guidance: "A conflict today is worth examining from your own side, not just theirs." },
    { headline: "Face what surfaces", guidance: "Whatever rises to the surface today, however uncomfortable, is worth actually looking at." },
    { headline: "Check the story you're telling", guidance: "Notice today whether the big-picture story you believe about yourself still holds up." },
    { headline: "Reassess your own rules", guidance: "A rule you hold yourself to deserves reexamining today — it may no longer serve you." },
    { headline: "See past your own distance", guidance: "Today asks you to notice what you've been keeping at arm's length, including your own feelings." },
    { headline: "Trust what you're feeling", guidance: "Whatever emotional undercurrent shows up today is real and worth acknowledging, not dismissing." }
  ],
  // Day 19 — caution with new ideas, no contracts, cleansing
  [
    { headline: "Slow the impulse to sign", guidance: "Hold off on committing to anything binding today, however good it looks at first glance." },
    { headline: "Guard your resources", guidance: "Keep a closer watch on money or possessions today — this isn't a day for loosening your grip." },
    { headline: "Verify before you repeat it", guidance: "Something you hear today may not be fully accurate — check it before passing it along." },
    { headline: "Protect your emotional boundary", guidance: "Keep some distance from anything that feels draining today — your usual openness can wait." },
    { headline: "Skip the grand gesture", guidance: "Today isn't the day for a bold new commitment — let ambition rest until tomorrow." },
    { headline: "Double-check the details", guidance: "Something in the fine print deserves extra scrutiny today before you agree to anything." },
    { headline: "Delay the agreement", guidance: "A deal that seems fair today may not hold up — give it more time before signing on." },
    { headline: "Trust your suspicion", guidance: "If something feels off today, it probably is — don't talk yourself out of that instinct." },
    { headline: "Pause before the big promise", guidance: "Today tempts you to commit to more than you should — wait before making it official." },
    { headline: "Postpone the contract", guidance: "A binding decision made today is best delayed — the terms may look different tomorrow." },
    { headline: "Question the too-good idea", guidance: "An exciting new idea today deserves real scrutiny before you build anything on it." },
    { headline: "Keep your boundaries clear", guidance: "It's easy to absorb someone else's chaos today — keep a firmer line than usual." }
  ],
  // Day 20 — revelations, overcome doubt, release debts
  [
    { headline: "Act on the clarity", guidance: "A doubt that's held you back is finally dissolving today — move on the decision it was blocking." },
    { headline: "Let go of the old debt", guidance: "Whatever you've been owed or owing, financially or otherwise, is ready to settle today." },
    { headline: "See the pattern clearly", guidance: "A confusing situation finally makes sense today — trust the clarity when it arrives." },
    { headline: "Release the old hurt", guidance: "An old emotional debt is ready to be let go today — forgiveness serves you more than holding on." },
    { headline: "Trust your own certainty", guidance: "Self-doubt loosens its grip today — let your natural confidence lead without apology." },
    { headline: "Stop overanalyzing it", guidance: "The answer you've been circling is clearer today than you're giving it credit for." },
    { headline: "Make the decision", guidance: "A choice you've been putting off finally has an obvious answer today — take it." },
    { headline: "See the hidden truth", guidance: "Something that's been obscured becomes visible today — use the clarity instead of second-guessing it." },
    { headline: "Believe the bigger vision", guidance: "A doubt about your direction eases today — trust that the larger plan is still sound." },
    { headline: "Release what's no longer owed", guidance: "An old obligation, financial or otherwise, is ready to close today — let it." },
    { headline: "Trust the unconventional answer", guidance: "The clearer path today may not be the obvious one — trust the answer that stands apart." },
    { headline: "Trust the vision that arrives", guidance: "Something intuitive clicks into place today — treat it as real information, not just a feeling." }
  ],
  // Day 21 — justice, consolidation, forward motion, courage
  [
    { headline: "Charge ahead, with others", guidance: "Today's courage works best combined with a team — bring people along instead of going solo." },
    { headline: "Move steadily forward", guidance: "Today favors real, if unglamorous, progress — keep putting one foot in front of the other." },
    { headline: "Rally the group", guidance: "Today's momentum grows when you bring others into it — organize, coordinate, and move together." },
    { headline: "Stand up for your people", guidance: "Today asks you to defend something or someone you care about — do it without hesitation." },
    { headline: "Lead the charge", guidance: "Today rewards visible leadership — step forward and let others follow your momentum." },
    { headline: "Coordinate the details", guidance: "Today's forward motion needs someone managing the specifics — that's exactly your strength right now." },
    { headline: "Push for a fair outcome", guidance: "Today favors standing firm for what's fair, even if it means a little friction." },
    { headline: "Fight for what's true", guidance: "Today rewards standing your ground on something that actually matters, not backing down for peace." },
    { headline: "Take the bold trip forward", guidance: "Today's momentum favors going further than planned — say yes to the bigger version of the move." },
    { headline: "Claim the ground you've built", guidance: "Today is a fair day to assert the progress you've already earned — don't undersell it." },
    { headline: "Organize the collective push", guidance: "Today favors group momentum around a shared cause — your role is rallying people, not going alone." },
    { headline: "Move with quiet conviction", guidance: "Today's courage doesn't have to be loud — a gentle, steady stand still counts as real progress." }
  ],
  // Day 22 — learning, research, study
  [
    { headline: "Learn by doing", guidance: "Today's lesson sticks best through action — jump in and learn from the doing, not just the reading." },
    { headline: "Study something practical", guidance: "An hour spent learning something useful today pays off longer than you'd expect." },
    { headline: "Follow the research thread", guidance: "Today rewards genuine curiosity — chase the question all the way down instead of skimming it." },
    { headline: "Learn your own history", guidance: "Something about your own past or family story is worth looking into today." },
    { headline: "Learn something worth sharing", guidance: "Today's lesson is one you'll want to teach later — pay closer attention than usual." },
    { headline: "Get into the details", guidance: "Today rewards precision — the fine print of whatever you're studying actually matters." },
    { headline: "Study both sides", guidance: "Today favors understanding a topic from more than one angle before forming an opinion." },
    { headline: "Dig past the surface", guidance: "A surface-level answer won't satisfy you today — keep researching until you hit something real." },
    { headline: "Chase the bigger question", guidance: "Today's curiosity wants a real subject, not trivia — follow the question that actually interests you." },
    { headline: "Build real expertise", guidance: "Time invested in learning today compounds — treat it as part of a longer plan." },
    { headline: "Explore the unusual subject", guidance: "An offbeat topic deserves real attention today — your curiosity is pointed somewhere useful." },
    { headline: "Learn through intuition", guidance: "Today's understanding may come more through feeling than fact — trust that kind of knowing too." }
  ],
  // Day 23 — provocation, avoid crowds, finish existing work
  [
    { headline: "Keep the temper in check", guidance: "Today invites friction more than usual — choose the calmer response even when provoked." },
    { headline: "Stay out of the mess", guidance: "A complicated situation today isn't worth wading into — keep to your own steady lane." },
    { headline: "Avoid the rumor mill", guidance: "Gossip or half-true talk circulates easily today — stay out of it entirely." },
    { headline: "Keep your circle small", guidance: "Today favors a quiet, familiar space over a crowded or unpredictable one." },
    { headline: "Skip the spotlight today", guidance: "Attention today comes with more friction than usual — let today be quieter than normal." },
    { headline: "Finish what's already started", guidance: "Today isn't for new projects — tie off what's already underway instead." },
    { headline: "Avoid the no-win argument", guidance: "A disagreement today has no clean resolution — it's fine to simply step back from it." },
    { headline: "Watch, don't confront", guidance: "Today rewards observing a tense situation rather than wading directly into it." },
    { headline: "Hold the opinion back", guidance: "A blunt take today will land worse than usual — keep it to yourself for now." },
    { headline: "Work alone today", guidance: "Solo effort goes further than collaboration today — finish your part without waiting on others." },
    { headline: "Skip the group chaos", guidance: "A crowded or contentious situation today isn't worth your energy — step back from it." },
    { headline: "Stay clear of others' moods", guidance: "It's easy to absorb today's tension from people around you — keep a little more distance than usual." }
  ],
  // Day 24 — masculine energy, physical strength, channel deliberately
  [
    { headline: "Aim the power precisely", guidance: "You have real force behind you today — direct it at one clear target instead of everywhere at once." },
    { headline: "Put strength into something solid", guidance: "Physical effort today builds something that lasts — channel it into real, tangible work." },
    { headline: "Focus the drive", guidance: "Today's energy wants a single project, not several half-started ones — pick one and commit." },
    { headline: "Protect fiercely, gently", guidance: "Today's strength shows up best as fierce protection of the people or things you love." },
    { headline: "Own the power fully", guidance: "Today's confidence is earned — let it show without apologizing for taking up space." },
    { headline: "Build with precision", guidance: "Today's strength paired with your usual care makes for genuinely solid work — use both." },
    { headline: "Balance intensity with tact", guidance: "Today's drive is strong — pair it with your usual diplomacy so it doesn't tip into conflict." },
    { headline: "Use the full intensity", guidance: "This kind of power suits you today — commit fully instead of holding part of it back." },
    { headline: "Push the big goal forward", guidance: "Today's strength favors an ambitious move — put real effort behind the plan you've been circling." },
    { headline: "Build toward the long game", guidance: "Today's energy is best spent on something with a long payoff, not a quick win." },
    { headline: "Power the shared project", guidance: "Today's drive works best in service of something bigger than just you — bring others in." },
    { headline: "Ground the intensity in purpose", guidance: "Today's energy needs a clear direction or it scatters — anchor it in something you actually care about." }
  ],
  // Day 25 — passive, meditative, listen inward, no hurry
  [
    { headline: "Resist the urge to rush", guidance: "Today isn't built for speed — force yourself to slow down even though it feels unnatural." },
    { headline: "Sit in stillness", guidance: "Today rewards patience and quiet more than usual — there's nothing to prove by moving fast." },
    { headline: "Quiet the mental chatter", guidance: "Today asks for less talking and more listening, even to your own overactive thoughts." },
    { headline: "Let intuition lead quietly", guidance: "Today's quiet mood suits your natural sensitivity — trust the soft signals instead of chasing loud ones." },
    { headline: "Step back from performing", guidance: "Today doesn't call for your usual presence — a quieter, less visible version of you fits better." },
    { headline: "Let go of the checklist", guidance: "Today isn't for productivity — give yourself permission to simply be unhurried." },
    { headline: "Decide alone, slowly", guidance: "Today favors your own quiet reflection over outside opinions — there's no rush to conclude anything." },
    { headline: "Sit with what surfaces", guidance: "Whatever rises in the quiet today is worth sitting with rather than immediately acting on." },
    { headline: "Slow the restless urge", guidance: "Today asks you to stay still even though your instinct is to keep moving — try it anyway." },
    { headline: "Rest without guilt", guidance: "Today doesn't need to be productive to be worthwhile — let rest be the whole achievement." },
    { headline: "Unplug and listen", guidance: "Today favors stepping back from noise and ideas — a quieter, more internal stretch suits you." },
    { headline: "Trust the quiet knowing", guidance: "Today's intuition speaks softly — give yourself the stillness needed to actually hear it." }
  ],
  // Day 26 — wasted effort possible, watch not chase
  [
    { headline: "Save the fight for later", guidance: "Today's battles aren't worth winning — conserve your energy for one that actually matters." },
    { headline: "Don't force the outcome", guidance: "Pushing hard today won't move things faster — let today's pace be slower than you'd like." },
    { headline: "Watch more than you talk", guidance: "Today reveals more through what people do than what they say — pay closer attention." },
    { headline: "Take the quiet exit", guidance: "If today feels like too much, it's fine to step back rather than push through it." },
    { headline: "Let today be ordinary", guidance: "Not every day needs your full shine — let this one be simple and low-key." },
    { headline: "Do only what's necessary", guidance: "Today isn't the day for extra effort — handle the essentials and leave the rest." },
    { headline: "Notice who shows up", guidance: "Today quietly reveals who's actually reliable — pay attention rather than assuming." },
    { headline: "Read between the lines", guidance: "What people don't say today matters more than what they do — trust the undercurrent." },
    { headline: "Skip the overcommitment", guidance: "Today isn't the day to say yes to everything — hold back and conserve your enthusiasm." },
    { headline: "Coast on autopilot", guidance: "Today doesn't need your full effort — routine, steady work is enough for now." },
    { headline: "Observe the group dynamic", guidance: "Today shows you more about people's real intentions than usual — watch quietly before acting." },
    { headline: "Protect your energy", guidance: "Today can quietly drain you if you let it — keep some emotional reserve back for yourself." }
  ],
  // Day 27 — find yourself, share discoveries, intuitive insight
  [
    { headline: "Act on the insight", guidance: "Something becomes clear today — trust it enough to actually act on it, not just notice it." },
    { headline: "Let the insight settle", guidance: "Today's clarity doesn't need to be rushed into action — let it sit and prove itself first." },
    { headline: "Share what you've learned", guidance: "Something you've figured out is worth telling someone today — it may help them too." },
    { headline: "Trust the quiet knowing", guidance: "An intuitive hunch today, especially about someone close to you, deserves real weight." },
    { headline: "Let your truth be seen", guidance: "Today favors being genuinely yourself in front of others rather than a curated version." },
    { headline: "Refine insight into a plan", guidance: "A moment of clarity today is worth turning into something concrete — don't let it stay abstract." },
    { headline: "Share the discovery honestly", guidance: "Today favors telling someone the truth you've arrived at, even if it's a little uncomfortable." },
    { headline: "Trust the deep read", guidance: "Today's insight runs deeper than usual — treat it as real knowledge, not just a mood." },
    { headline: "Teach what you've discovered", guidance: "Today favors passing along something you've learned — it lands further than you'd expect." },
    { headline: "Apply the lesson practically", guidance: "Today's insight is worth building into your actual plans, not just noting and moving on." },
    { headline: "Follow the unusual insight", guidance: "A strange but clear thought today is worth trusting, even if it doesn't fit the usual logic." },
    { headline: "Honor the quiet revelation", guidance: "Today's insight likely arrives softly, in a quiet moment — don't rush past it." }
  ],
  // Day 28 — active, good humor, new projects, property favorable
  [
    { headline: "Start it today", guidance: "Today has real momentum behind new beginnings — go ahead and take the first step." },
    { headline: "Consider the property move", guidance: "A decision about home or land holds particular promise today — worth taking seriously." },
    { headline: "Pitch the fresh idea", guidance: "Today's mood is receptive — a new idea shared now is likely to land well." },
    { headline: "Invest in your home", guidance: "Today favors putting real energy into your living space or a family plan." },
    { headline: "Enjoy today fully", guidance: "Good humor comes easily today — let yourself actually enjoy what you're doing." },
    { headline: "Start the organized version", guidance: "A well-planned new beginning today has real staying power — trust the preparation you've done." },
    { headline: "Start something together", guidance: "Today favors beginning a project or plan with someone else rather than solo." },
    { headline: "Begin without overthinking", guidance: "Today's ease is real — let yourself start something without the usual deep scrutiny first." },
    { headline: "Say yes to the new venture", guidance: "Today's optimism is well-placed — a new undertaking started now has genuine potential." },
    { headline: "Make the property decision", guidance: "Today favors decisions about land, property, or long-term investment — the timing works in your favor." },
    { headline: "Launch the original idea", guidance: "Today's mood supports an unconventional new start — trust that people are more receptive than usual." },
    { headline: "Start the creative venture", guidance: "A new creative or compassionate project begun today carries real, lasting warmth." }
  ],
  // Day 29 — low energy, finish quietly, humble expectations
  [
    { headline: "Let today be quiet", guidance: "There's no prize for pushing hard today — let your usual drive rest until tomorrow." },
    { headline: "Keep it simple and light", guidance: "Today asks for less, not more — a light touch serves you better than full effort." },
    { headline: "Say less than usual", guidance: "Today favors quiet over conversation — let your usual chatter rest for a while." },
    { headline: "Stay gentle with yourself", guidance: "Today isn't the day to expect much of yourself — be as kind to yourself as you'd be to anyone else." },
    { headline: "Skip the grand display", guidance: "Today doesn't call for your usual presence — let it be modest and unremarkable." },
    { headline: "Lower the bar today", guidance: "Today's standard doesn't need to be your highest — good enough is genuinely good enough." },
    { headline: "Avoid new negotiations", guidance: "Today isn't the day to open a new agreement — let existing ones simply hold." },
    { headline: "Let today stay shallow", guidance: "Not everything needs excavating today — it's fine to leave some things at the surface." },
    { headline: "Stay close to home", guidance: "Today favors small and familiar over big and adventurous — save the leap for later." },
    { headline: "Coast without guilt", guidance: "Today doesn't need to be productive — a low-key day is the right call, not a failure." },
    { headline: "Step back from the group", guidance: "Today favors solitude over community — a quieter, more private stretch suits you better." },
    { headline: "Let today drift gently", guidance: "There's nothing urgent to chase today — let it pass softly, without much resistance." }
  ],
  // Day 30 — harmonious, complete affairs, monthly summing up
  [
    { headline: "Close it out fast", guidance: "Whatever's left unfinished from the month, tie it off today with your usual speed and move on." },
    { headline: "Settle the accounts", guidance: "Today favors squaring up anything owed, financially or otherwise, before the new cycle begins." },
    { headline: "Wrap up loose conversations", guidance: "A few unfinished conversations from the month deserve closure today, however small they seem." },
    { headline: "Reflect with gratitude", guidance: "Today favors looking back on the month with warmth, even the harder parts of it." },
    { headline: "Take a bow", guidance: "Whatever you accomplished this month deserves real acknowledgment today, from yourself if no one else." },
    { headline: "Tie off every detail", guidance: "Today rewards a genuinely thorough close to the month — leave nothing dangling." },
    { headline: "Restore what's out of balance", guidance: "Today favors settling any imbalance from the month, in a relationship or otherwise." },
    { headline: "Let the month's weight go", guidance: "Whatever the month asked of you, today is for releasing it fully before starting fresh." },
    { headline: "Take stock before the leap", guidance: "Today favors a genuine pause to reflect before the next big push begins." },
    { headline: "Finish, don't start", guidance: "Today rewards closing out the month properly rather than reaching ahead for what's next." },
    { headline: "Review with a clear eye", guidance: "Today favors an honest, slightly detached look back at the month just gone." },
    { headline: "Let the month settle softly", guidance: "Today favors a gentle, unforced close to the cycle — let it end quietly rather than dramatically." }
  ]
];

// Blends the Vronsky lunar day (1-30, moonrise-to-moonrise — see getSymbolDay in main.tsx)
// with the Moon's current zodiac sign. Focus tags are pulled straight from the day's and
// sign's own real content (doToday / bestFor), never invented.
// `signIndex` is the sign's fixed position (Aries=0 .. Pisces=11), independent of language —
// callers resolve this once against whichever zodiac list they're already using.
export function getHeroWisdom(
  lunarDay: number,
  doToday: string[],
  sign: { signIndex: number; bestFor: string[] },
  language: Language = "en"
): HeroWisdom {
  const list = language === "de" ? heroWisdomDe : heroWisdom;
  const dayIndex = ((lunarDay - 1) % list.length + list.length) % list.length;
  const signIndex = sign.signIndex >= 0 && sign.signIndex < 12 ? sign.signIndex : 0;
  const line = list[dayIndex][signIndex];

  return {
    headline: line.headline,
    guidance: line.guidance,
    focus: [...doToday.slice(0, 2), sign.bestFor[0]]
  };
}
