import isStopword from "./stopWords";

function termFrequencyMap(quote) {
  const words = quote
    .toLowerCase()
    .replace(/[,.'():;’?]/g, "")
    .split(" ");

  let obj = {};

  words.forEach((word) => {
    if (!isStopword(word)) {
      if (obj.hasOwnProperty(word)) obj[word] += 1;
      else obj[word] = 1;
    }
  });
  const result = {};
  result["tfMap"] = obj;
  result["wordCount"] = words.length;

  return result;
}

function vectorMagnitude(vector) {
  let magnitude = 0;
  for (let i = 0; i < vector.length; i++) {
    magnitude += vector[i] * vector[i];
  }
  return Math.sqrt(magnitude);
}

function addToVocabulary(tfMap, vocabulary) {
  for (let key in tfMap) {
    if (vocabulary.hasOwnProperty(key)) vocabulary[key] += 1;
    else vocabulary[key] = 1;
  }
}

//function to calculate IDF :
function inverseDocumentFrequency(quotesArray) {
  const idf = {};
  const vocabulary = {};
  //Building the vocabulary to be used for calculating IDF of each word in Vocabulary.
  quotesArray.forEach((quote) => {
    const { tfMap } = termFrequencyMap(quote.en);
    addToVocabulary(tfMap, vocabulary);
  });

  const totalQuotes = quotesArray.length;

  //Calculating IDF for each word in vocabulary from the remaining Quotes.
  for (let key in vocabulary) {
    idf[key] = Math.log(totalQuotes) - Math.log(vocabulary[key]);
  }
  return idf;
}

function remainingQuotes(quotesArray, previousQuotes) {
  //Quotes not displayed till now
  const remainingQuotes = quotesArray.filter((quote) => {
    return !previousQuotes.includes(quote._id);
  });
  return remainingQuotes;
}

//function to calculate the similarity between Quotes represented in form of Vectors
function cosineSimilarity(quoteVectA, quoteVectB) {
  let dotProduct = 0;
  const vectorSize = quoteVectA.length;

  for (let i = 0; i < vectorSize; i++) {
    dotProduct += quoteVectA[i] * quoteVectB[i];
  }

  const modA = vectorMagnitude(quoteVectA);
  const modB = vectorMagnitude(quoteVectB);
  const similarity = dotProduct / (modA * modB);

  return similarity;
}

//function to get TF*IDF vector for a quote
function tfMapToVector(idf, quote) {
  const { tfMap, wordCount } = termFrequencyMap(quote);
  console.log(wordCount);

  const vector = [];

  for (let key in idf) {
    if (tfMap.hasOwnProperty(key)) {
      let val = tfMap[key] / wordCount;
      val *= idf[key];
      vector.push(val);
    } else {
      vector.push(0);
    }
  }

  return vector;
}

//function to get quote similar to current quote
function getSimilarQuote(currentQuote, allQuotes, previousQuotes) {
  const quotesLeft = remainingQuotes(allQuotes, previousQuotes);
  const idf = inverseDocumentFrequency(quotesLeft);
  const currentQuoteVector = tfMapToVector(idf, currentQuote.en);
  console.log("Current quote Vector : ", currentQuoteVector);

  let mostSimilarQuote = {};
  let mostSimilarQuoteSimilarity = 0;

  for (let i = 0; i < quotesLeft.length; i++) {
    let quote = quotesLeft[i];
    const quoteVector = tfMapToVector(idf, quote.en);
    let currentSimilarity = cosineSimilarity(currentQuoteVector, quoteVector);

    if (currentSimilarity > mostSimilarQuoteSimilarity) {
      mostSimilarQuote = quote;
      mostSimilarQuoteSimilarity = currentSimilarity;
    }
  }

  return mostSimilarQuote;
}

//function to get quote different then current quote
function getDifferentQuote(currentQuote, allQuotes, previousQuotes) {
  const quotesLeft = remainingQuotes(allQuotes, previousQuotes);
  const idf = inverseDocumentFrequency(quotesLeft);
  const currentQuoteVector = tfMapToVector(idf, currentQuote.en);

  let mostDifferentQuote = {};
  let mostDifferentQuoteSimilarity = 1;

  for (let i = 0; i < quotesLeft.length; i++) {
    let quote = quotesLeft[i];
    const quoteVector = tfMapToVector(idf, quote.en);
    let currentSimilarity = cosineSimilarity(currentQuoteVector, quoteVector);

    if (currentSimilarity < mostDifferentQuoteSimilarity) {
      mostDifferentQuote = quote;
      mostDifferentQuoteSimilarity = currentSimilarity;
    }
  }

  return mostDifferentQuote;
}

export { getSimilarQuote, getDifferentQuote };
