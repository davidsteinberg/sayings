import addMapConnection from "./addMapConnection";
import { WordsByPOSByWordByPOS } from "./types";

describe("addMapConnection", () => {
  test("functionality", () => {
    const map: WordsByPOSByWordByPOS = {};

    addMapConnection({
      map,
      from: {
        pos: "from_pos",
        text: "from_text",
      },
      to: {
        pos: "to_pos",
        text: "to_text",
      },
    });

    expect(map).toStrictEqual({
      from_pos: {
        from_text: {
          to_pos: ["to_text"],
        },
      },
    });

    addMapConnection({
      map,
      from: {
        pos: "from_pos",
        text: "from_text",
      },
      to: {
        pos: "to_pos",
        text: "to_text_2",
      },
    });

    expect(map).toStrictEqual({
      from_pos: {
        from_text: {
          to_pos: ["to_text", "to_text_2"],
        },
      },
    });
  });
});
