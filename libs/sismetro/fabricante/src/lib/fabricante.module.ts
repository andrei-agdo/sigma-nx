import { SharedModule } from '@sigma-nx/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabricanteComponent } from './fabricante.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ModalService } from '@sigma-nx/services/modal';

const routes: Routes = [
  { path: '', component: FabricanteComponent },
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
  declarations: [FabricanteComponent],
  providers: [ModalService],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes), NgxMaskModule.forRoot()],
})
export class FabricanteModule {}
