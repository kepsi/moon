export type LunarSourceDay = {
  lunarDay: number;
  symbol: string;
  emoji: string;
  activeOrgans: string[];
  doToday: string[];
  avoidToday: string[];
  foodNote: string;
  dreamFocus: string;
  dreamGuidance: string;
  sourceUrl: string;
};

export const lunarDaySource: LunarSourceDay[] = [
  {
    lunarDay: 1,
    symbol: "Candle",
    emoji: "🕯️",
    activeOrgans: ["Head", "Brain", "Eyes", "Sinuses"],
    doToday: ["Set monthly intentions", "Candle meditation", "Light planning"],
    avoidToday: ["Heavy decisions", "Financial transactions", "Physical strain"],
    foodNote: "Light vegetarian foods only. Avoid spicy, fatty, or stimulating foods, alcohol, coffee, and tea.",
    dreamFocus: "Month-ahead sketches",
    dreamGuidance: "Dreams can sketch the coming lunar month. Notice desires, plans, and constructive images; include the useful ones in your new-moon intentions.",
    sourceUrl: "https://om-journal.com/moonday/1"
  },
  {
    lunarDay: 2,
    symbol: "Horn of plenty",
    emoji: "🌾",
    activeOrgans: ["Mouth", "Throat", "Gums", "Neck"],
    doToday: ["Speak your desires aloud", "Begin new projects", "Connect with abundance"],
    avoidToday: ["Negative speech", "Fasting", "Disputes"],
    foodNote: "Nourishing, generous meals. Dairy and grains support today's energy. Avoid going hungry.",
    dreamFocus: "Karmic blueprint",
    dreamGuidance: "Dreams may point toward recurring life tasks or karmic knots. Treat difficult images calmly; they can show what wants attention this month.",
    sourceUrl: "https://om-journal.com/moonday/2"
  },
  {
    lunarDay: 3,
    symbol: "Leopard",
    emoji: "🐆",
    activeOrgans: ["Shoulders", "Arms", "Hands", "Joints"],
    doToday: ["Physical activity", "Assert boundaries", "Show courage"],
    avoidToday: ["Passive waiting", "Starting new relationships", "Excess indulgence"],
    foodNote: "Energizing foods. Keep portions moderate; avoid overeating or heavy meals.",
    dreamFocus: "Energy and courage",
    dreamGuidance: "Dreams can reveal how your energy is moving. Struggle, resistance, or victory imagery is useful for reading your inner strength.",
    sourceUrl: "https://om-journal.com/moonday/3"
  },
  {
    lunarDay: 4,
    symbol: "Tree of Knowledge",
    emoji: "🌳",
    activeOrgans: ["Stomach", "Digestive system", "Chest"],
    doToday: ["Seek wisdom", "Quiet reflection", "Careful planning"],
    avoidToday: ["Rash decisions", "Arguments", "Starting major new ventures"],
    foodNote: "Simple, clean foods. Avoid excess; this day calls for restraint and clarity.",
    dreamFocus: "Warnings and inherited patterns",
    dreamGuidance: "Dreams may come true, especially vivid ones. Tangled images ask you to revise plans; relatives can point to inherited patterns ready for care.",
    sourceUrl: "https://om-journal.com/moonday/4"
  },
  {
    lunarDay: 5,
    symbol: "Unicorn",
    emoji: "🦄",
    activeOrgans: ["Esophagus", "Chest", "Third eye (Ajna)"],
    doToday: ["Finish started projects", "Pay debts", "Cook mindfully"],
    avoidToday: ["Fasting", "Losing valuables", "New financial ventures"],
    foodNote: "Dairy, fruits, honey. Avoid meat, nuts, fermented foods, grains, seeds, and alcohol. Do not overeat.",
    dreamFocus: "Health and movement",
    dreamGuidance: "Good dreams are promising, while disturbing ones ask for health and energy care. Roads, movement, and even crying can be positive signs.",
    sourceUrl: "https://om-journal.com/moonday/5"
  },
  {
    lunarDay: 6,
    symbol: "Crane",
    emoji: "🦢",
    activeOrgans: ["Large intestine", "Abdomen", "Lower digestive tract"],
    doToday: ["Ask clear questions before sleep", "Intuitive self-care", "Gentle exercise"],
    avoidToday: ["Sharing dream content widely", "Anger or conflict", "Overexertion"],
    foodNote: "Light, cleansing foods. A gentle day for dietary adjustments and digestive care.",
    dreamFocus: "Private revelation",
    dreamGuidance: "Dreams can carry answers, but are best kept private. Ask a clear question before sleep and write down the images immediately on waking.",
    sourceUrl: "https://om-journal.com/moonday/6"
  },
  {
    lunarDay: 7,
    symbol: "Wind rose",
    emoji: "🧭",
    activeOrgans: ["Throat", "Thyroid", "Vocal cords", "Neck"],
    doToday: ["Express your purpose", "Travel or plan journeys", "Speak your truth"],
    avoidToday: ["Idle talk", "Harsh or careless words", "Overcommitting"],
    foodNote: "Varied, moderate meals. Warm liquids and herbal teas support the throat.",
    dreamFocus: "Words and purpose",
    dreamGuidance: "Pay special attention to spoken words in dreams. They may carry useful guidance about your direction, though fulfillment may take time.",
    sourceUrl: "https://om-journal.com/moonday/7"
  },
  {
    lunarDay: 8,
    symbol: "Phoenix",
    emoji: "🔥",
    activeOrgans: ["Heart", "Chest", "Upper back", "Spine"],
    doToday: ["Release old patterns", "Creative reinvention", "Transformation practices"],
    avoidToday: ["Clinging to the past", "Emotional extremes", "Reckless action"],
    foodNote: "Warming, heart-nourishing foods. Avoid stimulants and alcohol.",
    dreamFocus: "Transformation",
    dreamGuidance: "Dreams may show unrealized gifts, old unfinished problems, or your readiness for change. Open spaces suggest movement; dead ends ask for renewal.",
    sourceUrl: "https://om-journal.com/moonday/8"
  },
  {
    lunarDay: 9,
    symbol: "Bat",
    emoji: "🦇",
    activeOrgans: ["Kidneys", "Lower back", "Adrenal glands"],
    doToday: ["Face hidden truths", "Inner reflection", "Rest and recover"],
    avoidToday: ["Major decisions", "New beginnings", "Provocative situations"],
    foodNote: "Kidney-supportive foods: water-rich vegetables, barley, warm soups. Avoid salt and alcohol.",
    dreamFocus: "Hidden conflict",
    dreamGuidance: "Dreams may be intense or unpleasant because hidden conflicts are surfacing. Extract the lesson, then let the heavy images go.",
    sourceUrl: "https://om-journal.com/moonday/9"
  },
  {
    lunarDay: 10,
    symbol: "Fountain",
    emoji: "⛲",
    activeOrgans: ["Joints", "Connective tissue", "Back", "Spine"],
    doToday: ["Honor family and ancestors", "Acts of gratitude", "Generous giving"],
    avoidToday: ["Selfishness", "Waste", "Breaking important traditions"],
    foodNote: "Nourishing, traditional foods. Generous meals are favorable; share food with others.",
    dreamFocus: "Family line",
    dreamGuidance: "Dreams can carry family, ancestry, or lineage themes. Bright dreams may be light and symbolic; disturbing dreams should be acknowledged and released.",
    sourceUrl: "https://om-journal.com/moonday/10"
  },
  {
    lunarDay: 11,
    symbol: "Kundalini",
    emoji: "🐍",
    activeOrgans: ["Legs", "Calves", "Circulation", "Subtle energy channels"],
    doToday: ["Meditation and energy practices", "Creative or spiritual work", "Yoga or movement"],
    avoidToday: ["Excesses of any kind", "Impulsive spending", "Draining energy through conflict"],
    foodNote: "Light, sattvic foods. Avoid meat and stimulants. Fasting is supported if feeling called.",
    dreamFocus: "Material and spiritual balance",
    dreamGuidance: "Dreams can show whether your material life and spiritual life are moving together. Your role in the dream is the main clue.",
    sourceUrl: "https://om-journal.com/moonday/11"
  },
  {
    lunarDay: 12,
    symbol: "Heart",
    emoji: "❤️",
    activeOrgans: ["Heart", "Cardiovascular system", "Chest", "Blood"],
    doToday: ["Acts of love and compassion", "Heart-centered reflection", "Giving and receiving"],
    avoidToday: ["Conflict and cruelty", "Overwork", "Emotional suppression"],
    foodNote: "Heart-nourishing foods: berries, leafy greens, dark chocolate. Avoid excess saturated fats.",
    dreamFocus: "Values",
    dreamGuidance: "Dreams can reveal whether material or spiritual values are dominating. Bright, well-remembered dreams deserve attention.",
    sourceUrl: "https://om-journal.com/moonday/12"
  },
  {
    lunarDay: 13,
    symbol: "Wheel",
    emoji: "☸️",
    activeOrgans: ["Reproductive system", "Pelvis", "Lower abdomen"],
    doToday: ["Break old cycles", "Review recurring patterns", "Seek conscious change"],
    avoidToday: ["Repeating past mistakes", "Leaving things half-finished", "Complacency"],
    foodNote: "Light, cleansing meals. Avoid excess. Fresh vegetables and juices support the cycle-breaking energy.",
    dreamFocus: "Breaking loops",
    dreamGuidance: "Dreams may show where you are repeating a loop and where change is possible. Record them quickly; warnings may unfold soon.",
    sourceUrl: "https://om-journal.com/moonday/13"
  },
  {
    lunarDay: 14,
    symbol: "Two pipes",
    emoji: "🎵",
    activeOrgans: ["Feet", "Lymphatic system", "Lower body", "Immune system"],
    doToday: ["Music and creative arts", "Develop latent gifts", "Gentle spiritual practices"],
    avoidToday: ["Overexertion", "Confrontations", "Excess food or drink"],
    foodNote: "Moderate, balanced diet. Hydration is especially important today.",
    dreamFocus: "Hidden abilities",
    dreamGuidance: "Dreams are usually not predictive today, but they may reveal abilities that deserve development. Heavy dreams can be released lightly.",
    sourceUrl: "https://om-journal.com/moonday/14"
  },
  {
    lunarDay: 15,
    symbol: "Fiery serpent",
    emoji: "🐉",
    activeOrgans: ["Liver", "Gallbladder", "Whole body at peak energy"],
    doToday: ["Celebrate and express yourself", "Reflect on the cycle so far", "Full-moon ritual"],
    avoidToday: ["Alcohol", "Overeating", "Heated arguments"],
    foodNote: "Liver-supportive foods: beets, bitter greens, artichoke. Avoid alcohol and heavy fats absolutely.",
    dreamFocus: "Subconscious weather",
    dreamGuidance: "Dreams mirror your current inner state. Bright dreams may be prophetic if kept private; heavy dreams point to imbalance and the next cycle's work.",
    sourceUrl: "https://om-journal.com/moonday/15"
  },
  {
    lunarDay: 16,
    symbol: "Butterfly",
    emoji: "🦋",
    activeOrgans: ["Kidneys", "Skin", "Lower back", "Lymph"],
    doToday: ["Beauty rituals", "Artistic expression", "Release and let go"],
    avoidToday: ["Harsh words", "Decisions made in strong emotion", "Overindulgence"],
    foodNote: "Light and cleansing. Kidney-supportive choices: cucumber, watermelon, lemon water.",
    dreamFocus: "Cleansing and balance",
    dreamGuidance: "Dreams help release tension and restore balance. Nightmares can be read as the psyche clearing old pressure rather than as bad omens.",
    sourceUrl: "https://om-journal.com/moonday/16"
  },
  {
    lunarDay: 17,
    symbol: "Shakti",
    emoji: "⚡",
    activeOrgans: ["Reproductive organs", "Sacral center", "Endocrine system"],
    doToday: ["Creative projects", "Expressive movement or dance", "Cultivate vitality"],
    avoidToday: ["Suppressing creative energy", "Depressive thoughts", "Excessive restriction"],
    foodNote: "Energizing, warming foods. Ginger, cinnamon, and natural spices are beneficial.",
    dreamFocus: "Creative life force",
    dreamGuidance: "Dreams reflect sexual and creative energy. Pleasant dreams suggest flow; unpleasant ones ask where vitality has been suppressed.",
    sourceUrl: "https://om-journal.com/moonday/17"
  },
  {
    lunarDay: 18,
    symbol: "Mirror",
    emoji: "🪞",
    activeOrgans: ["Stomach", "Intestines", "Digestive fire"],
    doToday: ["Self-reflection and journaling", "Honest inner review", "Sit with what you see"],
    avoidToday: ["Vanity or self-deception", "Excessive screen time", "Ignoring difficult truths"],
    foodNote: "Easily digestible foods. Avoid overeating; probiotic foods like yogurt support digestive clarity.",
    dreamFocus: "Self-reflection",
    dreamGuidance: "Dreams mirror the gap between who you are living as and who you want to become. They may also show blocks, health hints, or practical openings.",
    sourceUrl: "https://om-journal.com/moonday/18"
  },
  {
    lunarDay: 19,
    symbol: "Spider",
    emoji: "🕷️",
    activeOrgans: ["Lymphatic system", "Spleen", "Blood", "Immune system"],
    doToday: ["Gentle spiritual practice", "Prayer or ritual", "Ask for outside support"],
    avoidToday: ["Complex decisions", "Starting new projects", "Travel or major moves"],
    foodNote: "Simple, cleansing foods. Very light meals or fasting is beneficial. Avoid heavy or processed foods.",
    dreamFocus: "Deep psyche",
    dreamGuidance: "Dreams may be difficult and should not be interpreted too literally. Use prayer, release, or outside support if the imagery feels heavy.",
    sourceUrl: "https://om-journal.com/moonday/19"
  },
  {
    lunarDay: 20,
    symbol: "Eagle",
    emoji: "🦅",
    activeOrgans: ["Eyes", "Liver", "Vision centers", "Brain"],
    doToday: ["Intentional dreaming", "Set clear goals", "Strategic planning"],
    avoidToday: ["Scattered attention", "Avoiding truth", "Procrastinating on important matters"],
    foodNote: "Liver-supportive foods: artichoke, dandelion greens, fresh vegetable juices. Avoid alcohol.",
    dreamFocus: "Requested answers",
    dreamGuidance: "Dreams can come true quickly and may be intentionally requested. Ask for a solution, a place, or a subtle-world journey before sleep.",
    sourceUrl: "https://om-journal.com/moonday/20"
  },
  {
    lunarDay: 21,
    symbol: "Herd of horses",
    emoji: "🐎",
    activeOrgans: ["Hips", "Thighs", "Liver", "Musculoskeletal system"],
    doToday: ["Physical movement and exercise", "Express creative power", "Make bold moves"],
    avoidToday: ["Stagnation", "Holding back ideas", "Passive waiting"],
    foodNote: "Energizing, protein-rich foods. Physical vitality is the theme; eat to fuel movement.",
    dreamFocus: "Creative power",
    dreamGuidance: "Dreams mainly show whether creative energy is present or blocked. Beyond that, they are usually less important and rarely predictive.",
    sourceUrl: "https://om-journal.com/moonday/21"
  },
  {
    lunarDay: 22,
    symbol: "Ganesha",
    emoji: "🐘",
    activeOrgans: ["Liver", "Large intestine", "Detox pathways"],
    doToday: ["Study and learning", "Ritual or ceremony beginnings", "Problem-solving"],
    avoidToday: ["Laziness", "Skipping established practices", "Procrastination"],
    foodNote: "Cleansing foods: vegetables, grains, legumes. A gentle detox is supported today.",
    dreamFocus: "Knowledge",
    dreamGuidance: "Dreams may be empty, or they may bring knowledge and problem-solving. Ask a question before bed and write down what arrives.",
    sourceUrl: "https://om-journal.com/moonday/22"
  },
  {
    lunarDay: 23,
    symbol: "Crocodile",
    emoji: "🐊",
    activeOrgans: ["Kidneys", "Urethra", "Water metabolism"],
    doToday: ["Adapt and reconsider", "Question assumptions", "Review plans with fresh eyes"],
    avoidToday: ["Taking things at face value", "Impulsive conclusions", "Risky ventures"],
    foodNote: "Hydrating, kidney-supportive foods. Reduce salt and processed foods today.",
    dreamFocus: "Contradiction",
    dreamGuidance: "Dreams can be deceptive or reversed today. Treat strong conclusions carefully; the opposite meaning may be closer to the truth.",
    sourceUrl: "https://om-journal.com/moonday/23"
  },
  {
    lunarDay: 24,
    symbol: "Shiva",
    emoji: "🙏",
    activeOrgans: ["Heart", "Reproductive center", "Vital energy (prana)"],
    doToday: ["Devotional or spiritual practice", "Deep creative work", "Transformation rituals"],
    avoidToday: ["Wasting vital energy", "Trivial distractions", "Ego-driven actions"],
    foodNote: "Sattvic, pure foods. Avoid all intoxicants. This is a sacred day for conscious nourishment.",
    dreamFocus: "Inner strength",
    dreamGuidance: "Dreams show creative force, sexual energy, and overall potential. Good dreams suggest strength; difficult ones reveal where energy leaks.",
    sourceUrl: "https://om-journal.com/moonday/24"
  },
  {
    lunarDay: 25,
    symbol: "Turtle",
    emoji: "🐢",
    activeOrgans: ["Nervous system", "Brain", "Sensory organs"],
    doToday: ["Slow, contemplative work", "Nature walks and quiet time", "Intuitive reading or divination"],
    avoidToday: ["Rushing", "Overstimulation", "Harsh or noisy environments"],
    foodNote: "Nourishing, nerve-calming foods. Warm soups, herbal teas, and gentle proteins are supportive.",
    dreamFocus: "Intuitive prophecy",
    dreamGuidance: "Dreams are traditionally treated as prophetic today, but intuition matters more than literal analysis. Cleanse and release nightmares in the morning.",
    sourceUrl: "https://om-journal.com/moonday/25"
  },
  {
    lunarDay: 26,
    symbol: "Swamp",
    emoji: "🌿",
    activeOrgans: ["Reproductive system", "Spinal fluid", "Immune system"],
    doToday: ["Honest self-reflection", "Clearing bad habits", "Grounding in nature"],
    avoidToday: ["Pride or self-deception", "Toxic environments", "Gossip and vanity"],
    foodNote: "Grounding, cleansing foods. Avoid fermented or intoxicating foods today.",
    dreamFocus: "Habits and pride",
    dreamGuidance: "Dreams can reveal habits, vices, pride, or self-esteem distortions. Colorful dreams may lift the mood and can come true.",
    sourceUrl: "https://om-journal.com/moonday/26"
  },
  {
    lunarDay: 27,
    symbol: "Trident",
    emoji: "🔱",
    activeOrgans: ["Shins", "Ankles", "Endocrine system"],
    doToday: ["Meditation and spiritual study", "Develop intuition", "Sober inner work"],
    avoidToday: ["Alcohol and intoxicants", "Excess or indulgence", "Shallow or distracting pursuits"],
    foodNote: "Spiced, warming meals. Cardamom, turmeric, clove, and pepper are favorable. Avoid potatoes, citrus, and alcohol.",
    dreamFocus: "True nature",
    dreamGuidance: "Dreams and omens can carry intuitive knowledge and reveal the true nature of people or situations. Interpret gently; mistakes are easy today.",
    sourceUrl: "https://om-journal.com/moonday/27"
  },
  {
    lunarDay: 28,
    symbol: "Lotus",
    emoji: "🪷",
    activeOrgans: ["Blood", "Cardiovascular system", "Heart center"],
    doToday: ["Love rituals and heart opening", "Service to others", "Expressing gratitude"],
    avoidToday: ["Bitterness or resentment", "Blocking emotional flow", "Isolation"],
    foodNote: "Heart-nourishing, gentle foods. Hydration is especially important. Eat with love and attention.",
    dreamFocus: "Obstacles and love",
    dreamGuidance: "Dreams may show obstacles, solutions, future hints, and the emotional field of love. Treat them as notices shaped by your choices.",
    sourceUrl: "https://om-journal.com/moonday/28"
  },
  {
    lunarDay: 29,
    symbol: "Hydra",
    emoji: "🌊",
    activeOrgans: ["Kidneys", "Urinary tract", "Detox pathways"],
    doToday: ["Clear and release old energy", "Finish outstanding business", "Prayer and forgiveness"],
    avoidToday: ["Starting new projects", "Conflict or confrontation", "Draining environments"],
    foodNote: "Very light, cleansing diet. Fasting or minimal eating supports the clearing energy of this day.",
    dreamFocus: "Difficult clearing",
    dreamGuidance: "Dreams may be complicated or frightening because subconscious negativity is clearing. Keep the day harmonious and seek support for heavy material.",
    sourceUrl: "https://om-journal.com/moonday/29"
  },
  {
    lunarDay: 30,
    symbol: "Golden Swan",
    emoji: "🕊️",
    activeOrgans: ["Spine", "Nervous system", "Whole body integration"],
    doToday: ["Gratitude and completion rituals", "Review and honor the lunar month", "Rest and integrate"],
    avoidToday: ["Starting new ventures", "Overexertion", "Careless or rushed actions"],
    foodNote: "Celebratory yet balanced meals. Honor the cycle with conscious, grateful eating.",
    dreamFocus: "Cycle completion",
    dreamGuidance: "Dreams may be bright and meaningful, especially if you have worked with the month consciously. Record what closes and what asks for attention next.",
    sourceUrl: "https://om-journal.com/moonday/30"
  }
];

export function getLunarSourceDay(lunarDay: number) {
  return lunarDaySource[(lunarDay - 1 + lunarDaySource.length) % lunarDaySource.length];
}
