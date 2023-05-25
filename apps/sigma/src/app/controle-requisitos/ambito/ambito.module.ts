import { AmbitoRoutingModule } from './ambito-routing.module';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmbitoComponent } from './ambito.component';

@NgModule({
  declarations: [AmbitoComponent],
  imports: [CommonModule, AmbitoRoutingModule, SharedModule],
})
export class AmbitoModule {}
