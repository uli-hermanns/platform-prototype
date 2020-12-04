import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { TitlebarComponent } from './titlebar/titlebar.component';

@NgModule({
  imports: [CommonModule, MatToolbarModule],
  declarations: [MainComponent, TitlebarComponent],
  exports: [MainComponent]
})
export class MainModule {}
