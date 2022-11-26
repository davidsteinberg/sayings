import shouldCapitalize from "./shouldCapitalize";

describe("shouldCapitalize", () => {
  test("returns true for a word in its list", () => {
    const word = "jack";
    const capitalize = shouldCapitalize(word);

    expect(capitalize).toBe(true);
  });

  test("returns true for a word that has a quote prefixed by a word in its list", () => {
    const word = "i'll";
    const capitalize = shouldCapitalize(word);

    expect(capitalize).toBe(true);
  });

  test("returns false for a word not in its list", () => {
    const word = "dog";
    const capitalize = shouldCapitalize(word);

    expect(capitalize).toBe(false);
  });
});
