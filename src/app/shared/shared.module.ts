import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToolbarComponent } from "./automation/toolbar.component";
import { ApplicationModule } from "../application.module";
import { PipelineDirective } from "./automation/pipeline.directive";
import { CommandDirective } from "./automation/command.directive";
import { AppComponent } from "./layout/app/app.component";
import { TitlebarComponent } from "./titlebar/titlebar.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AppHeaderComponent } from './layout/app/app-header/app-header.component';

@NgModule({
  imports: [CommonModule, MatToolbarModule],
  declarations: [
    TitlebarComponent,
    ToolbarComponent,
    PipelineDirective,
    CommandDirective,
    AppComponent,
    AppHeaderComponent
  ],
  exports: [
    TitlebarComponent,
    ToolbarComponent,
    AppComponent,
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
