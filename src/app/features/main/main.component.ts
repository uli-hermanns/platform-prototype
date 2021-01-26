import { Component, OnInit, VERSION } from "@angular/core";
import { CustomerDto } from "../../core/data/customer-dto.model";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  readonly name: string;
  public customer: CustomerDto;
  constructor() {
    this.customer = {
      key: "donald@trump",
      firstName: "Donald",
      lastName: "Trump",
      city: "New York"
    };
    this.name = "Platform Prototype based on Angular " + VERSION.major;
  }

  ngOnInit() {}
}
