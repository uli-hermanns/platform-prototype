import { NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router"; // CLI imports router
import { DtoResolver } from "./core/core/dto-resolver.service";
import { Dto } from "./core/core/dto.model";
import { MainComponent } from "./features/main/main.component";

// defined the application routes
const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    resolve: { dto: DtoResolver.new(Dto) }
  }
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
