import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApplicationModule } from "../application.module";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { DtoResolver } from "./data/dto-resolver.service";
import { MAT_DATE_LOCALE } from "@angular/material/core";

import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de";
registerLocaleData(localeDe);

@NgModule({
  imports: [CommonModule, MatMomentDateModule],
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
  public static for(
    locale: "de-DE" | "en-EN"
  ): ModuleWithProviders<CoreModule> {
    console.info(`${CoreModule.name} using locale ${locale}`);
    return {
      ngModule: CoreModule,
      providers: [{ provide: MAT_DATE_LOCALE, useValue: locale }]
    };
  }
}
