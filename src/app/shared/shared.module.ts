import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToolbarComponent } from "./automation/toolbar.component";
import { ApplicationModule } from "../application.module";
import { PipelineDirective } from "./automation/pipeline.directive";
import { CommandDirective } from "./automation/command.directive";
import { AppComponent } from "./layout/app/app.component";
import { TitlebarComponent } from "./titlebar/titlebar.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AppHeaderComponent } from "./layout/app/app-header/app-header.component";
import { AppFooterComponent } from "./layout/app/app-footer/app-footer.component";
import { AppDetailsComponent } from "./layout/app/app-details/app-details.component";
import { MatSidenavModule } from "@angular/material/sidenav";

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatSidenavModule],
  declarations: [
    TitlebarComponent,
    ToolbarComponent,
    PipelineDirective,
    CommandDirective,
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppDetailsComponent
  ],
  exports: [
    TitlebarComponent,
    ToolbarComponent,
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppDetailsComponent,
    PipelineDirective,
    CommandDirective
  ]
})
export class SharedModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: SharedModule
  ) {
    if (parentModule) {
      throw new Error(
        `${SharedModule.name} is already loaded. Import it once in the ${
          ApplicationModule.name
        } only.`
      );
    }
  }
}
