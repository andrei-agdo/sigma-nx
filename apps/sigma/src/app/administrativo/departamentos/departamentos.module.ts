import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { DepartamentosComponent } from './departamentos.component';

@NgModule({
  declarations: [
    DepartamentosComponent
  ],
  imports: [
    CommonModule,
    DepartamentosRoutingModule,
    SharedModule
  ]
})
export class DepartamentosModule { }
