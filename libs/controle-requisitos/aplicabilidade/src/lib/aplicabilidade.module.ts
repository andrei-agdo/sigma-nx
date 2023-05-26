import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@sigma-nx/shared';
import { AplicabilidadeRoutingModule } from './aplicabilidade-routing.module';
import { AplicabilidadeComponent } from './aplicabilidade.component';


@NgModule({
  declarations: [AplicabilidadeComponent],
  imports: [CommonModule, AplicabilidadeRoutingModule, SharedModule],
})
export class AplicabilidadeModule {}
