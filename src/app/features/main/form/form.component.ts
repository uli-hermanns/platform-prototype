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
  debt: number;
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

  public form = {
    city: new FormControl(null, Validators.required),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    debt: new FormControl(),
    impeached: new FormControl(null, Validators.required),
  }

  constructor(private fb: FormAutosaveBuilder, private cd: ChangeDetectorRef) {
    this.customerForm = this.fb.group(this.form);
  }

  public get dirty(): boolean {
    return this.customerForm.dirty;
  }

   public ngAfterViewInit() {
    this.cd.detectChanges();
  }

  public ngOnInit() {
    this.model = {...this.customer, debt: 1000, impeached: new Date().toLocaleDateString()};
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
