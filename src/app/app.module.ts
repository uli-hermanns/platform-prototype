import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import { AllroundComponent } from "./allround.component";
import { AppRoutingModule } from "./app-routing.module";
import { MainModule } from "./features/main/main.module";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CoreModule,
    SharedModule,
    MainModule,
    AppRoutingModule
  ],
  declarations: [AllroundComponent],
  bootstrap: [AllroundComponent]
})
export class AppModule {}
