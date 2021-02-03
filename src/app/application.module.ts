import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import { ApplicationComponent } from "./application.component";
import { ApplicationRoutingModule } from "./application-routing.module";
import { MainModule } from "./features/main/main.module";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CoreModule.for("en-EN"),
    SharedModule,
    MainModule,
    ApplicationRoutingModule
  ],
  declarations: [ApplicationComponent],
  bootstrap: [ApplicationComponent]
})
export class ApplicationModule {}
