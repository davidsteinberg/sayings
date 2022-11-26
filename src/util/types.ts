// POS -> Part of speech
type POS = string;
type Word = string;
type Template = POS[];

type WordsByPOS = Record<POS, Word[]>;
type WordsByPOSByWord = Record<Word, WordsByPOS>;
type WordsByPOSByWordByPOS = Record<POS, WordsByPOSByWord>;

export type { POS, Template, Word, WordsByPOSByWordByPOS };
