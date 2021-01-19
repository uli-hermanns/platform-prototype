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
import { DetailTabsComponent } from "./detail-tabs/detail-tabs.component";
import { MatTabsModule } from "@angular/material/tabs";
import { DetailTabComponent } from "./detail-tabs/detail-tab/detail-tab.component";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { NativeElementInjectorDirective } from "./forms/native-element-injector.directive";
import { FormAutosaveDirective } from "./forms/form-autosave.directive";
import { FormAutoresetDirective } from "./forms/form-autoreset.directive";

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    TitlebarComponent,
    ToolbarComponent,
    PipelineDirective,
    CommandDirective,
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppDetailsComponent,
    DetailTabsComponent,
    DetailTabComponent,
    NativeElementInjectorDirective,
    FormAutosaveDirective,
    FormAutoresetDirective
  ],
  exports: [
    TitlebarComponent,
    ToolbarComponent,
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppDetailsComponent,
    PipelineDirective,
    CommandDirective,
    DetailTabsComponent,
    DetailTabComponent,
    NativeElementInjectorDirective,
    FormAutosaveDirective,
    FormAutoresetDirective
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
