import { Directive, ElementRef,  EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";

@Directive({
  selector: "[flexFormAutosave]"
})
export class FormAutosaveDirective implements OnInit {

  @Input("flexFormAutosave") formGroup: FormGroup;
  @Input("flexFormData") formData: Object;
  @ViewChild('f') form: NgForm;

  @Output("ngSubmit") formSave = new EventEmitter();

  constructor(private el: ElementRef<HTMLFormElement>) {
    console.info("Form Autosave Directive initialized.");
  }

  public ngOnInit() {
    this.formGroup.patchValue(this.formData);
    this.formGroup.valueChanges.subscribe(data => {
      console.info("Form Autosave Directive saving.");
      this.formSave.emit({ data: data });
      return data;
    });
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
