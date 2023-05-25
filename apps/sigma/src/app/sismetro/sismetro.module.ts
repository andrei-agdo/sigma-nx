import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'tipo-equipamento',
    title: 'Tipo de Equipamento',
    loadChildren: () =>
      import('./tipo-equipamento/tipo-equipamento.module').then(
        (m) => m.TipoEquipamentoModule
      ),
  },
  {
    path: 'fabricante',
    title: 'Fabricante',
    loadChildren: () =>
      import('./fabricante/fabricante.module').then((m) => m.FabricanteModule),
  },
  {
    path: 'unidade-medida',
    title: 'Unidade de Medida',
    loadChildren: () =>
      import('./unidade-medida/unidade-medida.module').then(
        (m) => m.UnidadeMedidaModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SismetroModule {}
