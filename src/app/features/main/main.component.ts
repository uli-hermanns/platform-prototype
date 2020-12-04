import { Component, OnInit, VERSION } from "@angular/core";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  readonly name: string;
  constructor() {
    this.name = "Platform Prototype based on Angular " + VERSION.major;
  }

  ngOnInit() {}
}
