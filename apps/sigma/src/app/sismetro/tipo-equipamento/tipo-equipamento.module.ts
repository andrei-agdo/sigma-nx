import { TipoEquipamentoRoutingModule } from './tipo-equipamento-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoEquipamentoComponent } from './tipo-equipamento.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [TipoEquipamentoComponent],
  imports: [CommonModule, SharedModule, TipoEquipamentoRoutingModule],
})
export class TipoEquipamentoModule {}
