import { UnidadeMedidaRoutingModule } from './unidade-medida-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadeMedidaComponent } from './unidade-medida.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [UnidadeMedidaComponent],
  imports: [CommonModule, SharedModule, UnidadeMedidaRoutingModule],
})
export class UnidadeMedidaModule {}
