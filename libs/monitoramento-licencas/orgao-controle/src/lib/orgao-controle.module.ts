import { SharedModule } from '@sigma-nx/shared';
import { OrgaoControleRoutingModule } from './orgao-controle-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgaoControleComponent } from './orgao-controle.component';


@NgModule({
  declarations: [OrgaoControleComponent],
  imports: [CommonModule, SharedModule, OrgaoControleRoutingModule],
})
export class OrgaoControleModule {}
