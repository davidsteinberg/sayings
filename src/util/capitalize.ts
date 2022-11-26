const capitalize = (word: string) => {
  if (word.length === 0) {
    throw Error("Attempted to capitalize empty string");
  }

  return word[0].toUpperCase() + word.slice(1);
};

export default capitalize;
