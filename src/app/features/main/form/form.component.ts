import { Component, Input, OnInit, Output } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { switchMap } from "rxjs/operators";
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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.customerForm = this.fb.group(
      {
        firstName: new FormControl("firtName", Validators.required),
        lastName: new FormControl("lastName")
      },
      {
        updateOn: "blur"
      }
    );
    this.customerForm.patchValue(this.customer);
    this.customerForm.get("firstName").valueChanges.pipe(
      switchMap((value, index) => {
        console.info(value);
        this.customer.firstName = value;
        return value;
      })
    );
  }
}
