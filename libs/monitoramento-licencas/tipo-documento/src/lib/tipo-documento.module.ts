import { TipoDocumentoRoutingModule } from './tipo-documento-routing.module';
import { SharedModule } from '@sigma-nx/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoDocumentoComponent } from './tipo-documento.component';
import { ModalService } from '@sigma-nx/services/modal';

@NgModule({
  declarations: [TipoDocumentoComponent],
  providers: [ModalService],
  imports: [CommonModule, SharedModule, TipoDocumentoRoutingModule],
})
export class TipoDocumentoModule {}
