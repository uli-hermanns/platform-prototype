import { Component, OnInit, VERSION } from "@angular/core";

@Component({
  selector: "app-titlebar",
  templateUrl: "./titlebar.component.html",
  styleUrls: ["./titlebar.component.css"]
})
export class TitlebarComponent implements OnInit {
  readonly name: string;

  constructor() {
    this.name = "Platform Prototype based on Angular " + VERSION.major;
  }

  ngOnInit() {}
}
