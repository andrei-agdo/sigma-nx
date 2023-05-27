import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@sigma-nx/login').then((c) => c.LoginComponent),
  },
  {
    path: '',
    data: {
      preloadAfterRoute: 'login',
      preloadDelay: 1000,
    },
    loadChildren: () =>
      import('./siscom.routes').then((m) => m.SiscomRoutingModule),
  },
  {
    path: 'dev-page',
    loadComponent: () =>
      import('./core/dev-page/dev-page.component').then(
        (c) => c.DevPageComponent
      ),
  },
];;
