import { Directive, EventEmitter, HostListener, Input, OnInit, Output, Self } from "@angular/core";
import { AbstractControl, FormGroup, FormGroupDirective, NgForm } from "@angular/forms";

@Directive({
  selector: "[flexFormAutosave]"
})
export class FormAutosaveDirective implements OnInit {

  @Input("flexFormAutosave") 
  formData: Object | undefined;

  @Output("flexFormSave") 
  formSave = new EventEmitter();

  constructor(private formGroupDirective: FormGroupDirective) {
    console.info("Form Autosave Directive initialized.");
  }

  public ngOnInit() {
    this.form.patchValue(this.formData);
    this.form.valueChanges.subscribe(data => {
      var control: AbstractControl = null;
      for(var key in this.form.controls) {
        control = this.form.controls[key];
        if (control.dirty) {
          break;
        }
      }
      if ((control !== null) && (control.valid)) {
        this.formSave.emit({ data: data, control: control });
      }
      return data;
    });
  }

  private get form(): FormGroup {
    return this.formGroupDirective.form;
  }

  @HostListener("keyup.escape")
  private handleEscape() {
    this.form.reset(this.formData);
    this.form.updateValueAndValidity();
  }
 
  @HostListener("focusout", ["$event.relatedTarget", "$event.target"])
  private handleFocusOut(related: HTMLElement | undefined, target: HTMLElement) {
    if (this.form.dirty) {
      if (related?.classList.contains("flex-ignore")) {
        related.classList.remove("flex-ignore");
      } else {
        target.focus();
        setTimeout(() => {
          if (!target.classList.contains("ng-invalid")) {
            related?.classList.add("flex-ignore");
            related?.focus();
          }
        });
      }
    }
  }
}
