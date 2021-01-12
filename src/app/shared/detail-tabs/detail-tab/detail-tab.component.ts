import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from "@angular/core";
import { MatTab } from "@angular/material/tabs";
import { Converter } from "../../../core/data/converter";

export type InputTemplate<T, TString = string> = T | TString | null | undefined;
export type InputBoolean<
  TBoolean = boolean,
  TString = "true" | "false" | ""
> = InputTemplate<TBoolean, TString>;

@Component({
  selector: "flex-detail-tab",
  templateUrl: "./detail-tab.component.html",
  styleUrls: ["./detail-tab.component.css"]
})
export class DetailTabComponent implements OnInit {
  @Input() public label: string;
  private _hidden: boolean = false;

  @Input()
  public get hidden(): boolean {
    return this._hidden;
  }

  public set hidden(value: boolean) {
    this._hidden = Converter.boolean(value);
  }

  @ViewChild(TemplateRef) public template: TemplateRef<any>;

  constructor() {}

  ngOnInit() {}

  static ngAcceptInputType_hidden: InputBoolean;
}
