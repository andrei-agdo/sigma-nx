import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'requisito-legal',
    title: 'Requisito Legal',
    loadChildren: () =>
      import('./requisito-legal/requisito-legal.module').then(
        (m) => m.RequisitoLegalModule
      ),
  },
  {
    path: 'tipo',
    title: 'Tipo requisito legal',
    loadChildren: () => import('@sigma-nx/controle-requisitos/tipo-requisito').then((m) => m.TipoModule),
  },
  {
    path: 'origem',
    title: 'Origem',
    loadChildren: () =>
      import('@sigma-nx/controle-requisitos/origem').then((m) => m.OrigemModule),
  },
  {
    path: 'aplicabilidade',
    title: 'Aplicabilidade',
    loadChildren: () =>
      import('@sigma-nx/controle-requisitos/aplicabilidade').then(
        (m) => m.AplicabilidadeModule
      ),
  },
  {
    path: 'ambito',
    title: 'Âmbito',
    loadChildren: () =>
      import('@sigma-nx/controle-requisitos/ambito').then((m) => m.AmbitoModule),
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ControleRequisitosModule { }
