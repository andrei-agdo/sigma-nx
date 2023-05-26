import { SharedModule } from '@sigma-nx/shared';
import { OrgaoControleRoutingModule } from './orgao-controle-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgaoControleComponent } from './orgao-controle.component';
import { ModalService } from '@sigma-nx/services/modal';

@NgModule({
  declarations: [OrgaoControleComponent],
  providers: [ModalService],
  imports: [CommonModule, SharedModule, OrgaoControleRoutingModule],
})
export class OrgaoControleModule {}
