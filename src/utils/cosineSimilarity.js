import isStopword from "./stopWords";

const termFrequencyMap = (quote) => {
  const words = quote
    .toLowerCase()
    .replace(/[,.'():;’?]/g, "")
    .split(" ");

  const tfMap = {};

  words.forEach((word) => {
    if (!isStopword(word)) {
      if (tfMap.hasOwnProperty(word)) tfMap[word] += 1;
      else tfMap[word] = 1;
    }
  });

  return tfMap;
};

const vectorMagnitude = (vector) => {
  let magnitude = 0;
  for (let i = 0; i < vector.length; i++) {
    magnitude += vector[i] * vector[i];
  }
  return Math.sqrt(magnitude);
};

const addToVocabulary = (tfMap, vocabulary) => {
  for (let key in tfMap) {
    if (vocabulary.hasOwnProperty(key)) vocabulary[key] += 1;
    else vocabulary[key] = 1;
  }
};

const inverseDocumentFrequency = (quotesArray, vocabulary, previousQuotes) => {
  const idf = {};

  const remainingQuotes = quotesArray.filter((quote) => {
    return previousQuotes.includes(quote._id);
  });

  remainingQuotes.forEach((quote) => {
    const tfMap = termFrequencyMap(quote.en);
    addToVocabulary(tfMap, vocabulary);
  });

  const totalQuotes = remainingQuotes.length;

  for (let key in vocabulary) {
    idf[key] = Math.log(totalQuotes) - Math.log(vocabulary[key]);
  }
  return idf;
};

const tfMapToVector = () => {};

export { termFrequencyMap, addToVocabulary, inverseDocumentFrequency };
