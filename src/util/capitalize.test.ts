import capitalize from "./capitalize";

describe("capitalize", () => {
  test("upper cases the first letter only", () => {
    const input = "foo";
    const output = capitalize(input);

    expect(output).toBe("Foo");
  });

  test("handles single character strings", () => {
    const input = "a";
    const output = capitalize(input);

    expect(output).toBe("A");
  });

  test("throws for empty strings", () => {
    const input = "";
    const func = () => capitalize(input);

    expect(func).toThrow();
  });
});
