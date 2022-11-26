import { WordsByPOSByWordByPOS } from "./types";

const addMapConnection = (p: {
  map: WordsByPOSByWordByPOS;
  from: { pos: string; text: string };
  to: { pos: string; text: string };
}) => {
  const { map, from, to } = p;
  const { pos: fromPOS, text: fromText } = from;
  const { pos: toPOS, text: toText } = to;

  // Ensures structures for each step in the connection
  if (map[fromPOS] === undefined) {
    map[fromPOS] = {};
  }

  if (map[fromPOS][fromText] === undefined) {
    map[fromPOS][fromText] = {};
  }

  if (map[fromPOS][fromText][toPOS] === undefined) {
    map[fromPOS][fromText][toPOS] = [];
  }

  map[fromPOS][fromText][toPOS].push(toText);
};

export default addMapConnection;
