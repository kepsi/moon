// One concrete, blended practice suggestion per (Vronsky lunar day, Moon sign) pair — a real,
// varied action (journaling prompt, a specific read, a call, a workout, a small ritual...)
// rather than defaulting to meditation every time. The day supplies the theme/activity type;
// the sign supplies the concrete subject or flavor (e.g. a study day + an earthy, money-minded
// sign becomes "read about investing," not generic concentration practice).
//
// Outer array: 30 lunar days, in lunarDaySource order (index 0 = Day 1).
// Inner array: 12 signs, in zodiacSigns order (Aries, Taurus, Gemini, Cancer, Leo, Virgo,
// Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces).
const practiceWisdom: string[][] = [
  // Day 1 — planning day, month ahead
  [
    "Light a candle and write down the one goal you're most impatient to chase this month — then blow it out without acting on it yet.",
    "Sit with a warm drink and sketch out next month's budget or spending plan on paper — nothing has to be decided today.",
    "Open a blank note and free-write every idea in your head for ten minutes, then close it without acting on any of them yet.",
    "Light a candle at home and jot down what you want this month to feel like for your family, not just what to do.",
    "Write a short, private letter to yourself about what you want to be proud of by month's end.",
    "Make a clean, categorized list of this month's goals — health, work, home — without committing to start any of them today.",
    "Journal about what balance would look like this month between work and the people you care about.",
    "Write down, privately, the one thing you actually want this month and why — no one else needs to read it.",
    "Sketch out a loose big-picture vision for the month ahead, a trip, a goal, an idea, without booking anything yet.",
    "Draft next month's priorities on paper in order of importance, then set the list aside until tomorrow.",
    "Jot down one unconventional idea you want to explore this month, just for yourself, not to share yet.",
    "Light a candle, close your eyes, and let images of the month ahead drift through without forcing any into a plan."
  ],
  // Day 2 — trust your appetite, good for starting
  [
    "Write down the one thing you want most right now, then take one concrete first step toward it today.",
    "Cook a meal using only ingredients you genuinely crave, and eat it slowly without distractions.",
    "Text or call someone and simply ask them for what you need — practice saying it plainly.",
    "Cook a comforting meal for yourself or someone close, and notice what you actually want to be fed, literally and emotionally.",
    "Buy or make yourself something a little indulgent today, and let yourself enjoy it fully, without guilt.",
    "Write a short list of what your body and life actually need right now, then act on the top item.",
    "Plan a shared meal or outing with someone you like, and let it be exactly what you'd enjoy.",
    "Name, in writing, the one desire you usually keep quiet about, and sit with it honestly.",
    "Say yes to whatever you're craving today, food, an outing, a plan, without overthinking it.",
    "Review one financial goal today and take a concrete step toward funding something you actually want.",
    "Follow a craving that feels a bit unusual today, an odd food, an offbeat idea, and see where it leads.",
    "Prepare a simple, nourishing meal mindfully, paying attention to taste, texture, and how it makes you feel."
  ],
  // Day 3 — energetic, act, physical
  [
    "Do a hard, sweaty workout today, running, boxing, anything that lets you push physically as hard as you feel.",
    "Take a long, deliberate walk outdoors and let your body move at its own strong, steady pace.",
    "Do a quick burst of exercise, then immediately journal the ideas that surfaced while moving.",
    "Try a home workout or a walk near water, letting movement help release tension you're holding.",
    "Do a bold physical activity you enjoy showing off a little, dance, a class, a sport, and let yourself shine.",
    "Do a structured workout with clear reps or a set route, and track how it makes you feel afterward.",
    "Invite someone to move with you today, a walk, a class, a game, and match your energy to theirs.",
    "Do an intense solo workout that lets you burn through whatever emotional heat you're carrying today.",
    "Get outside for vigorous movement, hiking, running, biking, somewhere new if you can manage it.",
    "Push through a challenging workout today and note how much more you can handle than you assumed.",
    "Try a workout or movement style you've never done before — break your usual physical routine.",
    "Move your body through water if you can, swimming, a bath, or just dance freely at home."
  ],
  // Day 4 — solitude, careful words
  [
    "Spend twenty minutes alone outdoors instead of in company, and hold off on saying anything you haven't thought through.",
    "Sit quietly in nature or a garden and let your thoughts settle before making any decisions today.",
    "Write, but don't send, one message you're tempted to fire off — reread it tomorrow before deciding.",
    "Spend time alone journaling about a relationship that's been on your mind, without discussing it with anyone yet.",
    "Practice restraint today: write down the clever thing you want to say, and choose not to say it out loud.",
    "Review a decision you're about to make, alone, and list the pros and cons before consulting anyone else.",
    "Sit with a choice privately today rather than polling friends for opinions — trust your own conclusion first.",
    "Journal privately about a truth you're not ready to say aloud yet, and let the page hold it for now.",
    "Spend time alone with a book or idea rather than a group today, and let your thoughts wander freely.",
    "Use solitary time today to review a plan critically before presenting it to anyone else.",
    "Step away from your usual group chats or circles for a few hours and think something through solo.",
    "Spend quiet time in nature or with music, letting your intuition settle before you speak on anything important."
  ],
  // Day 5 — finish, then take your me-time
  [
    "Finish the one task you've been avoiding, fast, then reward yourself with an hour that's entirely yours.",
    "Pay off or plan to pay off a small debt today, then treat yourself to something comforting, guilt-free.",
    "Send the message that finally closes a loose thread, then spend the rest of the day reading just for you.",
    "Finish a small task you've been carrying, then run yourself a bath or make time to simply rest.",
    "Wrap up something you started, then do one thing today purely because you enjoy it, no audience needed.",
    "Close out one lingering item on your to-do list completely, then let the rest of the list wait.",
    "Settle a small imbalance, an owed favor, an unresolved conversation, then spend time doing something just for you.",
    "Release a debt or grudge you've been carrying quietly, then give yourself real, uninterrupted alone time.",
    "Finish the thing you promised yourself you'd complete, then plan a small adventure just for you.",
    "Tie off a financial or work loose end today, then actually take the break you've earned.",
    "Complete an overdue task, then spend some time alone with an idea or hobby that's just yours.",
    "Finish what needs finishing, then give yourself a quiet hour for music, art, or simply doing nothing."
  ],
  // Day 6 — easy day, intuition, connection
  [
    "Reach out to someone new today, a message, an introduction, and let the conversation move at its own easy pace.",
    "Spend time on a slow, sensory activity, cooking, a bath, music, and trust that nothing needs pushing today.",
    "Have a real, unhurried conversation with someone today, in person or by call, not just text.",
    "Trust a gut feeling about someone today enough to reach out or check in on them.",
    "Compliment someone genuinely today, and notice how easily warmth returns to you.",
    "Let one task go undone today and trust that it will still be fine tomorrow.",
    "Set up a coffee or call with someone you've been meaning to catch up with.",
    "Trust an intuitive read on a person or situation today without needing to investigate further.",
    "Strike up a conversation with someone outside your usual circle today, and follow where it leads.",
    "Let today be genuinely easy — skip one task on your list without guilt.",
    "Reach out to someone in your wider network today just to reconnect, no agenda needed.",
    "Trust a quiet feeling about someone or something today, and act gently on it."
  ],
  // Day 7 — words carry power, mindful speech
  [
    "Write down three things you want to be true, then say them out loud once, clearly and calmly.",
    "Write a short list of financial or life goals as simple affirmations, and read them aloud once.",
    "Practice saying less today: in one conversation, pause before responding and choose your words deliberately.",
    "Write a few kind words to someone you love and actually send them today.",
    "Speak one genuine, generous compliment to someone today, and mean every word of it.",
    "Write down the precise, honest version of something you need to say, then say it exactly that way.",
    "Have the fair, honest conversation you've been avoiding, phrased as kindly as you can manage.",
    "Write, then say aloud once, the truth you've been holding back from someone.",
    "Record a short voice note or write a page about where you want your life headed, and speak it with conviction.",
    "State one professional goal out loud to someone you trust today, and let it become more real by saying it.",
    "Voice an unconventional opinion you usually keep to yourself, gently, to someone who'll actually hear it.",
    "Write a gentle note to someone who needs kindness today, and send it without overthinking the wording."
  ],
  // Day 8 — unforeseen events, release old patterns
  [
    "Physically get rid of one object tied to an old chapter of your life, throw it out or give it away today.",
    "Cancel or change one comfortable but outdated habit or subscription today, even if it feels hard to let go.",
    "Delete or archive old messages or notes that no longer serve you, and notice how much lighter it feels.",
    "Write a short goodbye letter to an old emotional pattern you're ready to release, then put it away or burn it safely.",
    "Let go of one way you've been performing for others today, and do something purely for yourself instead.",
    "Declutter one drawer, shelf, or folder today as a physical version of releasing what you don't need anymore.",
    "End one relationship dynamic that's out of balance, even just by having an honest conversation about it.",
    "Do a small release ritual, write down what you're letting go of and safely burn or tear the paper.",
    "Cancel a plan or commitment that no longer excites you, freeing space for something better.",
    "Rebuild your to-do list from scratch today, dropping anything that no longer serves your real goals.",
    "Unfollow, mute, or step back from one online space that keeps you stuck in old patterns.",
    "Do a candlelit journaling session about what you're ready to release emotionally, then let the page close on it."
  ],
  // Day 9 — unfavorable, finish don't start
  [
    "Instead of starting something new, finish one thing already on your plate today, fully and carefully.",
    "Do a quiet check of your accounts or valuables today just to be sure everything's where it should be.",
    "Fact-check one piece of information you heard recently before repeating or acting on it.",
    "Stay in and do something comforting and familiar tonight rather than seeking out new company.",
    "Skip performing today, do something quiet and private instead of seeking attention.",
    "Review and tidy something you already started rather than opening a new project today.",
    "Hold off on agreeing to anything new today; revisit an existing commitment instead.",
    "Trust a wary feeling today, journal about what it's warning you about instead of acting on it yet.",
    "Stay closer to home today and finish reading or planning something you already began.",
    "Review an existing plan for weak points today rather than launching anything new.",
    "Double check a tempting new idea today, research it thoroughly before committing any energy to it.",
    "Ground yourself with a simple routine today, and postpone any decisions that feel foggy or unclear."
  ],
  // Day 10 — strengthen home and family
  [
    "Do one bold thing today to defend or support someone in your family, a call, a favor, a stand taken.",
    "Research or take a step toward a home purchase, renovation, or investment you've been considering.",
    "Call a family member or old friend today just to catch up properly, no particular reason needed.",
    "Cook a meal for your family or spend real, undistracted time at home today.",
    "Plan or host a small gathering for people you love, even something simple.",
    "Tackle one practical home task today, fix something, organize something, that's been on the list.",
    "Have the honest conversation that repairs a strained family tie, even if it's just a first step.",
    "Have one deep, honest conversation with someone close to you today instead of surface small talk.",
    "Plan a trip or outing that includes people who matter to you, even a small one.",
    "Take a concrete step today toward a long-term home or family financial goal.",
    "Reach out to extended family or old roots today, even if you don't usually stay close.",
    "Let home comfort you today, cook, rest, or simply be present in your space without obligation."
  ],
  // Day 11 — most energetic day, finish what's started
  [
    "Do the most physically demanding task on your list today, and finish it completely before stopping.",
    "Channel today's energy into finishing a home or body project you've already started.",
    "Pick the one idea buzzing loudest in your head and actually finish outlining or drafting it today.",
    "Use today's intensity to finally have the emotional conversation you've been building up to.",
    "Commit today's high energy to a creative project and actually finish a full piece of it.",
    "Finish the detailed task that requires real focus, today's energy can carry you through it.",
    "Finalize an agreement or decision you've been weighing; today's energy favors closing it out.",
    "Do intense physical exercise or a deep breathwork session to move today's charge through your body.",
    "Commit fully to the ambitious plan you've been circling, and take the first real step today.",
    "Push through the hardest item on your work list today; the payoff will be worth it.",
    "Use today's momentum to finally launch the idea you've been developing quietly.",
    "Pair today's intensity with something physical, a run, a dance, a swim, to keep it from turning into overwhelm."
  ],
  // Day 12 — love, compassion, charity
  [
    "Do one bold, generous act for someone today without expecting anything back.",
    "Cook or buy a comforting treat to share with someone you love today.",
    "Write a genuine, appreciative message to someone and actually send it today.",
    "Spend real, focused time with family today, cooking, talking, or simply being present.",
    "Give someone a heartfelt compliment or gift today, purely because it will make them feel good.",
    "Do a practical act of care for someone today, run an errand, fix something, help quietly.",
    "Plan quality time with a partner or close friend today, and let harmony be the whole goal.",
    "Let someone see a more vulnerable, honest side of you today.",
    "Give your full attention to someone today, put the phone away for one whole conversation.",
    "Let yourself be a little softer today; tell someone plainly that you appreciate them.",
    "Do something kind for someone outside your usual circle today, a stranger, a cause, a community member.",
    "Spend time today doing something compassionate, volunteering, listening, comforting, and let your empathy lead."
  ],
  // Day 13 — break cycles, learning, group work
  [
    "Identify one repeating frustration today and take the direct, decisive action that finally breaks it.",
    "Change one small daily habit today, a different route, a different breakfast, to interrupt a rut.",
    "Take a short course, read an article, or learn one new fact today that reframes an old problem.",
    "Journal about an emotional pattern that keeps repeating, and note the trigger you can watch for next time.",
    "Rewrite your part in a recurring situation today, choose a different response than usual.",
    "Trace a recurring problem back to its actual root cause today instead of treating the symptom again.",
    "Ask someone you trust for honest feedback on a pattern you can't see clearly yourself.",
    "Name, in writing, the pattern that keeps resurfacing in your life, and what it might be protecting you from.",
    "Read or watch something from a completely different perspective today to loosen a stuck belief.",
    "Redesign one system or routine that keeps failing, and set it up properly this time.",
    "Try an unconventional fix for a recurring problem today, something you wouldn't normally consider.",
    "Notice a recurring feeling today and trace where it actually started, rather than just riding it out again."
  ],
  // Day 14 — new beginnings, being seen
  [
    "Start the project you've been gearing up for today, don't wait for a better moment.",
    "Take a concrete first step on a financial or home goal you've been considering.",
    "Pitch your idea to someone today, in person, by email, however feels right.",
    "Start something that benefits your home or family today, even a small first step.",
    "Share your work or voice publicly today, a post, a presentation, a performance.",
    "Begin the refined version of a plan you've been quietly perfecting.",
    "Propose a new collaboration or partnership to someone today.",
    "Start the project that actually matters to you, not the easy, safe one.",
    "Say yes to a new opportunity today, even if it feels bigger than expected.",
    "Ask for the raise, promotion, or recognition you've been quietly working toward.",
    "Share an original idea with a group or community today for the first time.",
    "Start a creative or intuitive project today, and don't wait for more certainty first."
  ],
  // Day 15 — full moon, discipline
  [
    "Do a focused, disciplined workout today rather than letting today's intensity turn into recklessness.",
    "Practice real moderation with one meal today, notice the pull toward more, and choose enough instead.",
    "Write, don't say, everything urgent in your head today, then reread it tomorrow before acting.",
    "Do a calming ritual tonight, a bath, music, a call with someone steady, to settle today's high emotion.",
    "Channel today's intensity into one creative project rather than into drama or attention-seeking.",
    "Stick to your simplest routine today, skip anything elaborate or high-stakes.",
    "Practice choosing the middle option today in one decision that tempts you toward an extreme.",
    "Do an intense but contained practice today, a hard workout or deep meditation, rather than letting the intensity spill into conflict.",
    "Write down one commitment you're tempted to overpromise today, and cut it in half before agreeing to it.",
    "Hold to your usual discipline today even though the pull to indulge is stronger than normal.",
    "Take a short break from screens or group chats today if today's intensity feels like too much input.",
    "Do a grounding practice today, bare feet on the ground, a weighted blanket, to keep from being swept up in the tide."
  ],
  // Day 16 — rest, restore balance, gentle beauty
  [
    "Take a full rest day today, even if it feels unfamiliar, and notice how it recharges you.",
    "Take a long, comforting bath or spend time on a beauty ritual you actually enjoy.",
    "Turn off notifications for a few hours today and let your mind actually go quiet.",
    "Spend today tending to your own comfort, tea, a soft blanket, a favorite show.",
    "Do something beautiful just for yourself today, with no one watching or admiring it.",
    "Do a light, unhurried tidy today, just one small corner, nothing more ambitious.",
    "Spend time today on something purely aesthetic, rearranging flowers, choosing an outfit, enjoying beauty.",
    "Let today be gentle, a quiet walk or a soft playlist, rather than anything emotionally heavy.",
    "Take a slow day today, read, rest, or wander without a destination in mind.",
    "Give yourself permission to do nothing productive for at least an hour today.",
    "Step back from your usual causes and projects today, and rest without guilt.",
    "Spend today near water or music, and let yourself simply drift and recover."
  ],
  // Day 17 — joy, festivity, love
  [
    "Plan something spontaneously fun today, and go after the good time with full energy.",
    "Treat yourself to a genuinely pleasurable meal or experience today, and savor it slowly.",
    "Organize a casual get-together or lively conversation with people who make you laugh.",
    "Host or join a warm, casual gathering with people who feel like family.",
    "Do something today that lets you shine a little, dress up, perform, celebrate.",
    "Let today's plans be looser than usual, don't over-organize the fun.",
    "Say yes to a social invitation today, even a last-minute one.",
    "Let yourself enjoy something today without overanalyzing it, dance, laugh, be a little unguarded.",
    "Plan something adventurous and joyful today, even if it's a small outing.",
    "Set the to-do list aside for an evening and genuinely enjoy something today.",
    "Gather your people today, even informally, and let the conversation get playful.",
    "Put on music that moves you and let today's joy be soft, dreamy, and unstructured."
  ],
  // Day 18 — self-reflection, outer reflects inner
  [
    "Journal about what irritated you today, and ask what it's actually revealing about you.",
    "Notice a stubborn feeling today and write honestly about what's underneath it.",
    "Record a short voice memo talking through what's on your mind, then listen back to it.",
    "Journal about a recurring emotional reaction today, and treat yourself gently while you write.",
    "Ask yourself honestly today what's real beneath the image you usually present, and write down the answer.",
    "Write down the standard you're holding yourself to today, and question whether it's actually fair.",
    "Reflect on your own part in a recent conflict today, not just the other side of it.",
    "Journal about whatever surfaces today, however uncomfortable, without editing yourself.",
    "Question a belief about yourself today that you've been repeating for a while, is it still true?",
    "Reexamine a rule you hold yourself to today, and consider whether it still serves you.",
    "Notice what you've been keeping at emotional distance today, and write honestly about it.",
    "Trust and write down whatever emotional undercurrent you're feeling today, without dismissing it."
  ],
  // Day 19 — caution with new ideas, no contracts, cleansing
  [
    "Hold off on signing or committing to anything today; write down the offer instead and revisit it tomorrow.",
    "Do a quiet check of your finances or valuables today, just to make sure everything's accounted for.",
    "Fact-check a piece of news or gossip today before repeating it to anyone.",
    "Spend today with people who feel safe, and step back from anything emotionally draining.",
    "Skip any big commitments today; let ambition rest until you have more clarity.",
    "Read the fine print on something you're about to agree to, twice.",
    "Delay signing or agreeing to anything today, give it at least one more day.",
    "Trust a suspicion today enough to look into it further before dismissing it.",
    "Pause before making a big promise today, sleep on it instead.",
    "Postpone finalizing a contract or big decision today until the terms are clearer.",
    "Research an exciting new idea thoroughly today before committing any real energy to it.",
    "Do a small cleansing ritual today, tidy a space or take a shower, to clear whatever chaos you've absorbed."
  ],
  // Day 20 — revelations, overcome doubt, release debts
  [
    "Make the decision you've been putting off today, act on the clarity as soon as it arrives.",
    "Settle a small debt or overdue payment today, and notice the relief it brings.",
    "Write out a confusing situation today until the pattern becomes clear on the page.",
    "Write a letter, sent or not, releasing an old emotional debt or hurt today.",
    "Do one thing today that your self-doubt has been blocking, and trust your natural confidence.",
    "Stop overanalyzing one decision today and commit to the answer you already know.",
    "Make the choice you've been circling today; the obvious answer is probably the right one.",
    "Trust a clear, sudden insight today rather than second-guessing it.",
    "Recommit to your bigger vision today, even if a recent doubt made it wobble.",
    "Close out an old professional or financial obligation today that's been quietly weighing on you.",
    "Trust an unconventional answer today, even if it's not the one everyone else expects.",
    "Trust an intuitive click today and treat it as real information, not just a feeling."
  ],
  // Day 21 — justice, consolidation, courage
  [
    "Organize a group effort today and lead it with full confidence.",
    "Take one steady, concrete step forward today on a goal you've been building toward.",
    "Rally a few people around an idea today, coordinate, organize, get things moving together.",
    "Stand up for someone you care about today, without hesitation.",
    "Take visible leadership on something today, and let people follow your momentum.",
    "Manage the practical details of a group project today; your precision will carry it.",
    "Push for a fair outcome today, even if it means a little friction.",
    "Stand your ground on something that actually matters today, rather than keeping the peace.",
    "Say yes to the bigger, bolder version of a plan today.",
    "Claim credit for progress you've already earned today, don't undersell it.",
    "Organize people around a shared cause today, your role is rallying, not going solo.",
    "Take a quiet but real stand on something today, even a gentle one still counts."
  ],
  // Day 22 — learning, research, study
  [
    "Dive into a hands-on class or tutorial today, and learn by actually doing it.",
    "Read an article or watch a video about investing or growing your money today.",
    "Follow a genuine curiosity today, research a question all the way down instead of skimming it.",
    "Look into your own family history or an old memory today, journal what you find.",
    "Learn something today that you can teach or share with someone else soon.",
    "Read the detailed instructions or fine print on something you're studying today, precision pays off.",
    "Research a topic from two opposing viewpoints today before forming your own opinion.",
    "Dig past the surface on a subject today, keep researching until you hit something real.",
    "Read about a big, philosophical question today, something that actually interests you, not trivia.",
    "Spend focused time today building real expertise in something tied to your long-term goals.",
    "Explore an offbeat, unusual topic today that most people wouldn't think to study.",
    "Learn through feeling today, listen to music, watch a film, and trust what it teaches you intuitively."
  ],
  // Day 23 — provocation, avoid crowds, finish existing work
  [
    "Do a calming physical practice today, a walk or workout, before any conversation that could turn tense.",
    "Stay home today if you can, and handle only familiar, low-stakes tasks.",
    "Avoid group chats or gossip today; write your thoughts down instead of sharing them.",
    "Keep today's plans small and familiar, skip anything crowded or unpredictable.",
    "Do something quiet and unwitnessed today rather than seeking attention.",
    "Finish an existing task today rather than starting anything new.",
    "Step back from a no-win argument today; write your side down instead of pressing it.",
    "Observe a tense situation today rather than wading directly into it.",
    "Keep an opinion to yourself today, journal it instead of voicing it.",
    "Work solo today on your part of a project, without waiting on others.",
    "Skip a crowded or contentious gathering today; protect your energy instead.",
    "Keep a bit more emotional distance today, journal rather than absorb others' moods directly."
  ],
  // Day 24 — masculine energy, physical strength, channel deliberately
  [
    "Do a demanding workout today and aim all that force at one clear physical goal.",
    "Put real physical effort into a home or garden project today, something tangible.",
    "Pick one project today and commit your full energy to just that one, not three at once.",
    "Use today's strength to protect or provide for someone you love, practically and directly.",
    "Do something today that lets your confidence and power show fully, without apology.",
    "Pair today's strength with precision, tackle the demanding task that needs real care.",
    "Channel today's intensity diplomatically, a hard conversation handled with real tact.",
    "Do an intense workout or deep practice today, and commit to it fully.",
    "Put real effort behind the ambitious plan you've been circling today.",
    "Spend today's energy on something with a long payoff, not a quick win.",
    "Bring your drive to a shared or community project today rather than going it alone.",
    "Ground today's intensity in something you care about, art, cause, a person, so it doesn't scatter."
  ],
  // Day 25 — passive, meditative, listen inward
  [
    "Force yourself to slow down today, even a ten-minute sit without moving will feel unfamiliar and useful.",
    "Sit in stillness today with nothing to accomplish, just notice what your body wants.",
    "Practice listening today, in one conversation, say less than you normally would.",
    "Let intuition lead today, journal a soft feeling you've been sensing without acting on it yet.",
    "Do something quiet and private today rather than performing for anyone.",
    "Give yourself permission to skip today's checklist entirely, just for today.",
    "Reflect on a decision alone today, rather than polling anyone else's opinion.",
    "Sit with whatever surfaces in the quiet today, rather than immediately acting on it.",
    "Stay still today even though your instinct says move, notice what that stillness reveals.",
    "Rest today without guilt, let it be the whole achievement, nothing more required.",
    "Unplug from screens and group chats today, and spend some real time alone.",
    "Sit in silence today and let your intuition speak softly, without rushing to interpret it."
  ],
  // Day 26 — wasted effort, watch not chase
  [
    "Save your energy today, skip a fight that isn't actually worth winning.",
    "Let today's pace be slower than you'd like, don't force any outcome.",
    "Listen more than you talk today, notice what people's actions reveal instead of their words.",
    "Step back from something overwhelming today rather than pushing through it.",
    "Let today be simple and low-key, no need to shine right now.",
    "Handle only the essentials today, and let the rest of the list wait.",
    "Notice quietly today who's actually reliable, rather than assuming.",
    "Read between the lines today, what people don't say matters more than what they do.",
    "Hold back from overcommitting today, conserve your usual enthusiasm.",
    "Coast on routine today, steady effort is enough, nothing extra required.",
    "Watch a group dynamic today quietly before acting on anything within it.",
    "Protect your energy today, keep some emotional reserve for yourself rather than giving it all away."
  ],
  // Day 27 — find yourself, share discoveries, intuitive insight
  [
    "Act today on a piece of clarity you've had, don't just notice it, actually use it.",
    "Let a recent insight settle today before turning it into action, sit with it first.",
    "Share something you've recently learned with someone today, it may help them too.",
    "Trust an intuitive hunch about someone close to you today, and act on it gently.",
    "Let people see the real you today, rather than a curated version.",
    "Turn a recent moment of clarity into a concrete plan today, don't let it stay abstract.",
    "Tell someone an honest truth you've arrived at today, even if it's a little uncomfortable.",
    "Trust a deep insight today as real knowledge, not just a passing mood.",
    "Teach or share something you've learned recently, it will land further than you expect.",
    "Build a recent insight into your actual plans today, not just a private note.",
    "Follow a strange but clear thought today, even if it doesn't fit conventional logic.",
    "Honor a quiet revelation today by writing it down before it fades."
  ],
  // Day 28 — active, good humor, new projects, property
  [
    "Take the first real step on something new today, don't wait for the perfect moment.",
    "Look into a property, home improvement, or investment decision today, the timing favors it.",
    "Pitch a fresh idea to someone today, the reception is likely to be good.",
    "Put real energy into your home or a family plan today.",
    "Do something today purely because it makes you happy, and let yourself enjoy it fully.",
    "Start the well-planned version of a project today, trust the preparation you've already done.",
    "Begin a project or plan together with someone today, rather than solo.",
    "Start something today without the usual deep scrutiny, trust today's ease.",
    "Say yes to a new undertaking today, your optimism is well-placed.",
    "Move forward on a property or long-term investment decision today.",
    "Launch an unconventional new idea today, people are more receptive than you'd expect.",
    "Start a creative or compassionate project today, and let its warmth be the whole point."
  ],
  // Day 29 — low energy, finish quietly, humble expectations
  [
    "Let your usual drive rest today, do only what's genuinely necessary.",
    "Keep today light, a simple meal, an easy task, nothing demanding.",
    "Say less than usual today, let conversation be quiet rather than constant.",
    "Be as gentle with yourself today as you'd be with someone you love.",
    "Let today be modest and unremarkable, no performance required.",
    "Lower your usual standard today, good enough is genuinely good enough.",
    "Avoid opening any new agreements today, let existing ones simply hold.",
    "Let today stay shallow, not everything needs excavating right now.",
    "Stay close to home today, save the big adventure for later.",
    "Coast today without guilt, a low-key day is the right call, not a failure.",
    "Spend today in solitude rather than community, a quieter stretch suits you.",
    "Let today drift softly, there's nothing urgent to chase right now."
  ],
  // Day 30 — harmonious, complete affairs, monthly summing up
  [
    "Tie off whatever's left unfinished from the month today, fast and completely.",
    "Review your finances today, settle anything owed before the new cycle begins.",
    "Send the message that closes out an unfinished conversation from this month.",
    "Reflect today on the month with real gratitude, even its harder parts.",
    "Acknowledge what you accomplished this month today, out loud, to yourself if no one else.",
    "Do a genuinely thorough review of the month today, leave nothing dangling.",
    "Address any imbalance from the month today, in a relationship or a commitment.",
    "Do a release ritual today, write down what the month asked of you, and let it go.",
    "Take stock of the month today before the next big push begins.",
    "Close out the month properly today rather than reaching ahead for what's next.",
    "Review the month with a clear, slightly detached eye today, what worked, what didn't.",
    "Let today's close of the month be gentle and unforced, not dramatic."
  ]
];

