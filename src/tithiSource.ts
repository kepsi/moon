export type TithiWisdomEntry = {
  tithiNumber: number;
  deity: string;
  group: string;
  nature: string;
  auspiciousFor: string[];
  avoid: string[];
  activeOrgans: string[];
  dietFavor: string[];
  dietAvoid: string[];
};

// Deity, class (Nanda/Bhadra/Jaya/Rikta/Purna) and traditional dos/don'ts for each of the
// 15 tithi types, drawn from standard Vedic Panchang references (astrojyoti, clickastro,
// shrifreedom). The 15th tithi splits into Purnima (Shukla) and Amavasya (Krishna), which
// carry different guidance — see purnimaWisdom/amavasyaWisdom below.
export const tithiWisdom: TithiWisdomEntry[] = [
  {
    tithiNumber: 1,
    deity: "Brahma",
    group: "Nanda (Fire)",
    nature: "A joyful, blessing-rich tithi, propitious for beginnings and religious ritual.",
    auspiciousFor: ["weddings", "journeys", "house construction", "housewarming", "real estate deals"],
    avoid: ["heavy austerities", "fasting rituals"],
    activeOrgans: ["Crown", "Skull", "Pineal gland"],
    dietFavor: ["Warm, light meals"],
    dietAvoid: ["Heavy, oily food"]
  },
  {
    tithiNumber: 2,
    deity: "Vidhata",
    group: "Bhadra (Earth)",
    nature: "An earth-grounded tithi, ideal for laying foundations and starting new ventures.",
    auspiciousFor: ["laying foundations", "starting a job", "marriage", "wearing new jewellery", "music education"],
    avoid: ["oiling the body", "rushed, half-planned starts"],
    activeOrgans: ["Face", "Nose", "Skin"],
    dietFavor: ["Grounding, wholesome food"],
    dietAvoid: ["Skipping meals"]
  },
  {
    tithiNumber: 3,
    deity: "Vishnu",
    group: "Jaya (Akasha)",
    nature: "A victorious tithi ruled by ether — it binds people and efforts together toward success.",
    auspiciousFor: ["commercial activity", "marriage", "music", "sculpting and construction", "cutting hair and nails"],
    avoid: ["isolating yourself", "abandoning partnerships"],
    activeOrgans: ["Throat", "Ears", "Vocal cords"],
    dietFavor: ["Light, easily digested food"],
    dietAvoid: ["Overeating"]
  },
  {
    tithiNumber: 4,
    deity: "Yama",
    group: "Rikta (Water)",
    nature: "A \"Rikta\" (empty) tithi ruled by the lord of endings — not favored for auspicious beginnings.",
    auspiciousFor: ["fire-related work", "removing obstacles", "deep cleaning"],
    avoid: ["weddings", "new ventures", "major agreements"],
    activeOrgans: ["Lymphatic system", "Bladder"],
    dietFavor: ["Hydrating, simple food"],
    dietAvoid: ["Fried food"]
  },
  {
    tithiNumber: 5,
    deity: "Chandra (Moon)",
    group: "Purna (Vayu)",
    nature: "A \"Purna\" (full) tithi ruled by the Moon — favorable for healing and transformation of the body.",
    auspiciousFor: ["medicine and healing", "surgery", "marriage", "business"],
    avoid: ["lending money", "fasting"],
    activeOrgans: ["Lungs", "Chest", "Breath"],
    dietFavor: ["Nourishing, complete meals"],
    dietAvoid: ["Fasting"]
  },
  {
    tithiNumber: 6,
    deity: "Agni / Kartikeya",
    group: "Nanda (Fire)",
    nature: "A fire-ruled Nanda tithi that blesses new structures and prosperity.",
    auspiciousFor: ["investiture and inauguration", "construction", "moving into a new home", "wearing jewellery"],
    avoid: ["marriage", "oil massage", "woodwork"],
    activeOrgans: ["Digestive fire", "Stomach", "Liver"],
    dietFavor: ["Fresh, energizing food"],
    dietAvoid: ["Cold, heavy leftovers"]
  },
  {
    tithiNumber: 7,
    deity: "Indra",
    group: "Bhadra (Earth)",
    nature: "A strong Bhadra tithi, ideal for firm new commitments.",
    auspiciousFor: ["weddings", "buying a vehicle", "housewarming", "travel", "exercise"],
    avoid: ["indecision", "postponing commitments"],
    activeOrgans: ["Bones", "Joints", "Teeth"],
    dietFavor: ["Root vegetables", "Whole grains"],
    dietAvoid: ["Rushed meals"]
  },
  {
    tithiNumber: 8,
    deity: "The Vasus",
    group: "Jaya (Akasha)",
    nature: "A victorious tithi of the eight Vasus — favors skill, defense, and craft.",
    auspiciousFor: ["architecture", "dance and arts", "debate and writing", "sport", "defense-related work"],
    avoid: ["careless commitments"],
    activeOrgans: ["Ears", "Sinuses", "Inner space (Akasha)"],
    dietFavor: ["Soups, broths"],
    dietAvoid: ["Heavy, dense meals"]
  },
  {
    tithiNumber: 9,
    deity: "Naga (serpent)",
    group: "Rikta (Water)",
    nature: "Another \"Rikta\" tithi — its restless, serpentine energy favors contest over new ventures.",
    auspiciousFor: ["competitions and debate", "exercise", "confronting obstacles"],
    avoid: ["starting a business", "auspicious ceremonies"],
    activeOrgans: ["Kidneys", "Blood", "Circulation"],
    dietFavor: ["Cleansing foods"],
    dietAvoid: ["Fermented, heavy food"]
  },
  {
    tithiNumber: 10,
    deity: "Dharma (Aryaman)",
    group: "Purna (Vayu)",
    nature: "A \"Purna\" tithi of righteous completion — excellent for finishing what was started.",
    auspiciousFor: ["government or official work", "marriage", "purchases", "housewarming", "religious functions"],
    avoid: ["leaving tasks half-done"],
    activeOrgans: ["Nervous system", "Diaphragm", "Breath"],
    dietFavor: ["Balanced, complete meals"],
    dietAvoid: ["Erratic eating"]
  },
  {
    tithiNumber: 11,
    deity: "Rudra",
    group: "Nanda (Fire)",
    nature: "Widely held as the most auspicious tithi — a fire-ruled day of fasting and devotion.",
    auspiciousFor: ["fasting", "worship and pilgrimage", "spiritual practice", "festivities"],
    avoid: ["heavy grains", "weddings"],
    activeOrgans: ["Solar plexus", "Adrenal glands"],
    dietFavor: ["Fasting", "Fruit", "Water"],
    dietAvoid: ["Grains", "Beans"]
  },
  {
    tithiNumber: 12,
    deity: "Aditya (Surya)",
    group: "Bhadra (Earth)",
    nature: "A solar Bhadra tithi, good for beginning sacred and official duties.",
    auspiciousFor: ["religious functions", "fulfilling vows", "sacred fire ceremonies", "buying a vehicle"],
    avoid: ["weddings", "oil baths"],
    activeOrgans: ["Spine", "Bones", "Eyes"],
    dietFavor: ["Simple, seasonal food"],
    dietAvoid: ["Excess indulgence"]
  },
  {
    tithiNumber: 13,
    deity: "Manmatha (Kama)",
    group: "Jaya (Akasha)",
    nature: "A victorious tithi ruled by desire itself — favors new business and creative pursuits.",
    auspiciousFor: ["starting a business", "architecture", "music education", "wearing new garments"],
    avoid: ["travel", "housewarming", "sacred thread ceremonies"],
    activeOrgans: ["Heart", "Throat", "Senses"],
    dietFavor: ["Fresh, aromatic food"],
    dietAvoid: ["Overindulgence"]
  },
  {
    tithiNumber: 14,
    deity: "Kali",
    group: "Rikta (Water)",
    nature: "The last \"Rikta\" tithi, ruled by Kali — a day for quiet routine, not new starts.",
    auspiciousFor: ["routine tasks", "reading scripture"],
    avoid: ["travel", "haircuts", "commercial activity"],
    activeOrgans: ["Reproductive organs", "Pelvis", "Lymph"],
    dietFavor: ["Light, plain meals"],
    dietAvoid: ["Rich, fermented food"]
  },
  {
    tithiNumber: 15,
    deity: "Vishvadevas",
    group: "Purna (Vayu)",
    nature: "A \"Purna\" tithi of completion at the cycle's hinge — its character depends on which Paksha it falls in.",
    auspiciousFor: ["major undertakings", "spiritual ritual"],
    avoid: ["loose ends"],
    activeOrgans: ["Whole body", "Nervous system"],
    dietFavor: ["Complete, satisfying meals"],
    dietAvoid: ["Unfinished meals"]
  }
];

