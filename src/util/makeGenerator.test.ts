import makeGenerator from "./makeGenerator";

describe("makeGenerator", () => {
  test("functionality", () => {
    const randomInt = () => 0;
    const sayings = [""];
    const templates = [["pos", "pos2", "pos3"]];

    const map = {
      "": {
        "": {
          pos: ["word"],
        },
      },
      pos: {
        word: {
          pos2: ["word2"],
        },
      },
      pos2: {
        word2: {
          pos3: ["word3"],
        },
      },
    };

    const metadata = {
      sayings,
      templates,
      map,
    };

    const generator = makeGenerator({
      metadata,
      randomInt,
    });

    const text = generator.next().value;

    expect(text).toBe("Word word2 word3");
  });

  test("throws when missing wordsByPOSByWord", () => {
    const randomInt = () => 0;
    const sayings = [""];
    const templates = [["pos", "pos2"]];

    const map = {
      "": {
        "": {
          pos: ["word"],
        },
      },
    };

    const metadata = {
      sayings,
      templates,
      map,
    };

    const generator = makeGenerator({
      metadata,
      randomInt,
    });

    const func = () => generator.next().value;

    expect(func).toThrow();
  });

  test("throws when missing wordsByPOS", () => {
    const randomInt = () => 0;
    const sayings = [""];
    const templates = [["pos", "pos2"]];

    const map = {
      "": {
        "": {
          pos: ["word"],
        },
      },
      pos: {},
    };

    const metadata = {
      sayings,
      templates,
      map,
    };

    const generator = makeGenerator({
      metadata,
      randomInt,
    });

    const func = () => generator.next().value;

    expect(func).toThrow();
  });

  test("throws when missing words", () => {
    const randomInt = () => 0;
    const sayings = [""];
    const templates = [["pos", "pos2"]];

    const map = {
      "": {
        "": {
          pos: ["word"],
        },
      },
      pos: {
        word: {},
      },
    };

    const metadata = {
      sayings,
      templates,
      map,
    };

    const generator = makeGenerator({
      metadata,
      randomInt,
    });

    const func = () => generator.next().value;

    expect(func).toThrow();
  });
});
