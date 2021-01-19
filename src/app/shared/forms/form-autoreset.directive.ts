import { Directive, Host } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FormAutosaveDirective } from "./form-autosave.directive";

@Directive({
  selector: "[flexFormAutoreset]"
})
export class FormAutoresetDirective {
  constructor(@Host() private autoForm: FormAutosaveDirective) {
    console.info("Form Auto Reset Directive initialized.");
  }

  public reset(control: FormControl, source: Object) {
    this.autoForm.formGroup.reset();
    for (let key in this.autoForm.formGroup.controls) {
      if (this.autoForm.formGroup.controls[key] == control) {
        control.reset(source[key]);
        break;
      }
    }
  }
}
