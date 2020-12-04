import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main.component";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  imports: [CommonModule, MatToolbarModule],
  declarations: [MainComponent],
  exports: [MainComponent]
})
export class MainModule {}
