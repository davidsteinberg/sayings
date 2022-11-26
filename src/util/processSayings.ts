import addMapConnection from "./addMapConnection";
import { POS, Template, Word, WordsByPOSByWordByPOS } from "./types";

type Term = {
  text: Word;
  tags: POS[];
  post: string;
};

type Sentence = {
  terms: Term[];
};

type NLP = (saying: string) => {
  json: () => Sentence[];
};

const processSayings = (p: { sayings: string[]; nlp: NLP }) => {
  const { sayings, nlp } = p;
  const templates: Template[] = [];
  const map: WordsByPOSByWordByPOS = {};

  // For each saying
  // build up a grammatical template
  // and map connections between its words
  for (const saying of sayings) {
    const sentences = nlp(saying).json();
    const template: Template = [];
    const previous = {
      pos: "",
      text: "",
    };

    // Process each sentence
    for (const sentence of sentences) {
      const { terms } = sentence;
      const { length } = terms;

      // For each word
      // add its POS to the template
      // and map from the previous POS/word
      for (let i = 0; i < length; i += 1) {
        const term = terms[i];
        const text = term.text.trim();

        // Skip blanks
        if (text.length > 0) {
          let pos = term.tags;
          let post = term.post.trim();

          if (i < length - 1) {
            // Some words end up split into multiple terms
            // Combine them for the template and map
            const nextTerm = terms[i + 1];
            if (nextTerm.text === "") {
              pos.push(...nextTerm.tags);
              post = nextTerm.post.trim();
              i += 1;
            }
          }

          const posString = pos.toString();

          // Add to template and map
          template.push(posString);
          addMapConnection({
            map,
            from: previous,
            to: { pos: posString, text },
          });

          // Advance previous pointers
          previous.pos = posString;
          previous.text = text;

          // Add post data if present
          if (post.length > 0) {
            // Add to template and map
            template.push(post);
            addMapConnection({
              map,
              from: previous,
              to: {
                pos: post,
                text: post,
              },
            });

            // Advance previous pointers
            previous.pos = post;
            previous.text = post;
          }
        }
      }
    }

    templates.push(template);
  }

  return { templates, map };
};

export type { Sentence };
export default processSayings;
