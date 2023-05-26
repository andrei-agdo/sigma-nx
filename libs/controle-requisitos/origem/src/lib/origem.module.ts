import { OrigemRoutingModule } from './origem-routing.module';
import { SharedModule } from '@sigma-nx/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrigemComponent } from './origem.component';
import { ModalService } from '@sigma-nx/services/modal';

@NgModule({
  declarations: [OrigemComponent],
  providers: [ModalService],
  imports: [CommonModule, OrigemRoutingModule, SharedModule],
})
export class OrigemModule {}
