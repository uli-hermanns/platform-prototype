import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"; // CLI imports router
import { DtoResolver } from "./core/core/dto-resolver.service";
import { MainDto } from "./features/main/main-dto.model";
import { MainComponent } from "./features/main/main.component";

// defined the application routes
const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    data: { dtoType: MainDto },
    resolve: { dto: DtoResolver }
  }
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
