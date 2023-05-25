import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { FornecedorComponent } from './fornecedor.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: FornecedorComponent },
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
  declarations: [FornecedorComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class FornecedorModule {}
