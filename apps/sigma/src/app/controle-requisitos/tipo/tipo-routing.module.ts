import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoComponent } from './tipo.component';

const routes: Routes = [
  { path: '', component: TipoComponent },
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoRoutingModule {}
