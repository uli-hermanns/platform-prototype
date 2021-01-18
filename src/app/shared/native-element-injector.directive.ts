import { Directive, ElementRef, Optional } from "@angular/core";
import { NgControl, NgModel } from "@angular/forms";

@Directive({
  selector: "[formControlName], [formControl]" // or 'input, select, textarea' - but then your controls won't be handled and also checking for undefined would be necessary
})
export class NativeElementInjectorDirective {
  constructor(private el: ElementRef<HTMLElement>, private control: NgControl) {
    (<any>control).nativeElement = el.nativeElement;
    (<any>control).focus = focus;
  }

  public focus() {
    this.el.nativeElement.focus();
  }
}
