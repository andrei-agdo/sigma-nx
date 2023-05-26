import { TipoRoutingModule } from './tipo-routing.module';
import { SharedModule } from '@sigma-nx/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoComponent } from './tipo.component';


@NgModule({
  declarations: [TipoComponent],
  imports: [CommonModule, TipoRoutingModule, SharedModule],
})
export class TipoModule {}
