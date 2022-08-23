const AMINO_ACID_LOOKUP = {
  Histidine: 1221,
  Leucine: 1213,
  Isoleucine: 1212,
  Lysine: 1214,
  Methionine: 1215,
  Phenylalanine: 1217,
  Threonine: 1211,
  Tryptophan: 1210,
  Valine: 1219,
  Sodium: 1693761,
};

export const ESSENTIAL_AMINO_ACID_IDS = Object.values(AMINO_ACID_LOOKUP);
export const ESSENTIAL_AMINO_ACID_NAMES = Object.keys(AMINO_ACID_LOOKUP);
