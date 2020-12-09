import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppModule } from "../app.module";
import { DtoResolver } from "./data/dto-resolver.service";

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [DtoResolver]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        `${CoreModule.name} is already loaded. Import it once in the ${
          AppModule.name
        } only.`
      );
    }
  }
}
