import { Dto } from "./dto.model";
import { Nullable } from "./utitlity-types";

export class CustomerDto extends Dto<string> {
  public firstName: Nullable<string>;
  public lastName: Nullable<string>;
}
