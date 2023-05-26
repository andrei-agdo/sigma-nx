import { AmbitoRoutingModule } from './ambito-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmbitoComponent } from './ambito.component';
import { ModalService } from '@sigma-nx/services/modal';
import { SharedModule } from '@sigma-nx/shared';

@NgModule({
  declarations: [AmbitoComponent],
  providers: [ModalService],
  imports: [CommonModule, AmbitoRoutingModule, SharedModule],
})
export class AmbitoModule {}
