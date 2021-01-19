import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ValidationErrors
} from "@angular/forms";
import { CustomerDto } from "../../../core/data/customer-dto.model";

export type Focusable = { focus: () => void };

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  @Input()
  public customer: CustomerDto = null;

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

  public ngOnInit() {
    this.customerForm = this.fb.group(
      {
        firstName: this.firstName,
        lastName: this.lastName
      },
      {
        updateOn: "blur"
      }
    );
  }

  public save() {
    if (this.firstName.dirty) {
      if (this.firstName.value.length > 5) {
        this.firstName.setErrors({
          invalid: "Unknown Server Error."
        });
      }
    }
  }
}
