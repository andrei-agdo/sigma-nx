import { Route } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';

export const administrativoUsuariosRoutes: Route[] = [
  { path: '', component: UsuariosComponent },
  {
    path: 'formulario',
    data: {
      preload: true,
    },
    loadComponent: () =>
      import('./formulario/formulario.component').then(
        (c) => c.FormularioComponent
      ),
  },
];
