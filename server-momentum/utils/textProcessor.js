import natural from "natural";

// TF-IDF Calculation
export const calculateTFIDF = (resumeText, jobDescription) => {
  const tfidf = new natural.TfIdf();

  tfidf.addDocument(resumeText);
  tfidf.addDocument(jobDescription);

  let tfidfScore = 0;
  tfidf.listTerms(1).forEach((term) => {
    tfidfScore += term.tfidf;
  });

  return tfidfScore;
};

// Keyword Matching
export const calculateKeywordMatch = (resumeText, jobDescription) => {
  const resumeTokens = resumeText.toLowerCase().split(/\W+/);
  const jobTokens = jobDescription.toLowerCase().split(/\W+/);

  const matchedKeywords = jobTokens.filter((word) =>
    resumeTokens.includes(word)
  );

  return (matchedKeywords.length / jobTokens.length) * 100;
};

// Combined Scoring
export const scoreResume = (resumeText, jobDescription) => {
  const tfidfScore = calculateTFIDF(resumeText, jobDescription);
  const keywordMatchScore = calculateKeywordMatch(resumeText, jobDescription);

  return {
    tfidfScore,
    keywordMatchScore,
    overallScore: tfidfScore * 0.5 + keywordMatchScore * 0.5,
  };
};
