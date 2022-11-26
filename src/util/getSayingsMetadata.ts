import nlp from "compromise";
import processSayings from "./processSayings";

const getSayingsMetadata = async () => {
  // Get sayings from text file
  const dataURL = "data/sayings.txt";
  const sayings = await fetch(dataURL)
    .then((response) => response.text())
    .then((text) => text.trim().split("\n"));

  // Get templates and map from sayings
  const { templates, map } = processSayings({
    sayings,
    nlp,
  });

  return { sayings, templates, map };
};

export default getSayingsMetadata;
