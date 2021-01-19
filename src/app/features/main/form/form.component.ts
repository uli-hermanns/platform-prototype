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

  validate(control: FormControl): ValidationErrors | null {
    console.log("Custom Validation");
    //return { incorrect: true };
    return null;
  }

  public reset(control: FormControl) {
    this.customerForm.reset();
    for (let key in this.customerForm.controls) {
      if (this.customerForm.controls[key] == control) {
        control.reset(this.customer[key]);
        break;
      }
    }
  }

  @HostListener("focusout", ["$event.relatedTarget", "$event.target"])
  private focusout(related: HTMLElement, target: HTMLElement) {
    if (this.customerForm.dirty) {
      target.focus();
      setTimeout(() => {
        if (target.classList.contains("ng-invalid")) {
          target.focus();
        } else {
          related.focus();
        }
      });
    }
  }

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
            invalid: "Unknown Server Error"
          });
        }
      }
      return value;
    });
  }
}
