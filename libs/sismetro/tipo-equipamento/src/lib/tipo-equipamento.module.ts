import { TipoEquipamentoRoutingModule } from './tipo-equipamento-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoEquipamentoComponent } from './tipo-equipamento.component';
import { SharedModule } from '@sigma-nx/shared';

import { ModalService } from '@sigma-nx/services/modal';
@NgModule({
  declarations: [TipoEquipamentoComponent],
  providers: [ModalService],
  imports: [CommonModule, SharedModule, TipoEquipamentoRoutingModule],
})
export class TipoEquipamentoModule {}
