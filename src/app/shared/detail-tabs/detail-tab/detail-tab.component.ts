import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from "@angular/core";
import { MatTab } from "@angular/material/tabs";

@Component({
  selector: "flex-detail-tab",
  templateUrl: "./detail-tab.component.html",
  styleUrls: ["./detail-tab.component.css"]
})
export class DetailTabComponent implements OnInit {
  @Input() public label: string;
  @Input() public visible: boolean = true;

  @ViewChild(TemplateRef) public template: TemplateRef<any>;

  constructor() {}

  ngOnInit() {}
}
