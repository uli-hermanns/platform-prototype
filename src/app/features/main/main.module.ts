import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { TitlebarComponent } from "./titlebar/titlebar.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatGridListModule, SharedModule],
  declarations: [MainComponent, TitlebarComponent],
  exports: [MainComponent]
})
export class MainModule {}
