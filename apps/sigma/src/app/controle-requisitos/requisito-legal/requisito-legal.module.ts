import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisitoLegalComponent } from './requisito-legal.component';
import { RequisitoLegalService } from './shared/requisito-legal.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: RequisitoLegalComponent },
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
  {
    path: 'formulario/:id',
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
  declarations: [RequisitoLegalComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  providers: [RequisitoLegalService],
})
export class RequisitoLegalModule { }
