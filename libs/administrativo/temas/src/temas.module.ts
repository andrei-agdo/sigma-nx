import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemasRoutingModule } from './temas-routing.module';
import { TemasComponent } from './temas.component';
import { SharedModule } from '@sigma-nx/shared';


@NgModule({
  declarations: [
    TemasComponent
  ],
  imports: [
    CommonModule,
    TemasRoutingModule,
    SharedModule
  ]
})
export class TemasModule { }
