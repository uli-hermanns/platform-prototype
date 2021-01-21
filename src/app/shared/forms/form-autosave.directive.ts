import {
AfterContentInit,
  Directive,
  ElementRef,
  EventEmitter,
HostListener,
  Input,
  OnInit,
  Output
} from "@angular/core";
import { AbstractControl, FormBuilder,  FormGroup, FormGroupDirective } from "@angular/forms";
import { DomHelper } from "../../core/data/dom-helper";

export type AutosaveEventArgs<T = any> = { value: T, error?: string }

@Directive({
  selector: "[flexFormAutosave]"
})
export class FormAutosaveDirective implements OnInit, AfterContentInit {

  private logger: Console;

  @Input("flexFormAutosave")
  formData: Object | undefined;

  @Output("flexFormSave")
  formSave = new EventEmitter<AutosaveEventArgs>();

  constructor(
    private formGroupDirective: FormGroupDirective,
    private el: ElementRef<HTMLFormElement>
  ) {
    this.logger = console;
    this.logger.info("Form Autosave Directive initialized.");
  }

  public ngOnInit() {
    this.nativeElement.autocomplete = "off";
    this.form.patchValue(this.formData);
    this.logger.info("Form Autosave bound.");
    this.form.valueChanges.subscribe(data => {
      if (this.nativeElement.hasPointerCapture(1)) {
        this.nativeElement.releasePointerCapture(1);
        this.logger.info("Form Autosave capture released.");
      }

      if (this.form.dirty && !this.form.invalid) {
        this.logger.info("Form Autosave saving.", data);
        const eventArgs: AutosaveEventArgs = { value: data };
        this.formSave.emit(eventArgs);
        if (eventArgs.error) {
          this.form.setErrors({
            invalid: eventArgs.error
          });
        }
        else {
          this.form.markAsPristine();
          this.form.updateValueAndValidity();
        }
      }
      return data;
    });
  }

  public ngAfterContentInit() {
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
          this.logger.info("Form Autosave capture set.");

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
