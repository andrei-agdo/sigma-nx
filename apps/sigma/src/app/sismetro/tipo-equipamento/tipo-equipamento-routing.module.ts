import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoEquipamentoComponent } from './tipo-equipamento.component';

const routes: Routes = [
  { path: '', component: TipoEquipamentoComponent },
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
export class TipoEquipamentoRoutingModule {}
