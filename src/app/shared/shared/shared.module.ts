import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToolbarComponent } from "./automation/toolbar.component";
import { AppModule } from "../../app.module";
import { PipelineDirective } from "./automation/pipeline.directive";
import { CommandDirective } from "./automation/command.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [ToolbarComponent, PipelineDirective, CommandDirective],
  exports: [ToolbarComponent, PipelineDirective, CommandDirective]
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
          AppModule.name
        } only.`
      );
    }
  }
}
