import { Directive, ElementRef,  EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl,  FormGroup, NgForm } from "@angular/forms";

@Directive({
  selector: "[flexFormAutosave]"
})
export class FormAutosaveDirective implements OnInit {

  @Input("flexFormAutosave") formGroup: FormGroup | undefined;
  @Input("flexFormData") formData: Object | undefined;

  @Output("ngSubmit") formSave = new EventEmitter();

  constructor(private fb: FormBuilder) {
    console.info("Form Autosave Directive initialized.");
  }

  public ngOnInit() {
    this.formGroup?.patchValue(this.formData);
    this.formGroup?.valueChanges.subscribe(data => {
      console.info("Form Autosave Directive saving.", data);
      var control: AbstractControl = null;
      for(var key in this.formGroup.controls) {
        control = this.formGroup.controls[key];
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

  public group(controls: { [key: string]: FormControl }) {
    return this.fb.group(controls, { updateOn: 'blue' });
  }

  @HostListener("keyup.escape")
  private keyup() {
    this.formGroup?.reset(this.formData);
    this.formGroup?.updateValueAndValidity();
  }
 
  @HostListener("focusout", ["$event.relatedTarget", "$event.target"])
  private focusout(related: HTMLElement | undefined, target: HTMLElement) {
    if (this.formGroup?.dirty) {
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
