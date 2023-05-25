// Guarda de rota de login

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';

@Injectable()
export class RouteGuard  {
  constructor(
    // private loginService: LoginService
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    // TODO:
    // aplicar lógica de login
    // EX: this.loginService.isLoggedIn().pipe....
    return of(true).pipe(
      map((logged) => (logged ? true : this.router.parseUrl('/login')))
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.canActivate(route, state);
  }
}
