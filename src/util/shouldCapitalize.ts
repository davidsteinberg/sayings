const wordsToCapitalize = [
  "god",
  "i",
  "jack",
  "jill",
  "lucifer",
  "mercury",
  "mohammed",
  "romans",
  "rome",
  "venus",
];

const shouldCapitalize = (word: string) => {
  return wordsToCapitalize.includes(word.split("'")[0]);
};

export default shouldCapitalize;