// Overrides for the 15th tithi, which is Purnima (full moon) in Shukla Paksha and Amavasya
// (new moon) in Krishna Paksha — traditionally treated very differently.
export const purnimaWisdom: Pick<TithiWisdomEntry, "nature" | "auspiciousFor" | "avoid" | "dietFavor" | "dietAvoid"> = {
  nature: "Purnima: a \"Purna\" tithi of completion at the moon's fullest — auspicious for finishing any major undertaking.",
  auspiciousFor: ["major commercial deals", "construction", "new positions", "spiritual ritual", "travel"],
  avoid: ["loose ends"],
  dietFavor: ["Light, sattvic food"],
  dietAvoid: ["Non-vegetarian food", "Alcohol"]
};

export const amavasyaWisdom: Pick<TithiWisdomEntry, "nature" | "auspiciousFor" | "avoid" | "dietFavor" | "dietAvoid"> = {
  nature: "Amavasya: a \"Purna\" tithi at the moon's darkest — reserved for ancestral rites and inward worship, not worldly starts.",
  auspiciousFor: ["religious worship", "charity", "rites for ancestors"],
  avoid: ["most new ventures", "travel", "important decisions"],
  dietFavor: ["Simple, fasting-friendly food"],
  dietAvoid: ["Non-vegetarian food", "Alcohol"]
};

export function getTithiWisdom(tithiNumber: number, paksha: "Shukla" | "Krishna"): TithiWisdomEntry {
  const base = tithiWisdom[tithiNumber - 1];

  if (tithiNumber === 15) {
    const variant = paksha === "Shukla" ? purnimaWisdom : amavasyaWisdom;
    return { ...base, ...variant };
  }

  return base;
}
