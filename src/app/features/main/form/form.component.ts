import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CustomerDto } from "../../../core/data/customer-dto.model";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  public customer: CustomerDto = null;

  public customerForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl("")
  });
  constructor() {
    this.customerForm.patchValue({ firstName: "Max" });
  }

  ngOnInit() {}
}
