import { ChangeDetectionStrategy } from "@angular/compiler/src/compiler_facade_interface";
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  AfterViewInit,
  OnInit,
  ViewChild,
  ChangeDetectorRef
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl
} from "@angular/forms";
import { CustomerDto } from "../../../core/data/customer-dto.model";
import { FormAutosaveDirective } from "../../../shared/forms/form-autosave.directive";

export type Focusable = { focus: () => void };

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit, AfterViewInit {
  @Input()
  public customer: CustomerDto = null;

  @ViewChild(FormAutosaveDirective)
  private autoSaveForm: FormAutosaveDirective;

  public customerForm: FormGroup;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  public get dirty(): boolean {
    return this.customerForm.dirty;
  }

  public city: FormControl = new FormControl("city", Validators.required);

  public firstName: FormControl = new FormControl(
    "firstName",
    Validators.required
  );

  public lastName: FormControl = new FormControl(
    "lastName",
    Validators.required
  );

  public ngAfterViewInit() {
    this.cd.detectChanges();
  }

  public ngOnInit() {
    this.customerForm = this.fb.group(
      {
        city: this.city,
        firstName: this.firstName,
        lastName: this.lastName
      },
      { updateOn: "blur" }
    );
  }
  public save(data: CustomerDto): void {
    // saves changes
    Object.assign(this.customer, this.customerForm.value);
  }
}
