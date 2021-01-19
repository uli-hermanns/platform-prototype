import { ChangeDetectionStrategy } from "@angular/compiler/src/compiler_facade_interface";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
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
import { Event } from "@angular/router";
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

  constructor(private fb: FormBuilder, private el: ElementRef<HTMLElement>) {}

  validate(control: FormControl): ValidationErrors | null {
    console.log("Custom Validation");
    //return { incorrect: true };
    return null;
  }

  private isDescendant(parent: HTMLElement, child: HTMLElement): boolean {
    var node = child.parentNode;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
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

  @HostListener("focusout", ["$event"])
  private focusout(event: FocusEvent) {
    if (this.customerForm.dirty) {
      setTimeout(() => {
        if (
          !this.isDescendant(this.el.nativeElement, <HTMLElement>(
            document.activeElement
          ))
        ) {
          (<any>event.target).focus();
          console.info("Focus Out");
        }
      });
    }
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
      if (this.firstName.dirty) {
        this.firstName.setErrors({ incorrect: true });
        this.firstName.markAsTouched();
      }
      return value;
    });

    this.customerForm.statusChanges.subscribe(status => {
      console.info(status);
      const invalidElements = this.el.nativeElement.querySelectorAll(
        "input.ng-invalid"
      );
      if (invalidElements.length > 0) {
        (<any>invalidElements[0]).focus();
      }
    });
  }
}
