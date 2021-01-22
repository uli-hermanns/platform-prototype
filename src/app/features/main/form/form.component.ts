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
  firstname: string;
  lastName: string;
  city: string;
  user: string;
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

  constructor(private fb: FormAutosaveBuilder, private cd: ChangeDetectorRef) {
    this.customerForm = this.fb.group({
      city: this.city,
      firstName: this.firstName,
      lastName: this.lastName,
      user: this.user
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

  public user: FormControl = new FormControl("user", Validators.required);

  public ngAfterViewInit() {
    this.cd.detectChanges();
  }

  public ngOnInit() {
  }

  public bind(eventArgs: AutosaveEventArgs<CustomerModel>): void {
    Object.assign(eventArgs.data, { user: "Default" });
  }

  public save(eventArgs: AutosaveEventArgs<CustomerModel>): void {
    // performs the server validation
    if (!["Aachen", "Bochum", "Köln"].includes(eventArgs.data.city)) {
      eventArgs.error = `Unknown City: ${eventArgs.data.city}`;
    } else {
      // saves changes
      Object.assign(this.customer, eventArgs.data);
    }
  }
}
