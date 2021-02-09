import {
  Directive,
  ElementRef,
  EventEmitter,
HostListener,
  Input,
NgZone,
OnChanges,
OnDestroy,
    OnInit,
  Output} from "@angular/core";
import { FormGroup, FormGroupDirective } from "@angular/forms";
import {FocusMonitor} from '@angular/cdk/a11y';
import { OverlayContainer } from "@angular/cdk/overlay";

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
export class FormAutosaveDirective<TModel> implements OnInit, OnDestroy, OnChanges {

  /** Contains a logger instance */
  private logger: Console;

  /** Contains the form data */
  @Input("flexFormAutosave")
  formData: Object | undefined;

  /** Provides a bind event */
  @Output("flexFormBind")
  formBind = new EventEmitter<AutosaveEventArgs<TModel>>();

  /** Provides an autosave event */
  @Output("flexFormSave")
  formSave = new EventEmitter<AutosaveEventArgs<TModel>>();

  /**
  * Creates an instance of the Autosave Diretive
  *
  * @param fromGroupDirective The form group directive.
  * @param el The form element.
  */
  constructor(
    private overlayContainer: OverlayContainer,
    private focusMonitor: FocusMonitor,
    private formGroupDirective: FormGroupDirective,
    private ngZone: NgZone,
    private el: ElementRef<HTMLFormElement>,
    private subtree: ElementRef<HTMLElement>
  ) {
    this.logger = console;
    this.logger.info(`${FormAutosaveDirective.name} created.`);
    this.focusMonitor.monitor(this.el)
        .subscribe(origin => this.ngZone.run(() => {
          console.info(`${FormAutosaveDirective.name} ${origin ? "focus form by " + origin : "blur form"}`);
        }));
    this.focusMonitor.monitor(this.subtree, true)
        .subscribe(origin => this.ngZone.run(() => {
          if (this.form.invalid && !origin) {
            // this.nativeElement.setPointerCapture(1);
            // this.restoreFocus("invalid");
          }
          console.info(`${FormAutosaveDirective.name} ${origin ? "focus child by " + origin : "blur child"}`);
        }));    
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.el);
    this.focusMonitor.stopMonitoring(this.subtree);
  }    

  /**
  * Initializes the directive.
  */
  public ngOnInit() {
    this.nativeElement.autocomplete = "off";
    this.form.valueChanges.subscribe(data => this.triggerAutosave(data));
    this.logger.info(`${FormAutosaveDirective.name} initialized.`);
  }

  /**
  * Initializes the directive.
  */
  public ngOnChanges() {
    this.form.patchValue(this.formData);  
    this.logger.info(`${FormAutosaveDirective.name} bound.`, this.formData);
  }  

  /**
  * Triggers the autosave.
  *
  * @param data The data to save.
  */
  private triggerAutosave(data: Object): Object {
      if (this.nativeElement.hasPointerCapture(1)) {
        this.nativeElement.releasePointerCapture(1);
        this.logger.info(`${FormAutosaveDirective.name} capture released.`);
      }

      if (this.form.dirty && !this.form.invalid) {
        this.logger.info(`${FormAutosaveDirective.name} saving.`, data);
        const eventArgs: AutosaveEventArgs = { data: data };
        this.formSave.emit(eventArgs);
        if (eventArgs.error) {
          this.form.setErrors({
            invalid: eventArgs.error
          });
          setTimeout(() => {
            this.restoreFocus("dirty");
          })
        }
        else {
          setTimeout(() => {
            this.form.markAsPristine();
            this.form.updateValueAndValidity();
            if (this.nativeElement.contains(document.activeElement)) { 
              this.form.markAsTouched();
            } else {
              this.form.markAsUntouched();
            }
          })
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
    this.form.markAsTouched();
  }

  /**
  * Handles a Mouse Down event.
  */
  @HostListener("document:mousedown", ["$event.target"])
  private handleMouseDown(target: HTMLElement): void {
    if (this.nativeElement.contains(target) || this.overlayContainer.getContainerElement().contains(target)) {
      this.form.markAsTouched();
    } else {
      this.form.updateValueAndValidity();
      setTimeout(() => {
        if (this.form.invalid) {
          this.nativeElement.setPointerCapture(1);
          this.logger.info(`${FormAutosaveDirective.name} capture set.`);
          this.restoreFocus("invalid");
        } else {
          this.form.markAsUntouched();
        }
      });
    }
  }

  /**
  * Restores the focus.
  * @param status Sets the focus to a field with the specified status.
  */
  private restoreFocus(status: "dirty" | "invalid" | "valid") {
    const element: HTMLElement | null = this.nativeElement.querySelector(
      `input.ng-${status}, select.ng-${status}`
    );
    if (element) {
      this.focusMonitor.focusVia(element, "program")
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
