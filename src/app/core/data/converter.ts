import { Validator } from "./validator";

export class Converter {
  public static boolean(value: any): boolean {
    let convert = Validator.isDefined(value);

    if (Validator.hasValue(value)) {
      if (typeof value === "string") {
        convert = value.toLowerCase() === "true" || Number(value) > 0;
      } else {
        convert = Number(value) > 0;
      }
    }

    return convert;
  }
}
