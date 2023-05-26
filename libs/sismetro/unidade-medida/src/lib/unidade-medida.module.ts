import { UnidadeMedidaRoutingModule } from './unidade-medida-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadeMedidaComponent } from './unidade-medida.component';
import { SharedModule } from '@sigma-nx/shared';



@NgModule({
  declarations: [UnidadeMedidaComponent],
  imports: [CommonModule, SharedModule, UnidadeMedidaRoutingModule],
})
export class UnidadeMedidaModule {}
