// configuração do preload eagle
// para configurar basta colocar o atributo preload: true na rota

import { inject, Injectable } from '@angular/core';

import { PreloadingStrategy, Route, Router } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class EaglePreload implements PreloadingStrategy {

  private router: Router = inject(Router);

  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    const preloadCondition =
      route.data &&
      (route.data['preload'] ||
        (route.data['preloadAfterRoute'] &&
          this.router.url.includes(`${route.data['preloadAfterRoute']}`)));
    if (preloadCondition) {
      const delay =
        (route.data ? route.data['preloadDelay'] : undefined) || 2000;

      return timer(delay).pipe(
        tap(() => queueMicrotask(() => load())),
        catchError((error) => {
          return of(null);
        })
      );
    }

    return of(null);
  }
}
