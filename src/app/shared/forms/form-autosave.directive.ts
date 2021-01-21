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

@Directive({
  selector: "[flexFormAutosave]"
})
export class FormAutosaveDirective implements OnInit {
  @Input("flexFormAutosave")
  formData: Object | undefined;

  @Output("flexFormSave")
  formSave = new EventEmitter();

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
      this.nativeElement.releasePointerCapture(1);
      console.info('Form Autosave capture released.');
      var control: AbstractControl = null;
      for (var key in this.form.controls) {
        control = this.form.controls[key];
        if (control.dirty) {
          break;
        }
      }
      if (control !== null && control.valid) {
        this.formSave.emit({ data: data, control: control });
      }
      return data;
    });
  }

  @HostListener("document:mousedown", ["$event"])
  private handleMouseDown(event: MouseEvent) {
    if (!DomHelper.isDescendant(this.el.nativeElement, <any>event.target)) {
      if (this.form.dirty) {
        this.form.updateValueAndValidity();
        setTimeout(() => {
          if (this.form.invalid) {
            this.nativeElement.setPointerCapture(1);
            console.info('Form Autosave capture set.');
          }
        });
      }
    }
  }

  private get form(): FormGroup {
    return this.formGroupDirective.form;
  }

  private get nativeElement(): HTMLFormElement {
    return this.el.nativeElement;
  }

  @HostListener("keyup.escape")
  private handleEscape() {
    this.form.reset(this.formData);
    this.form.updateValueAndValidity();
  }

  @HostListener("focusout", ["$event.relatedTarget", "$event.target"])
  private handleFocusOut(related: HTMLElement | undefined, target: HTMLElement) {
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
