export default function generateRangeArray(numbers: number[]): number[] {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return [];
  }

  const minValue = Math.min(...numbers);
  const maxValue = Math.max(...numbers);

  const rangeArray = [];
  for (let i = minValue; i <= maxValue; i++) {
    rangeArray.push(i);
  }

  return rangeArray;
}
