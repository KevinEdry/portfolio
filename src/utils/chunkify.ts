export function chunkify<T>(array: T[], numSplits: number): T[][] {
  if (numSplits < 1) {
    throw new Error("Number of splits must be at least 1");
  }

  const totalElements = array.length;
  const baseSize = Math.floor(totalElements / numSplits);
  const remainder = totalElements % numSplits;
  const result: T[][] = [];

  let startIndex = 0;
  for (let i = 0; i < numSplits; i++) {
    const splitSize = i < remainder ? baseSize + 1 : baseSize;
    const end = startIndex + splitSize;

    result.push(array.slice(startIndex, end));
    startIndex = end;
  }

  return result;
}
