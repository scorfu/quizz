export const replaceGiberishCharacters = (giberishData: string) => {
  if (giberishData.includes("&quot;")) {
    giberishData = giberishData.replaceAll(/&quot;/g, "'");
  }
  if (giberishData.includes("&#039;s")) {
    giberishData = giberishData.replaceAll(/&#039;s/g, "'");
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
  console.log(arr1[index] == arr2[index]);
  console.log("element din primul array", arr1[index]);
  console.log("element din al doilea array", arr2[index]);
  return arr1[index] == arr2[index];
};
