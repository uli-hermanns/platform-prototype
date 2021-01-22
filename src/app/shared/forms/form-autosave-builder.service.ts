import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

/**
 *  Allows to build Reactive Forms using the autosave feature.
 */
@Injectable()
export class FormAutosaveBuilder {
  constructor(private fb: FormBuilder) {}

  /**
   *  Creates a form group.
   *
   *  @param controls The controls.
   *  @returns the form group.
   */
  public group(controls: { [key: string]: FormControl }): FormGroup {
    return this.fb.group(controls, { updateOn: "blur" });
  }
}
