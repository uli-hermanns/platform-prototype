import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from "@angular/core";
import { AbstractControl, FormGroup, FormGroupDirective } from "@angular/forms";
import { DomHelper } from "../../core/data/dom-helper";

export type AutosaveEventArgs = { value: any }

@Directive({
  selector: "[flexFormAutosave]"
})
export class FormAutosaveDirective implements OnInit {

  @Input("flexFormAutosave")
  formData: Object | undefined;

  @Output("flexFormSave")
  formSave = new EventEmitter<AutosaveEventArgs>();

  constructor(
    private formGroupDirective: FormGroupDirective,
    private el: ElementRef<HTMLFormElement>
  ) {
    console.info("Form Autosave Directive initialized.");
  }

  public ngOnInit() {
    this.nativeElement.autocomplete = "off";
    this.form.patchValue(this.formData);
    this.form.valueChanges.subscribe(data => {
      if (this.nativeElement.hasPointerCapture(1)) {
        this.nativeElement.releasePointerCapture(1);
        console.info("Form Autosave capture released.");
      }
      var control: AbstractControl = null;
      for (var key in this.form.controls) {
        control = this.form.controls[key];
        if (control.dirty) {
          break;
        }
      }
      if (this.form.dirty) {
        console.info("Form Autosave saving.");
        this.formSave.emit({ value: data });
        this.form.markAsPristine();
      }
      return data;
    });
  }

  @HostListener("keyup.escape")
  private handleEscape() {
    this.form.reset(this.formData);
    this.form.updateValueAndValidity();
  }
  
  @HostListener("document:mousedown", ["$event.target"])
  private handleMouseDown(target: HTMLElement) {
    if (!DomHelper.isDescendant(this.nativeElement, target)) {
      this.form.updateValueAndValidity();
      setTimeout(() => {
        if (this.form.invalid) {
          this.nativeElement.setPointerCapture(1);
          console.info("Form Autosave capture set.");

          const element: HTMLElement | null = this.nativeElement.querySelector(
            "input.ng-invalid, select.ng-invalid"
          );
          element?.focus();
        }
      });
    }
  }

  private get form(): FormGroup {
    return this.formGroupDirective.form;
  }

  private get nativeElement(): HTMLFormElement {
    return this.el.nativeElement;
  }
}
