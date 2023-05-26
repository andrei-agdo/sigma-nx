import { AmbitoRoutingModule } from './ambito-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmbitoComponent } from './ambito.component';

import { SharedModule } from '@sigma-nx/shared';

@NgModule({
  declarations: [AmbitoComponent],
  imports: [CommonModule, AmbitoRoutingModule, SharedModule],
})
export class AmbitoModule {}
