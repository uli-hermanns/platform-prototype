/**
 * Provides a Validator implementation.
 */

export class Validator {
  /**
   * Gets a flag indicating whether the specified value is set.
   *
   * @param value The value to check.
   * @returns True, if the value is set; otherwise false.
   */
  public static hasValue<T>(value: T | undefined | null): value is T {
    if (typeof value === "string") {
      return !Validator.isNullOrWhiteSpace(value);
    }
    if (typeof value === "number" || typeof value === "boolean") {
      return true;
    }
    if (Validator.isNullOrUndefined(value)) {
      return false;
    }
    return true;
  }

  /**
   * Gets a value indicating whether the specified value is an array.
   *
   * @param value The value to check.
   * @returns true, if the value is an array; otherwise false.
   */
  public static isArray(value: any): value is boolean {
    return Array.isArray(value);
  }

  /**
   * Gets a value indicating whether the specified value is a boolean.
   *
   * @param value The value to check.
   * @returns true, if the value is a boolean; otherwise false.
   */
  public static isBoolean(value: any): value is boolean {
    return typeof value === "boolean";
  }

  /**
   * Checks whether the input string is a valid date object.
   * @param value Contains the input value tested against a regex to be valid date.
   * @returns True if the input is a date object; otherwise false.
   */
  public static isDate(value: string): boolean {
    // eslint-disable-next-line max-len
    const datePattern = /^(?:(?:31(\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/gm;
    const date: Date = new Date(value);
    const dd: string = String(date.getDate()).padStart(2, "0");
    const mm: string = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy: number = date.getFullYear();
    return datePattern.test(`${dd}.${mm}.${yyyy}`);
  }

  /**
   * Gets a flag indicating whether the specified value is defined.
   *
   * @param value The value to check.
   * @returns True, if the value is defined; otherwise false.
   */
  public static isDefined<T>(value: T | undefined | null): value is T {
    const type = typeof value;
    if (type === "string" || type === "number" || type === "boolean") {
      return true;
    }
    return type !== "undefined";
  }

  /**
   * Checks whether the input value is empty string or whitespaces.
   * @param value Contains the value to be checked.
   * @returns True in case value is empty or whitespaces; otherwise false.
   */
  public static isEmptyOrWhiteSpaces(value: string): boolean {
    return /^$|\s+/.test(value);
  }

  /**
   * Gets a flag indicating whether the specified value is a function.
   *
   * @param value The value to check.
   * @returns True, if the value is a function; otherwise false.
   */
  public static isFunction(value: any): value is Function {
    return typeof value === "function";
  }

  /**
   * Checks whether the input string value is a valid iban.
   * @param value Contains the string value which is supposed to be a valid iban.
   * @returns True, if the value is an iban; otherwise false.
   */
  public static isIban(value: string): boolean {
    const de = /DE[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}([0-9]{2})\s?/;
    const nl = /NL[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([0-9]{4}\s?){2}([0-9]{2})\s?/;
    const be = /BE[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){3}\s?/;
    const at = /AT[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}\s?/;
    const ch = /CH[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([0-9]{1})([a-zA-Z0-9]{3}\s?)([a-zA-Z0-9]{4}\s?){2}([a-zA-Z0-9]{1})\s?/;
    const it = /IT[a-zA-Z0-9]{2}\s?([a-zA-Z]{1})([0-9]{3}\s?)([0-9]{4}\s?){1}([0-9]{3})([a-zA-Z0-9]{1}\s?)([a-zA-Z0-9]{4}\s?){2}([a-zA-Z0-9]{3})\s?/;
    return (
      de.test(value) ||
      nl.test(value) ||
      be.test(value) ||
      at.test(value) ||
      ch.test(value) ||
      it.test(value)
    );
  }

  /**
   * Gets a value indicating whether the specified value is null.
   *
   * @param value The value to check for null.
   * @returns true, if the value is null; otherwise false.
   */
  public static isNull(value: any): value is null {
    return value === null;
  }

  /**
   * Checks whether the entered value is null or empty.
   * @param value Contains the value to be validated.
   */
  public static isNullOrEmpty(value: any): value is null | undefined | object {
    if (this.isNullOrUndefined(value)) {
      return true;
    }
    return !value;
  }

  /**
   * Gets a flag indicating whether the specified value is null or undefined.
   *
   * @param value The value to check.
   * @returns True, if the value is undefined; otherwise false.
   */
  public static isNullOrUndefined(value: any): value is null | undefined {
    return typeof value === "undefined" || value === null;
  }

  /**
   * Gets a flag indicating whether the specified value is null or white-space.
   *
   * @param value The value string to check.
   * @returns True, if value is null or white-space; otherwise false.
   */
  public static isNullOrWhiteSpace(
    value: string | null | undefined
  ): value is null | undefined {
    return Validator.isNullOrUndefined(value) || value.match(/^ *$/) !== null;
  }

  /**
   * Gets a value indicating whether the specified value is a number.
   *
   * @param value The value to check.
   * @returns true, if the value is numeric; otherwise false.
   */
  public static isNumber(value: any): value is number {
    return typeof value === "number" && !isNaN(value);
  }

  /**
   * Gets a flag indicating whether the specified value is an object.
   *
   * @param value The value to check.
   * @returns True, if the value is an object; otherwise false.
   */
  public static isObject(value: any): value is object {
    return value !== null && typeof value === "object";
  }

  /**
   * Gets a flag indicating whether the specified value is an angular promise.
   *
   * @param obj The object or value to check.
   * @returns True, if the value is an angular promise; otherwise false.
   */
  public static isPromise(obj: any): boolean {
    return obj instanceof Promise;
  }

  /**
   * Gets a value indicating whether the specified value is a string.
   *
   * @param value The value to check.
   * @returns true, if the value is numeric; otherwise false.
   */
  public static isString(value: any): value is string {
    return typeof value === "string";
  }

  /**
   * Gets a flag indicating whether the specified value is undefined.
   *
   * @param value The value to check.
   * @returns True, if the value is undefined; otherwise false.
   */
  public static isUndefined(value: any): value is undefined {
    return typeof value === "undefined";
  }

  /**
   * Gets a flag indicating whether the specified value is set.
   *
   * @param value The value to check.
   * @returns True, if the value is set; otherwise false.
   */
  public static isValueless(value: any): value is undefined | null {
    return !this.hasValue(value);
  }

  /**
   * Checks whether an object is empty.
   *
   * @param obj The object to check.
   * @returns True, if the object is empty; otherwise false.
   */
  public static isEmptyObject(obj: any): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
}
