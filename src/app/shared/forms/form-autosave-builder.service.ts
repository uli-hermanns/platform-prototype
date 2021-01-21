import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Injectable()
export class FormAutosaveBuilder {
  constructor(private fb: FormBuilder) {}

  public group(controls: { [key: string]: FormControl }): FormGroup {
    return this.fb.group(controls, { updateOn: "blur" });
  }
}
