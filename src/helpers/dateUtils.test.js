import {
  convertToHoursMinutesSeconds,
  formatDate,
  isOutdated,
} from "./dateUtils";

describe("dateUtils", () => {
  describe("convertToHoursMinutesSeconds", () => {
    test("should convert milliseconds to hours, minutes, and seconds format", () => {
      expect(convertToHoursMinutesSeconds(3700000)).toBe("01:01:40");

      expect(convertToHoursMinutesSeconds(70000)).toBe("01:10");

      expect(convertToHoursMinutesSeconds(5000)).toBe("00:05");
    });
  });

  describe("formatDate", () => {
    test("should format a date string to DD/MM/YYYY format", () => {
      expect(formatDate("2023-07-24")).toBe("24/07/2023");
      expect(formatDate("2021-09-15")).toBe("15/09/2021");
    });
  });

  describe("isOutdated", () => {
    test("should return true if the date is outdated", () => {
      const yesterday = Date.now() - 24 * 60 * 60 * 1000 - 1;
      expect(isOutdated(yesterday)).toBe(true);

      const today = Date.now();
      expect(isOutdated(today)).toBe(false);
    });
  });
});
