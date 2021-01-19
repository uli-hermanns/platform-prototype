import { Directive, HostListener, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Directive({
  selector: "[flexFormAutosave]"
})
export class FormAutosaveDirective {

  @Input("flexFormAutosave") formGroup: FormGroup;

  @Input("flexFormData") formData: Object;

  constructor() {
    console.info("Form Autosave Directive initialized.");
  }

  @HostListener("keyup.escape")
  private keyup() {
    this.formGroup?.reset(this.formData);
  }
 
  @HostListener("focusout", ["$event.relatedTarget", "$event.target"])
  private focusout(related: HTMLElement | undefined, target: HTMLElement) {
    if (this.formGroup.dirty) {
      if (related?.classList.contains("ignore")) {
        related.classList.remove("ignore");
      } else {
        target.focus();
        setTimeout(() => {
          if (!target.classList.contains("ng-invalid")) {
            related?.classList.add("ignore");
            related?.focus();
          }
        });
      }
    }
  }
}
