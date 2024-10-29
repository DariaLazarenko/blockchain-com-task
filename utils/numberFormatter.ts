export class NumberFormatter {
  /**
   * Formats a number to display significant decimal places:
   * - For whole numbers or numbers with leading non-zero decimals, returns formatted value with 2 decimal places.
   * - For numbers with leading zeros in decimals, returns formatted value with (n+2) decimal places, where n is the count of leading zeros.
   * @param num
   * @returns String representation of the formatted number
   */
  public static formatToSignificantDecimals(num: number): string {
    const numStr = num.toString();

    if (!numStr.includes(".")) {
      return num.toFixed(2);
    }

    const [, decimalPart] = numStr.split(".");

    const firstNonZeroIndex = decimalPart
      .split("")
      .findIndex((digit) => digit !== "0");

    if (firstNonZeroIndex === 0) {
      return num.toFixed(2);
    }

    if (firstNonZeroIndex === -1) {
      return num.toFixed(2);
    }

    const precision = firstNonZeroIndex + 2;
    return num.toFixed(precision);
  }
}
