import {
  Component,
  Input,
  AfterViewInit,
  OnInit,
  ViewChild,
  ChangeDetectorRef
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomerDto } from "../../../core/data/customer-dto.model";
import { FormAutosaveBuilder } from "../../../shared/forms/form-autosave-builder.service";
import {
  AutosaveEventArgs,
  FormAutosaveDirective
} from "../../../shared/forms/form-autosave.directive";

type CustomerModel = {
  firstName: string;
  lastName: string;
  city: string;
  impeached: string;
};

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

  public model: CustomerModel = null;

  constructor(private fb: FormAutosaveBuilder, private cd: ChangeDetectorRef) {
    this.customerForm = this.fb.group({
      city: this.city,
      firstName: this.firstName,
      lastName: this.lastName,
      impeached: this.impeached
    });
  }

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

  public impeached: FormControl = new FormControl(
    "impeached",
    Validators.required
  );

  public ngAfterViewInit() {
    this.cd.detectChanges();
  }

  public ngOnInit() {
    this.model = Object.assign({}, this.customer, { impeached: null });
  }

  public save(eventArgs: AutosaveEventArgs<CustomerModel>): void {
    // performs the server validation
    if (["bielefeld"].includes(eventArgs.data.city?.toLowerCase())) {
      eventArgs.error = `Unknown City: ${eventArgs.data.city}`;
    } else {
      // saves changes
      Object.assign(this.customer, eventArgs.data);
      this.model = eventArgs.data;
    }
  }
}
