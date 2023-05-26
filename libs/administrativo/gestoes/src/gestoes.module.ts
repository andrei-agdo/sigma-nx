import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestoesRoutingModule } from './gestoes-routing.module';
import { GestoesComponent } from './gestoes.component';
import { SharedModule } from '@sigma-nx/shared';


@NgModule({
  declarations: [GestoesComponent],
  imports: [CommonModule, GestoesRoutingModule,
    SharedModule],
})
export class GestoesModule { }
