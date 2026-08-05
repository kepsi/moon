import type { Language } from "./i18n";
import { zodiacSignsDe } from "./zodiacSource.de";

export type ZodiacSign = {
  name: string;
  shortName: string;
  symbol: string;
  element: string;
  mode: string;
  // The full prepositional phrase for "Moon ___" headings — kept as its own field rather than
  // built from `name` because German zodiac signs need case-correct prepositions/articles
  // ("im Widder", "in der Jungfrau", "in den Zwillingen"), not a mechanical "in " + name.
  inPhrase: string;
  guidance: string;
  bestFor: string[];
  avoid: string[];
  relationships: string;
  business: string;
  housework: string;
  gardening: string;
  activeOrgans: string[];
  foodNote: string;
  foodFavor: string[];
  foodAvoid: string[];
};

// Order is load-bearing: index = Math.floor(moonEclipticLongitude / 30), Aries through Pisces.
export const zodiacSignsEn: ZodiacSign[] = [
  {
    name: "Aries",
    shortName: "Ari",
    symbol: "♈",
    element: "Fire",
    mode: "Cardinal",
    inPhrase: "in Aries",
    guidance: "Moon in Aries runs hot and vital — move the body, hydrate well, and let restlessness burn off through exercise rather than short tempers. Ease up on coffee, sugar, and chocolate.",
    bestFor: ["first steps", "body heat", "decisions"],
    avoid: ["impatience", "sharp words", "rushing"],
    relationships: "Attraction runs fast and magnetic, better suited to short, torrid romance than careful commitment. Family matters take a back seat to private interest.",
    business: "Good for bold moves and originality, not for contracts or long-range planning. Watch impulsiveness — sign nothing you haven't slept on.",
    housework: "Sharpen knives and scissors, fix small mechanical things, and polish glass and windows. Leave the dishes and fine china for a gentler day.",
    gardening: "A fruit day with rising energy. Plant edible crops, harvest grain, and graft the orchard while the moon waxes; prune and manage pests as it wanes.",
    activeOrgans: ["Head", "Brain", "Eyes", "Face"],
    foodNote: "Iron-rich vegetables and energizing foods. Avoid excess spice or caffeine that overheats the system.",
    foodFavor: ["Iron-rich vegetables", "Energizing foods"],
    foodAvoid: ["Excess spice", "Caffeine"]
  },
  {
    name: "Taurus",
    shortName: "Tau",
    symbol: "♉",
    element: "Earth",
    mode: "Fixed",
    inPhrase: "in Taurus",
    guidance: "Moon in Taurus favors new projects and steadying your finances — a fortunate day for furniture or property. Wrap up the throat and ears if the weather turns cold.",
    bestFor: ["comfort", "money care", "sensual grounding"],
    avoid: ["stubbornness", "comfort loops", "inflexibility"],
    relationships: "Taurus moons favor love — warm, sensory, unhurried. A good stretch for outings, small feasts, and letting affection show through touch.",
    business: "Favorable for serious, steady work: finances, job applications, property and real estate. Build on what already has weight behind it.",
    housework: "Strong for heavy, physical chores, the kind that reward muscle and patience. Monotonous labor gets finished well now.",
    gardening: "One of the most fertile signs for planting. Set roots, trees, and bushes, and relocate anything that needs new ground.",
    activeOrgans: ["Throat", "Neck", "Thyroid", "Vocal cords", "Ears"],
    foodNote: "Nourishing, grounding foods eaten slowly. Avoid overeating; chew thoroughly and savor the meal.",
    foodFavor: ["Nourishing, grounding foods", "Eating slowly"],
    foodAvoid: ["Overeating"]
  },
  {
    name: "Gemini",
    shortName: "Gem",
    symbol: "♊",
    element: "Air",
    mode: "Mutable",
    inPhrase: "in Gemini",
    guidance: "Moon in Gemini opens the day to conversation — good for meeting people, trading ideas, calls, and messages. Stretch out the shoulders and upper back.",
    bestFor: ["messages", "learning", "light planning"],
    avoid: ["scattered focus", "restlessness", "living in the head"],
    relationships: "Ties formed now stay light and noncommittal, better for meeting people than locking things down. Let curiosity replace pressure.",
    business: "Best for networking, pitching ideas, and swapping information. Push existing projects forward rather than launching new ones.",
    housework: "A good stretch for air quality — install fans or a purifier, freshen rooms, chase out stale air.",
    gardening: "As the moon wanes, seed, plant, and transplant flowers and vining plants. Also a fitting window for pest control and soil treatment.",
    activeOrgans: ["Shoulders", "Arms", "Hands", "Lungs", "Nervous system"],
    foodNote: "Light, varied foods. Breathing exercises and lung-supportive herbs benefit this placement.",
    foodFavor: ["Light, varied foods", "Lung-supportive herbs"],
    foodAvoid: ["Heavy foods"]
  },
  {
    name: "Cancer",
    shortName: "Can",
    symbol: "♋",
    element: "Water",
    mode: "Cardinal",
    inPhrase: "in Cancer",
    guidance: "Moon in Cancer runs emotionally tender — meet feelings with diplomacy and get proper rest. Favor light foods, and it's a good day for cosmetic or dental care.",
    bestFor: ["home care", "family repair", "memories"],
    avoid: ["moodiness", "clinging", "dwelling on the past"],
    relationships: "Tenderness rises — people turn sentimental, dreamy, easily moved. Warmth deepens contact, especially with those closest to you.",
    business: "Moods run sensitive and easily bruised, so lead with diplomacy rather than pressure. Read the room before you push for outcomes.",
    housework: "Good for the wet work of a home — vacuuming, mopping, refreshing the bathroom. General cleaning goes smoothly.",
    gardening: "Among the most fertile signs. Set moisture-loving, leafy, decorative plants, and prune or graft the orchard now.",
    activeOrgans: ["Stomach", "Breasts", "Chest", "Lymphatic system"],
    foodNote: "Comfort foods and easy-to-digest meals. Warm soups, dairy, and gentle stews are supportive and soothing.",
    foodFavor: ["Comfort foods", "Easy-to-digest meals", "Warm soups and stews"],
    foodAvoid: ["Hard-to-digest foods"]
  },
  {
    name: "Leo",
    shortName: "Leo",
    symbol: "♌",
    element: "Fire",
    mode: "Fixed",
    inPhrase: "in Leo",
    guidance: "Moon in Leo lifts creative enthusiasm — stay active and decisive, and get proper rest to protect the heart. A good day for a haircut or a festive occasion.",
    bestFor: ["creativity", "romance", "confidence"],
    avoid: ["pride", "drama", "seeking validation"],
    relationships: "The most romantic stretch of the month — love at first sight is entirely plausible. Let warmth and a little drama have their moment.",
    business: "Creative inspiration runs high, along with optimism, eloquence, and self-belief. Good for anything that asks you to shine.",
    housework: "Bring your own art and personality into the home. Let something unmistakably yours show up in the space.",
    gardening: "One of the least fertile signs. Cut back dry branches; while the moon waxes, seed into damp soil or lay a new lawn.",
    activeOrgans: ["Heart", "Spine", "Upper back"],
    foodNote: "Warming, generous foods. Heart-healthy choices: berries, leafy greens, olive oil.",
    foodFavor: ["Warming, generous foods", "Berries, leafy greens, olive oil"],
    foodAvoid: ["Heart-taxing fatty foods"]
  },
  {
    name: "Virgo",
    shortName: "Vir",
    symbol: "♍",
    element: "Earth",
    mode: "Mutable",
    inPhrase: "in Virgo",
    guidance: "Moon in Virgo favors business and intellectual work — a good day to start important projects. Eat well, and it's a fine day for haircuts, manicures, and hand care.",
    bestFor: ["routines", "health notes", "organizing"],
    avoid: ["perfectionism", "overthinking", "self-criticism"],
    relationships: "Connections formed now lean practical over passionate, built on understanding and responsibility rather than sweep-you-off-your-feet romance.",
    business: "A strong opening for new projects; efficiency, punctuality, and rational thinking come easily. Accounting and detailed financial work go especially well.",
    housework: "Good for kitchen deep-cleans, the fridge especially, and fixing appliances. Skip airing large loads of laundry.",
    gardening: "A root day with descending energy, the best sign for setting and transplanting. Enrich soil and manage pests, but don't count on stored harvests lasting.",
    activeOrgans: ["Intestines", "Digestive system", "Pancreas", "Spleen"],
    foodNote: "Clean, easily digestible foods. Fermented foods and fiber support the intestines. Eat regular, moderate meals.",
    foodFavor: ["Clean, easily digestible foods", "Fermented foods and fiber", "Regular, moderate meals"],
    foodAvoid: ["Irregular, heavy meals"]
  },
  {
    name: "Libra",
    shortName: "Lib",
    symbol: "♎",
    element: "Air",
    mode: "Cardinal",
    inPhrase: "in Libra",
    guidance: "Moon in Libra favors conversation, negotiation, and setting up meetings. Keep the kidneys and bladder warm, and it's a good day for facials, haircuts, eye care, or the dentist.",
    bestFor: ["conversation", "design", "agreements"],
    avoid: ["people-pleasing", "avoiding conflict", "indecision"],
    relationships: "Harmony and open-hearted talk come easily, and partnerships find their balance. Don't let politeness replace real investment, or things turn formal instead of close.",
    business: "Good for negotiation and diplomatic meetings, not for major decisions. Better to finish what's underway than start something new.",
    housework: "Lean into beauty and balance — windows (especially on a waning moon), decorative touches, organizing books and magazines. Laundry dries quickly.",
    gardening: "A flower day with descending energy. Transplant, set flowering herbs, and harvest — seeds saved now tend to be high quality.",
    activeOrgans: ["Kidneys", "Lower back", "Adrenal glands", "Skin"],
    foodNote: "Alkaline, balanced diet. Cucumber, watermelon, and lemon water support the kidneys.",
    foodFavor: ["Alkaline, balanced diet", "Cucumber, watermelon, lemon water"],
    foodAvoid: ["Acidic, unbalanced foods"]
  },
  {
    name: "Scorpio",
    shortName: "Sco",
    symbol: "♏",
    element: "Water",
    mode: "Fixed",
    inPhrase: "in Scorpio",
    guidance: "Moon in Scorpio favors creative and intellectual work, and even resolving stubborn problems — just handle matters of emotion with care. Keep the feet warm; a fair day to start renovations.",
    bestFor: ["shadow work", "intimacy", "release"],
    avoid: ["suspicion", "control", "testing loyalty"],
    relationships: "Passion and flirtation intensify, and bonds deepen, but so can jealousy and suspicion. Keep confidences and let honesty do the transforming.",
    business: "One of the most emotionally charged stretches — keep distance from authority figures, but trust the heightened focus for serious, weighty decisions.",
    housework: "Good for clearing out old, useless clutter, especially the dusty forgotten corners. Laundry and dishes go well; skip airing bedding or storing damp clothes.",
    gardening: "A leaf day with descending energy. Gather medicinal herbs, graft, and mow, but hold off on enriching vegetable beds or felling trees.",
    activeOrgans: ["Reproductive organs", "Colon", "Bladder", "Pelvis"],
    foodNote: "Cleansing, regenerating foods. Avoid extremes; deep, purposeful nourishment is favored.",
    foodFavor: ["Cleansing, regenerating foods", "Purposeful nourishment"],
    foodAvoid: ["Extremes"]
  },
  {
    name: "Sagittarius",
    shortName: "Sag",
    symbol: "♐",
    element: "Fire",
    mode: "Mutable",
    inPhrase: "in Sagittarius",
    guidance: "Moon in Sagittarius brings cheerful energy — good for contracts, applications, and travel. Don't overload yourself; it's also a fine day for massages, manicures, and other care.",
    bestFor: ["travel plans", "teaching", "faith"],
    avoid: ["restlessness", "bluntness", "skipping details"],
    relationships: "A favorable stretch for romantic outings, celebrations, and adventure together. Romance now runs passionate and optimistic, if sometimes brief.",
    business: "Cheerful energy and rising activity favor contracts, applications, and legal matters. Good for launching ventures and travel, not for buying property.",
    housework: "Finish what you're motivated to finish. Glass cleans and polishes easily; a good stretch for ironing, organizing clothes, preserving, and baking.",
    gardening: "A fruit day. Set fruit trees, sow grain, and deal with underground pests, but hold off on new planting or tilling.",
    activeOrgans: ["Hips", "Thighs", "Liver", "Sciatic nerve"],
    foodNote: "Generous, liver-supportive foods. Bitter greens, beets, and artichoke are especially beneficial.",
    foodFavor: ["Liver-supportive foods", "Bitter greens, beets, artichoke"],
    foodAvoid: ["Liver-taxing rich foods"]
  },
  {
    name: "Capricorn",
    shortName: "Cap",
    symbol: "♑",
    element: "Earth",
    mode: "Cardinal",
    inPhrase: "in Capricorn",
    guidance: "Moon in Capricorn favors planning and starting serious projects, along with cosmetic and eye care. Steer clear of bureaucratic offices today.",
    bestFor: ["priorities", "career", "long-term plans"],
    avoid: ["coldness", "self-criticism", "workaholism"],
    relationships: "Better for quiet, businesslike contact than romance or celebration — say less, and let commitment build slowly. What starts now can run long and steady.",
    business: "Favorable for planning and starting serious projects, work needing precision or instruction-following, and real estate. Avoid loans, debts, and job applications; logic runs strong.",
    housework: "Good for deep, unsentimental decluttering — it's easier to let things go now. Skip storing clothes or shoes, and mind your knees while you work.",
    gardening: "A root day with rising energy. Plant edible roots and winter vegetables, weed, compost, and manage underground pests — harvest and seed quality are both strong.",
    activeOrgans: ["Knees", "Bones", "Joints", "Teeth", "Nails"],
    foodNote: "Mineral-rich foods: bone broth, leafy greens, dairy. Support structural health and the skeletal system.",
    foodFavor: ["Mineral-rich foods", "Bone broth, leafy greens, dairy"],
    foodAvoid: ["Mineral-depleting foods"]
  },
  {
    name: "Aquarius",
    shortName: "Aqu",
    symbol: "♒",
    element: "Air",
    mode: "Fixed",
    inPhrase: "in Aquarius",
    guidance: "Moon in Aquarius sparks curiosity about the unknown, with flashes of inspiration — a fortunate day for meetings and conferences. Skip the bureaucratic offices, and take care of your legs.",
    bestFor: ["community", "ideas", "technology"],
    avoid: ["detachment", "rigidity", "denying feelings"],
    relationships: "Favorable for friendship and flirtation — let originality and warmth draw people in. Bonds lean platonic, with friendship reinforcing romance.",
    business: "Good for meetings and conferences, tricky for approaching bosses or authority. Innovation, research, and public speaking flourish.",
    housework: "Good for dry cleaning, new electronics, window washing, airing rooms, and laundry that needs a fresh smell. Baking and small celebrations also favored.",
    gardening: "One of the least fertile signs. Focus on pest and disease prevention; skip planting or transplanting, since young growth struggles now.",
    activeOrgans: ["Shins", "Ankles", "Circulatory system"],
    foodNote: "Light, hydrating foods. Good circulation is supported by moderate movement and steady fluid intake.",
    foodFavor: ["Light, hydrating foods", "Steady fluid intake"],
    foodAvoid: ["Dehydrating foods and drinks"]
  },
  {
    name: "Pisces",
    shortName: "Pis",
    symbol: "♓",
    element: "Water",
    mode: "Mutable",
    inPhrase: "in Pisces",
    guidance: "Moon in Pisces favors rest, romance, and creativity — saunas and hand or foot baths suit the mood. Alcohol, coffee, and some medicines hit harder than usual, so ease off them today.",
    bestFor: ["dreamwork", "music", "compassion"],
    avoid: ["blurred boundaries", "escapism", "absorbing others' emotions"],
    relationships: "Love now can feel larger than life — follow intuition, but stay alert to illusion, and be ready to walk away if doubt lingers.",
    business: "Favors creative work, seeking investors, and charitable efforts more than hard strategy. Rest and intuition serve better than mental grind; legal matters can succeed.",
    housework: "A time to rest more than push. Water-based chores like laundry and mopping suit the mood; leave bedding unaired, since damp lingers.",
    gardening: "One of the most fertile signs. Plant leafy vegetables, water indoor plants, mow the lawn, but skip pruning or preserving, since harvests won't keep.",
    activeOrgans: ["Feet", "Lymphatic system", "Immune system"],
    foodNote: "Gentle, nourishing foods. Fish and easily digestible proteins are supportive. Avoid anything intoxicating.",
    foodFavor: ["Gentle, nourishing foods", "Fish and digestible proteins"],
    foodAvoid: ["Intoxicating substances"]
  }
];

export function getZodiacSigns(language: Language): ZodiacSign[] {
  return language === "de" ? zodiacSignsDe : zodiacSignsEn;
}
