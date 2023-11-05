/**
 * @param 数値を単純化する
 * @example 10000 => 1万, 11000 => 1.1万, 100000000 => 1億
 */
export const simplify = (number: number): string => {
  if (number / 1_0000_0000 > 0.1) {
    return `${Math.round(number / 10000 / 1000) / 10}億`;
  }
  if (number / 1_0000 > 0.1) {
    return `${Math.round(number / 1000) / 10}万`;
  }
  return number.toLocaleString();
};
