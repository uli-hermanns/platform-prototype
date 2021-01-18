import { ChangeDetectionStrategy } from "@angular/compiler/src/compiler_facade_interface";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ValidatorFn,
  Validator,
  ValidationErrors
} from "@angular/forms";
import { CustomerDto } from "../../../core/data/customer-dto.model";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  @Input()
  public customer: CustomerDto = null;

  public customerForm: FormGroup;

  constructor(private fb: FormBuilder, private el: ElementRef) {}

  validate(control: FormControl): ValidationErrors | null {
    console.log("checking...");
    //return { incorrect: true };
    return null;
  }

  public firstName: FormControl & { focus: () => void } = <any>(
    new FormControl("firstName", this.validate)
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
      this.firstName.setErrors({ incorrect: true });
      this.firstName.markAsTouched();
      return value;
    });

    this.customerForm.statusChanges.subscribe(status => {
      console.info(status);
      const invalidElements = this.el.nativeElement.querySelectorAll(
        "input.ng-invalid"
      );
      if (invalidElements.length > 0) {
        invalidElements[0].focus();
      }
    });
  }
}
