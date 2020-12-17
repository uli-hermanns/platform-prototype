import { Component, OnInit } from "@angular/core";

@Component({
  selector: "[flex-detail-tabs]",
  exportAs: 'flexDetailTabs',
  templateUrl: "./detail-tabs.component.html",
  styleUrls: ["./detail-tabs.component.css"]
})
export class DetailTabsComponent implements OnInit {
  constructor() {
    console.info('details');
  }

  ngOnInit() {}
}
