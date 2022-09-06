// returns most common occurrence of a string in an array or N/A if none found
const findMostOccurring = (stringArr: string[]) => {
  if (!stringArr.length) {
    return 'N/A';
  }
  const occurences: { [key: string]: number } = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const string of stringArr) {
    if (occurences[string]) {
      occurences[string] += 1;
    } else {
      occurences[string] = 1;
    }
  }
  const mostOccurences = Object.values(occurences).sort(
    (a, b) => b - a,
  )[0];
  const mostOccurringString = Object.keys(occurences).find(
    (string) => occurences[string] === mostOccurences,
  );
  return mostOccurringString;
};

export default findMostOccurring;

// alternative approach
/*
    const hashtags = this.state.tweetsData?.data
      ?.map((tweet) => tweet.entities?.hashtags?.map((ht) => ht.tag))
      .flat()
      .filter((exists) => exists);

    const occurences = hashtags?.reduce(
      (acc, cur) => acc.set(cur, (acc.get(cur) || 0) + 1),
      new Map(),
    );
*/
