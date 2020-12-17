import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { SharedModule } from "../../shared/shared.module";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    SharedModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule
  ],
  declarations: [MainComponent],
  exports: [MainComponent]
})
export class MainModule {}
