const computeMinimumOperations = inputString => {
  let vowelCount = 0;
  let consonantCount = 0;

  const vowelChars = ['a', 'e', 'i', 'o', 'u'];

  for (let i = 0; i < inputString.length; i++) {
    if (vowelChars.includes(inputString[i])) {
      vowelCount++;
    } else {
      consonantCount++;
    }
  }

  const targetVowelCount = Math.abs(inputString.length / 2 - vowelCount);

  let vowelDistances = [...inputString].map(char => {
    let charDistance = Infinity;
    [...vowelChars].forEach(vowelChar => {
      let distance = Math.abs(char.charCodeAt(0) - vowelChar.charCodeAt(0));
      if (distance < charDistance) {
        charDistance = distance;
      }
    });
    return charDistance;
  });

  vowelDistances = vowelDistances.filter(element => element !== 0);

  vowelDistances.sort((a, b) => a - b);

  let totalOperations = 0;

  for (let index = 0; index < vowelDistances.length; index++) {
    if (index < targetVowelCount) {
      totalOperations += vowelDistances[index];
    }
  }

  if (vowelDistances.length < 2) {
    return targetVowelCount;
  }

  return totalOperations;
};
// t
