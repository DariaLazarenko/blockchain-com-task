import { NumberFormatter } from "@/utils/numberFormatter";

describe("NumberFormatter", () => {
  describe("formatToSignificantDecimals", () => {
    test("formats whole numbers to 2 decimal places", () => {
      expect(NumberFormatter.formatToSignificantDecimals(123)).toBe("123.00");
      expect(NumberFormatter.formatToSignificantDecimals(0)).toBe("0.00");
      expect(NumberFormatter.formatToSignificantDecimals(1000)).toBe("1000.00");
    });

    test("formats numbers with all zero decimals to 2 decimal places", () => {
      expect(NumberFormatter.formatToSignificantDecimals(123.0)).toBe("123.00");
      expect(NumberFormatter.formatToSignificantDecimals(0.0)).toBe("0.00");
    });

    test("formats numbers with immediate non-zero decimals to 2 decimal places", () => {
      expect(NumberFormatter.formatToSignificantDecimals(123.456)).toBe(
        "123.46",
      );
      expect(NumberFormatter.formatToSignificantDecimals(0.123)).toBe("0.12");
      expect(NumberFormatter.formatToSignificantDecimals(1.999)).toBe("2.00");
      expect(NumberFormatter.formatToSignificantDecimals(0.1)).toBe("0.10");
    });

    test("formats numbers with leading zeros in decimals to (n+2) decimal places", () => {
      expect(NumberFormatter.formatToSignificantDecimals(0.00123)).toBe(
        "0.0012",
      );
      expect(NumberFormatter.formatToSignificantDecimals(1.000234)).toBe(
        "1.00023",
      );
      expect(NumberFormatter.formatToSignificantDecimals(1.000456)).toBe(
        "1.00046",
      );
    });

    test("handles negative numbers correctly", () => {
      expect(NumberFormatter.formatToSignificantDecimals(-123.456)).toBe(
        "-123.46",
      );
      expect(NumberFormatter.formatToSignificantDecimals(-0.00123)).toBe(
        "-0.0012",
      );
    });
  });
});
