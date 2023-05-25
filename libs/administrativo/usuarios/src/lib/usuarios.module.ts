import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosComponent } from './usuarios.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
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

@NgModule({
  declarations: [UsuariosComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class UsuariosModule { }
