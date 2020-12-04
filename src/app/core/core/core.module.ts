import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppModule } from "../../app.module";

@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        `${CoreModule.name} is already loaded. Import it once in the ${AppModule.name} only.`
      );
    }
  }
}
