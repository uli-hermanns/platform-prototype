import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { Dto } from "./dto.model";

@Injectable()
export class DtoResolver<TDto extends Dto> implements Resolve<TDto> {
  constructor() {}
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Dto<string>();
  }
}
