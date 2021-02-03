import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApplicationModule } from "../application.module";
import { DtoResolver } from "./data/dto-resolver.service";
import { MAT_DATE_LOCALE } from "@angular/material/core";

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [DtoResolver]
})
export class CoreModule {
  public constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        `${CoreModule.name} is already loaded. Import it once in the ${
          ApplicationModule.name
        } only.`
      );
    }
  }
  public static for(locale: string): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [{ provide: MAT_DATE_LOCALE, useValue: locale }]
    };
  }
}
