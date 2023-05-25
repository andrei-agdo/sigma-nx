import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemasComponent } from './temas.component';

const routes: Routes = [
  { path: '', component: TemasComponent },
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
export class TemasRoutingModule {}
