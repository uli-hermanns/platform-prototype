import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
  ViewChild
} from "@angular/core";
import { MatTabGroup } from "@angular/material/tabs";
import { DetailTabComponent } from "./detail-tab/detail-tab.component";

@Component({
  selector: "flex-detail-tabs",
  templateUrl: "./detail-tabs.component.html",
  styleUrls: ["./detail-tabs.component.css"]
})
export class DetailTabsComponent implements AfterContentInit {
  @ViewChild(MatTabGroup)
  public tabGroup: MatTabGroup;

  @ContentChildren(DetailTabComponent)
  private tabs: QueryList<DetailTabComponent>;

  public visibleTabs: DetailTabComponent[] = [];

  constructor() {}

  public ngAfterContentInit() {
    setTimeout(() => (this.visibleTabs = this.tabs.filter(tab => !tab.hidden)));
  }

  public get hiddenTabs(): DetailTabComponent[] {
    return this.tabs
      .filter(tab => tab.hidden)
      .sort((left, right) => (left.label < right.label ? -1 : 1));
  }

  public showAsLast(tab: DetailTabComponent): void {
    if (!tab.hidden) {
      return;
    }

    if (this.visibleTabs.length > 0) {
      const lastTab = this.visibleTabs.pop();
      lastTab.hidden = true;
    }

    tab.hidden = false;
    this.visibleTabs.push(tab);
    this.tabGroup.selectedIndex = this.visibleTabs.length - 1;
  }
}
