import {
  AfterViewInit,
  Component,
  ContentChildren,
  QueryList,
  ViewChild, 
  ChangeDetectorRef
} from "@angular/core";
import { MatTabGroup } from "@angular/material/tabs";
import { Validator } from "../../core/data/validator";
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
  private tabs: QueryList<DetailTabComponent> = new QueryList<DetailTabComponent>();

  public visibleTabs: DetailTabComponent[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  public ngAfterViewInit() {
      this.visibleTabs = this.tabs.filter(tab => !tab.hidden);
      this.cd.detectChanges();
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
      this.visibleTabs.pop().hidden = true;
    }

    tab.hidden = false;
    this.visibleTabs.push(tab);
    this.tabGroup.selectedIndex = this.visibleTabs.length - 1;
  }
}
