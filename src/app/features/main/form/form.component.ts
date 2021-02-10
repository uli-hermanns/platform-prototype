import { formatDate } from "@angular/common";
import {
  Component,
  Input,
  AfterViewInit,
  OnInit,
  ViewChild,
  ChangeDetectorRef
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { CustomerDto } from "../../../core/data/customer-dto.model";
import { FormAutosaveBuilder } from "../../../shared/forms/form-autosave-builder.service";
import {
  AutosaveEventArgs,
  FormAutosaveDirective
} from "../../../shared/forms/form-autosave.directive";

function pick<
  T extends { [K in keyof T]: string | number | symbol },
  K extends keyof T
>(value: T, selector: K): Record<T[K], T> {
  return { ...{}, [selector] : value[selector] } as Record<T[K], T>;
}

type ReactiveForm = { [key: string]: FormControl }

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
  private autoSaveForm: FormAutosaveDirective<CustomerModel>;

  public customerForm: FormGroup;

  public model: CustomerModel = null;

  public form: ReactiveForm = {
    city: new FormControl(null, Validators.required),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    debt: new FormControl(),
    impeached: new FormControl(null, Validators.required),
  }

  constructor(private fb: FormAutosaveBuilder, private cd: ChangeDetectorRef, private adapter: DateAdapter<Date>) {
    this.customerForm = this.fb.group(this.form);
    // adapter.setLocale("de-DE");
  }
  

   public ngAfterViewInit() {
    this.cd.detectChanges();
    const result = pick(this.customer, 'key');
    console.info(result);
    const keys = Object.keys(result);
    console.info(keys);
  }

  public ngOnInit() {
    this.model = {...this.customer, debt: 1000, impeached: formatDate(new Date(), 'shortDate', 'en')};
  }

  public get dirty(): boolean {
    return this.customerForm.dirty;
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