const signOrder = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

// Blends the Vronsky lunar day (1-30, moonrise-to-moonrise — see getSymbolDay in main.tsx)
// with the Moon's current zodiac sign into one concrete practice suggestion.
export function getPracticeWisdom(lunarDay: number, signName: string): string {
  const dayIndex = ((lunarDay - 1) % practiceWisdom.length + practiceWisdom.length) % practiceWisdom.length;
  const signIndex = signOrder.indexOf(signName);
  return practiceWisdom[dayIndex][signIndex < 0 ? 0 : signIndex];
}

// Lunar days whose dream guidance (see lunarDaySource.ts dreamTiming/dreamTip) calls for
// pre-sleep preparation, keyed by the day the dream itself belongs to — not the day before it.
// The caller determines which lunar day is actually active at bedtime tonight (it may not be
// today's displayed day, and it may not simply be "tomorrow" either) and looks that up here,
// rather than this data assuming a fixed one-day-early offset.
const dreamPrepByDay: Record<number, string> = {
  1: "Before bed tonight, take a few minutes to picture the month ahead — dreams tend to run gentle tonight, so it's a good one to sketch plans into.",
  6: "Before bed tonight, ask your subconscious one clear question — tonight's dream may hold the answer, but only if you keep it to yourself tomorrow.",
  8: "Before bed tonight, set an intention to see where you're ready to change, and plan to sit with the dream again in the morning.",
  20: "Before bed tonight, ask for something specific, a solution, a next step, real clarity — tonight's dream is a good one to actually request.",
  22: "Before bed tonight, set a clear intention or question for your subconscious, and keep a notebook close to record what arrives by morning.",
  29: "Before bed tonight, light a candle and clear your space — tonight's dreams can run heavy, and a calm room helps soften them."
};

// `bedtimeLunarDay` is the lunar day actually active at tonight's bedtime (see getSymbolDay
// called with a ~23:00 anchor in main.tsx) — the same day whose dream you'll wake up with.
export function getDreamPrep(bedtimeLunarDay: number): string | null {
  const day = ((bedtimeLunarDay - 1) % 30 + 30) % 30 + 1;
  return dreamPrepByDay[day] ?? null;
}
