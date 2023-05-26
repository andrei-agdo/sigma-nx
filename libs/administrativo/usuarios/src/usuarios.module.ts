import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { SharedModule } from '@sigma-nx/shared';
import { ModalService } from '@sigma-nx/services/modal';


@NgModule({
  declarations: [UsuariosComponent],
  providers: [ModalService],
  imports: [CommonModule, UsuariosRoutingModule,
    SharedModule],
})
export class UsuariosModule { }
