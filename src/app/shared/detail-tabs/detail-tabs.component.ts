import {
  AfterViewInit,
  Component,
  ContentChildren,
  QueryList,
  ViewChild
} from "@angular/core";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { DetailTabComponent } from "./detail-tab/detail-tab.component";

@Component({
  selector: "flex-detail-tabs",
  templateUrl: "./detail-tabs.component.html",
  styleUrls: ["./detail-tabs.component.css"]
})
export class DetailTabsComponent implements AfterViewInit {
  @ViewChild(MatTabGroup)
  public tabGroup: MatTabGroup;

  @ContentChildren(DetailTabComponent)
  private tabs: QueryList<DetailTabComponent>;

  constructor() {}

  public ngAfterViewInit() {}

  public get visibleTabs(): DetailTabComponent[] {
    return this.tabs.filter(tab => tab.visible);
  }

  public get hiddenTabs(): DetailTabComponent[] {
    return this.tabs.filter(tab => !tab.visible);
  }

  public showAsLast(tab: DetailTabComponent) {
    const tabs = this.visibleTabs;
    if (tabs.length > 0) {
      tabs[tabs.length - 1].visible = false;
    }
    tab.visible = true;
    this.tabGroup.selectedIndex = this.visibleTabs.length - 1;
  }
}
