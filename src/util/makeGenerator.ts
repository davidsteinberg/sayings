import capitalize from "./capitalize";
import isPunctuation from "./isPunctuation";
import shouldCapitalize from "./shouldCapitalize";
import { RandomInt } from "./randomInt";
import { Template, WordsByPOSByWordByPOS } from "./types";

/**
 * @throws When max retry attempts have been made
 */
const makeGenerator = function* (p: {
  metadata: {
    sayings: string[];
    templates: Template[];
    map: WordsByPOSByWordByPOS;
  };
  randomInt: RandomInt;
}) {
  const { metadata, randomInt } = p;
  const { sayings, templates, map } = metadata;
  const unused = {
    templates: [...templates],
  };

  const generatedSayings: string[] = [];
  const maxAttempts = 500;
  let attempts = 0;

  generate: while (true) {
    attempts += 1;
    if (attempts === maxAttempts) {
      const { length } = generatedSayings;
      // Try again if there are enough generated sayings to repeat
      if (length > 100) {
        console.log(`Clearing ${length} stored generating sayings`);
        generatedSayings.length = 0;
        attempts = 0;
        continue;
      }

      throw Error("Reached max saying generator attempts");
    }

    // Fill unused templates again when they are empty
    if (unused.templates.length === 0) {
      unused.templates.push(...templates);
    }

    // Pick a random template (and remove it from unused templates)
    const templateIndex = randomInt(0, unused.templates.length);
    const [template] = unused.templates.splice(templateIndex, 1);

    // Randomly fill each POS of the template
    // by walking the map from POS to word to POS to words
    const chosenWords: string[] = [];
    const previous = {
      pos: "",
      word: "",
    };

    for (const pos of template) {
      // Ensure structures are in place to get words
      // If not, move on to the next template
      const wordsByPOSByWord = map[previous.pos];
      if (wordsByPOSByWord === undefined) {
        continue generate;
      }

      const wordsByPOS = wordsByPOSByWord[previous.word];
      if (wordsByPOS === undefined) {
        continue generate;
      }

      const words = wordsByPOS[pos];
      if (words === undefined) {
        continue generate;
      }

      // Pick a random word
      const wordIndex = randomInt(0, words.length);
      const word = words[wordIndex];

      chosenWords.push(word);

      // Advance previous pointers
      previous.pos = pos;
      previous.word = word;
    }

    // Build saying with capitalization, space, etc.
    let saying = "";
    let startingSentence = true;

    for (const [index, word] of Object.entries(chosenWords)) {
      const num = Number(index);
      if (num > 0 && !isPunctuation(word)) {
        saying += " ";
      }

      if (startingSentence || shouldCapitalize(word)) {
        saying += capitalize(word);
      } else {
        saying += word;
      }

      startingSentence = word === ".";
    }

    // Don't produce actual sayings
    if (sayings.includes(saying.toLowerCase())) {
      continue;
    }

    // Don't produce previous'y generated sayings
    if (generatedSayings.includes(saying)) {
      console.log("previously generated", saying);
      continue;
    }

    generatedSayings.push(saying);

    // Reset attempts, since we generated a saying
    attempts = 0;
    yield saying;
  }
};

export default makeGenerator;
