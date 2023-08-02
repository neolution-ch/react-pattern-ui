/* eslint-disable max-lines */
import { DateHandler } from "react-pattern-ui";

describe("DateHandler.cy.tsx", () => {
  it("get date string", async () => {
    expect(DateHandler.getDateString("2022-10-15")).to.eq("15.10.2022");
  });

  it("get date string formated", async () => {
    DateHandler.setMonthTranslationMethod((month) => (month === 11 ? "November" : month.toString()));
    expect(DateHandler.getDateFormatted(new Date(2022, 10, 15, 12, 33), "dd MMMM yyyy hh:mm")).to.eq("15 November 2022 12:33");
  });

  it("get date string default", async () => {
    const testDate = undefined as unknown as Date;
    expect(DateHandler.getDateFormattedWithDefault(testDate, "dd MMMM yyyy hh:mm", "01.01.1999")).to.eq("01.01.1999");
  });
});
