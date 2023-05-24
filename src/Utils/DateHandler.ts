type TranslateMonth = (month: number) => string;

export class DateHandler {
  public static getDateString(dateString: string): string {
    return this.getDateFormatted(dateString, "dd.MM.yyyy");
  }

  public static getDateFormattedWithDefault(dateString: string | Date, dateFormat: string, defaultString: string): string {
    if (dateString === null || dateString === undefined) {
      return defaultString;
    }
    return this.getDateFormatted(dateString, dateFormat);
  }

  public static getDateFormatted(dateString: string | Date, dateFormat: string): string {
    const date = new Date(dateString);
    let formattedDateString = dateFormat;

    if (dateFormat.indexOf("MMMM") >= 0) {
      formattedDateString = formattedDateString.replace("MMMM", this.translateMonthMethod(date.getMonth() + 1));
    }

    return formattedDateString
      .replace("yyyy", date.getFullYear().toString())
      .replace("MM", this.padNumber(date.getMonth() + 1, 2))
      .replace("dd", this.padNumber(date.getDate(), 2))
      .replace("hh", this.padNumber(date.getHours(), 2))
      .replace("HH", this.padNumber(date.getHours(), 2))
      .replace("mm", this.padNumber(date.getMinutes(), 2))
      .replace("ss", this.padNumber(date.getSeconds(), 2));
  }

  public static setMonthTranslationMethod(monthTranslationMethod: TranslateMonth) {
    this.translateMonthMethod = monthTranslationMethod;
  }

  private static translateMonthMethod: TranslateMonth = (month) => {
    console.info("Translate Month Method of DateHandler not set, uses browser default logic");
    const date = new Date(2000, month - 1, 1);
    return date.toLocaleString("default", { month: "long" });
  };

  private static padNumber(number: number, max: number): string {
    return this.padNumberString(number.toString(), max);
  }

  private static padNumberString(str: string, max: number): string {
    return str.length < max ? this.padNumberString(`0${str}`, max) : str;
  }
}
