import {
  Component,
  ElementRef,
  HostListener,
  Input,
  AfterViewInit,
  OnInit,
  ViewChild
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

  constructor(private fb: FormBuilder) {}

  public firstName: FormControl = new FormControl(
    "firstName",
    Validators.required
  );

  public lastName: FormControl = new FormControl(
    "lastName",
    Validators.required
  );

  public ngAfterViewInit() {}

  public ngOnInit() {
    this.customerForm = this.fb.group(
      {
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
