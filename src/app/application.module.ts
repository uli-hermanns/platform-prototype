import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import { ApplicationComponent } from "./application.component";
import { ApplicationRoutingModule } from "./application-routing.module";
import { MainModule } from "./features/main/main.module";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MAT_DATE_LOCALE } from "@angular/material/core";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatMomentDateModule,
    CoreModule.for("en-EN"),
    SharedModule,
    MainModule,
    ApplicationRoutingModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-EN" }],
  declarations: [ApplicationComponent],
  bootstrap: [ApplicationComponent]
})
export class ApplicationModule {}
