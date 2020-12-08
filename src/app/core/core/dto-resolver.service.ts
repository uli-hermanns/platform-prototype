import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { Dto, DtoConstructor } from "./dto.model";

type Constructor<T> = new (...args: any[]) => T;

@Injectable()
export class DtoResolver<TDto extends Dto> implements Resolve<TDto> {
  constructor() {}
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new route.data.dtoType();
  }
}
