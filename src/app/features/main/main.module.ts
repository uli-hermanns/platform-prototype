import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    SharedModule
  ],
  declarations: [MainComponent],
  exports: [MainComponent]
})
export class MainModule {}
