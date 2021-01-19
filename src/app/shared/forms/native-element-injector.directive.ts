import { Directive, ElementRef, Optional } from "@angular/core";
import { NgControl, NgModel } from "@angular/forms";

@Directive({
  selector: "[formControlName], [formControl]"
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
