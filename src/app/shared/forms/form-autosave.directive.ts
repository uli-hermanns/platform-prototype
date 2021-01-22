import {
  Directive,
  ElementRef,
  EventEmitter,
HostListener,
  Input,
  OnInit,
  Output
} from "@angular/core";
import { FormGroup, FormGroupDirective } from "@angular/forms";
import { DomHelper } from "../../core/data/dom-helper";

/** 
 * Defines an autosave event args type.
 */
export type AutosaveEventArgs<T = any> = { data: T, error?: string }

/**
 *  Allows Reactive Forms being autosaved.
 */
@Directive({
  selector: "[flexFormAutosave]"
})
export class FormAutosaveDirective implements OnInit {

  /** Contains a logger instance */
  private logger: Console;

  /** Contains the form data */
  @Input("flexFormAutosave")
  formData: Object | undefined;

  /** Provides a bind event */
  @Output("flexFormBind")
  formBind = new EventEmitter<AutosaveEventArgs>();

  /** Provides an autosave event */
  @Output("flexFormSave")
  formSave = new EventEmitter<AutosaveEventArgs>();

  /**
  * Creates an instance of the Autosave Diretive
  *
  * @param fromGroupDirective The form group directive.
  * @param el The form element.
  */
  constructor(
    private formGroupDirective: FormGroupDirective,
    private el: ElementRef<HTMLFormElement>
  ) {
    this.logger = console;
    this.logger.info("Form Autosave Directive initialized.");
  }

  /**
  * Initializes teh directive.
  */
  public ngOnInit() {
    this.nativeElement.autocomplete = "off";
    this.formBind.emit({ data: this.formData });
    this.form.patchValue(this.formData);  
    this.logger.info("Form Autosave bound.");
    this.form.valueChanges.subscribe(data => this.triggerAutosave(data));
  }

  /**
  * Triggers the autosave.
  *
  * @param data The data to save.
  */
  private triggerAutosave(data: Object): Object {
      if (this.nativeElement.hasPointerCapture(1)) {
        this.nativeElement.releasePointerCapture(1);
        this.logger.info("Form Autosave capture released.");
      }

      if (this.form.dirty && !this.form.invalid) {
        this.logger.info("Form Autosave saving.", data);
        const eventArgs: AutosaveEventArgs = { data: data };
        this.formSave.emit(eventArgs);
        if (eventArgs.error) {
          this.form.setErrors({
            invalid: eventArgs.error
          });
          setTimeout(() => {
            const element: HTMLElement | null = this.nativeElement.querySelector(
              "input.ng-dirty, select.ng-dirty"
            );
            console.info(element);
            element?.focus();
          })
        }
        else {
          this.form.markAsPristine();
          this.form.updateValueAndValidity();
        }
      } 
      return data;
  }

  /**
  * Handles an Escape key press.
  */
  @HostListener("keyup.escape")
  private handleEscape(): void {
    this.form.reset(this.formData);
    this.form.updateValueAndValidity();
  }
  
  /**
  * Handles a Mouse Down event.
  */
  @HostListener("document:mousedown", ["$event.target"])
  private handleMouseDown(target: HTMLElement): void {
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

  /**
  * Retrieves the form group.
  *
  * @returns The form group.
  */
  private get form(): FormGroup {
    return this.formGroupDirective.form;
  }

  /**
  * Retrieves the native form element.
  *
  * @returns The form element.
  */
  private get nativeElement(): HTMLFormElement {
    return this.el.nativeElement;
  }
}
