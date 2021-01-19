import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Directive({
  selector: "[flexFormAutosave]"
})
export class FormAutosaveDirective {

  @Input("flexFormAutosave") formGroup: FormGroup;

  constructor() {
    console.info("Form Autosave Directive initialized.");
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
