import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { DepartamentosComponent } from './departamentos.component';

import {MatSliderModule} from '@angular/material/slider';
import { SharedModule } from '@sigma-nx/shared';

@NgModule({
  declarations: [
    DepartamentosComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    DepartamentosRoutingModule,
    SharedModule
  ]
})
export class DepartamentosModule { }
