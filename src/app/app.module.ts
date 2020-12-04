import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { MainModule } from "./features/main/main.module";
import { SharedModule } from "./shared/shared/shared.module";
import { CoreModule } from "./core/core/core.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    SharedModule,
    MainModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
