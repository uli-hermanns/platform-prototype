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

  constructor(private fb: FormBuilder, private el: ElementRef<HTMLElement>) {}

  public firstName: FormControl & Focusable = <any>(
    new FormControl("firstName", Validators.required)
  );

  ngOnInit() {
    this.customerForm = this.fb.group(
      {
        firstName: this.firstName,
        lastName: new FormControl("lastName")
      },
      {
        updateOn: "blur"
      }
    );
    this.customerForm.patchValue(this.customer);
    this.customerForm.valueChanges.subscribe(value => {
      if (this.firstName.dirty) {
        if (this.firstName.value.length > 5) {
          this.firstName.setErrors({
            invalid: "Unknown Server Error."
          });
        }
      }
      return value;
    });
  }
}
