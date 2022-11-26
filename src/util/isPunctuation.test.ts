import isPunctuation from "./isPunctuation";

describe("isPunctuation", () => {
  test("returns true for commas", () => {
    const char = ",";
    const punctuation = isPunctuation(char);

    expect(punctuation).toBe(true);
  });

  test("returns true for periods", () => {
    const char = ".";
    const punctuation = isPunctuation(char);

    expect(punctuation).toBe(true);
  });

  test("returns false for letters", () => {
    const char = "a";
    const punctuation = isPunctuation(char);

    expect(punctuation).toBe(false);
  });
});
