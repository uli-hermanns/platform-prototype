import { Directive, ElementRef,  EventEmitter, HostListener, Input, OnInit, Optional, Output, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl,  FormGroup, FormGroupDirective,  FormGroupName,    NgForm } from "@angular/forms";

@Directive({
  selector: "[flexFormAutosave]"
})
export class FormAutosaveDirective implements OnInit {

  @Input("flexFormAutosave") 
  formData: Object | undefined;

  @Output("ngSubmit") 
  formSave = new EventEmitter();

  constructor(private fb: FormBuilder, private formGroupDirective: FormGroupDirective,) {
    console.info("Form Autosave Directive initialized.");
  }

  public ngOnInit() {
    this.form.patchValue(this.formData);
    this.form.valueChanges.subscribe(data => {
      console.info("Form Autosave Directive saving.", data);
      var control: AbstractControl = null;
      for(var key in this.form.controls) {
        control = this.form.controls[key];
        if (control.dirty) {
          break;
        }
      }
      if ((control !== null) && (control.valid)) {
        // this.formGroupDirective.ngSubmit.emit({ data: data, control: control });
        this.formSave.emit({ data: data, control: control });
      }
      return data;
    });
  }

  private get form(): FormGroup {
    return this.formGroupDirective.form;
  }

  public group(controls: { [key: string]: FormControl }) {
    return this.fb.group(controls, { updateOn: 'blue' });
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
