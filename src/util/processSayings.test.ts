import processSayings, { Sentence } from "./processSayings";

const makeNLP = (sentences: Sentence[]) => {
  return () => ({
    json() {
      return sentences;
    },
  });
};

describe("processSayings", () => {
  test("functionality", () => {
    const sayings = [""];
    const nlp = makeNLP([
      {
        terms: [
          { text: "term_text", tags: ["term_tag", "term_tag1"], post: "" },
        ],
      },
    ]);

    const { templates, map } = processSayings({
      sayings,
      nlp,
    });

    expect(templates).toStrictEqual([["term_tag,term_tag1"]]);

    expect(map).toStrictEqual({
      "": {
        "": {
          "term_tag,term_tag1": ["term_text"],
        },
      },
    });
  });

  test("trims text", () => {
    const sayings = [""];
    const nlp = makeNLP([
      {
        terms: [{ text: " term_text  ", tags: ["term_tag"], post: "" }],
      },
    ]);

    const { templates, map } = processSayings({
      sayings,
      nlp,
    });

    expect(templates).toStrictEqual([["term_tag"]]);

    expect(map).toStrictEqual({
      "": {
        "": {
          term_tag: ["term_text"],
        },
      },
    });
  });

  test("skips blank text", () => {
    const sayings = [""];
    const nlp = makeNLP([
      {
        terms: [{ text: "", tags: ["term_tag"], post: "" }],
      },
    ]);

    const { templates, map } = processSayings({
      sayings,
      nlp,
    });

    expect(templates).toStrictEqual([[]]);

    expect(map).toStrictEqual({});
  });

  test("combines split words", () => {
    const sayings = [""];
    const nlp = makeNLP([
      {
        terms: [
          { text: "term_text", tags: ["term_tag"], post: "" },
          { text: "", tags: ["term1_tag"], post: "" },
          { text: "term2_text", tags: ["term2_tag"], post: "" },
        ],
      },
    ]);

    const { templates, map } = processSayings({
      sayings,
      nlp,
    });

    expect(templates).toStrictEqual([["term_tag,term1_tag", "term2_tag"]]);

    expect(map).toStrictEqual({
      "": {
        "": {
          "term_tag,term1_tag": ["term_text"],
        },
      },
      "term_tag,term1_tag": {
        term_text: {
          term2_tag: ["term2_text"],
        },
      },
    });
  });

  test("adds post data", () => {
    const sayings = [""];
    const nlp = makeNLP([
      {
        terms: [{ text: "term_text", tags: ["term_tag"], post: "term_post" }],
      },
    ]);

    const { templates, map } = processSayings({
      sayings,
      nlp,
    });

    expect(templates).toStrictEqual([["term_tag", "term_post"]]);

    expect(map).toStrictEqual({
      "": {
        "": {
          term_tag: ["term_text"],
        },
      },
      term_tag: {
        term_text: {
          term_post: ["term_post"],
        },
      },
    });
  });
});
