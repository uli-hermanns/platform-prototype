import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { Dto, DtoConstructor } from "./dto.model";

@Injectable()
export class DtoResolver<TDto extends Dto> implements Resolve<TDto> {
  constructor() {}
  public static new<TDto extends Dto>(
    TDto
  ): (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => Resolve<TDto> {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
      new DtoResolver<TDto>().resolve;
  }
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Dto<string>();
  }
}
