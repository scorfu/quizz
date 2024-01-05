export const replaceGiberishCharacters = (giberishData: string) => {
  if (giberishData.includes("&quot;")) {
    giberishData = giberishData.replaceAll(/&quot;/g, "'");
  }
  if (giberishData.includes("&rsquo;")) {
    giberishData = giberishData.replaceAll(/&rsquo;/g, "'");
  }
  if (giberishData.includes("&#039;s")) {
    giberishData = giberishData.replaceAll(/&#039;s/g, "'s");
  }
  if (giberishData.includes("&#039;")) {
    giberishData = giberishData.replaceAll(/&#039;/g, "'");
  }
  if (giberishData.includes("&amp;")) {
    giberishData = giberishData.replaceAll(/&amp;/g, "&");
  }
  if (giberishData.includes("&uuml;")) {
    giberishData = giberishData.replaceAll(/&uuml;/g, "ü");
  }
  if (giberishData.includes("&ouml;")) {
    giberishData = giberishData.replaceAll(/&ouml;/g, "ö");
  }
  if (giberishData.includes("&iacute;")) {
    giberishData = giberishData.replaceAll(/&iacute;/g, "í");
  }
  if (giberishData.includes("&eacute;")) {
    giberishData = giberishData.replaceAll(/&eacute;/g, "é");
  }
  if (giberishData.includes("&iacute;")) {
    giberishData = giberishData.replaceAll(/&iacute;/g, "í");
  }
  if (giberishData.includes("&ocirc;")) {
    giberishData = giberishData.replaceAll(/&ocirc;/g, "ô")
  }
  return giberishData;
};

export const shuffleAnswerOptionsArray = (array: string[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const findCommonElements = (arr1: string[], arr2: string[]) => {
  return arr1.filter((element) => arr2.includes(element));
};

export const compareAnswer = (
  arr1: string[],
  arr2: string[],
  index: number
): boolean => {
  // console.log(arr1[index] == arr2[index]);
  // console.log("element din primul array", arr1[index]);
  // console.log("element din al doilea array", arr2[index]);
  return arr1[index] == arr2[index];
};
