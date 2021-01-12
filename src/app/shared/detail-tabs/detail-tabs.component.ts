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

  public visibleTabs: DetailTabComponent[] = [];

  constructor() {}

  public ngAfterViewInit() {
    this.visibleTabs = this.tabs.filter(tab => tab.visible);
  }

  public get hiddenTabs(): DetailTabComponent[] {
    return this.tabs
      .filter(tab => !tab.visible)
      .sort((left, right) => (left.label < right.label ? -1 : 1));
  }

  public showAsLast(tab: DetailTabComponent): void {
    if (tab.visible) {
      return;
    }

    if (this.visibleTabs.length > 0) {
      const lastTab = this.visibleTabs.pop();
      lastTab.visible = false;
    }

    tab.visible = true;
    this.visibleTabs.push(tab);
    this.tabGroup.selectedIndex = this.visibleTabs.length - 1;
  }
}
