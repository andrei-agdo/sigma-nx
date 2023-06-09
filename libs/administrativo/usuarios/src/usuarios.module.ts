import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { SharedModule } from '@sigma-nx/shared';



@NgModule({
  declarations: [UsuariosComponent],
  imports: [CommonModule, UsuariosRoutingModule,
    SharedModule],
})
export class UsuariosModule { }
