import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'usuarios',
    title: 'Usuários',
    loadChildren: () =>
      import('@sigma-nx/administrativo/usuarios').then((m) => m.UsuariosModule),
  },
  {
    path: 'gestoes',
    title: 'Gestões',
    loadChildren: () =>
      import('./gestoes/gestoes.module').then((m) => m.GestoesModule),
  },
  {
    path: 'departamentos',
    title: 'Departamentos',
    loadChildren: () =>
      import('@sigma-nx/administrativo/departamentos').then(
        (m) => m.DepartamentosModule
      ),
  },
  {
    path: 'temas',
    title: 'Temas',
    loadChildren: () =>
      import('./temas/temas.module').then((m) => m.TemasModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AdministrativoModule {}
