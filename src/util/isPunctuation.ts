const regex = /^[.,]$/;
const isPunctuation = (text: string) => {
  return regex.test(text);
};

export default isPunctuation;
