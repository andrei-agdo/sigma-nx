import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'tipo-equipamento',
    title: 'Tipo de Equipamento',
    loadChildren: () =>
      import('@sigma-nx/sismetro/tipo-equipamento').then(
        (m) => m.TipoEquipamentoModule
      ),
  },
  {
    path: 'fabricante',
    title: 'Fabricante',
    loadChildren: () =>
      import('@sigma-nx/sismetro/fabricante').then((m) => m.FabricanteModule),
  },
  {
    path: 'unidade-medida',
    title: 'Unidade de Medida',
    loadChildren: () =>
      import('@sigma-nx/sismetro/unidade-medida').then(
        (m) => m.UnidadeMedidaModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SismetroModule {}
