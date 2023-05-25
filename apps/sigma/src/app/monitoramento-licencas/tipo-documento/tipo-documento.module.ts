import { TipoDocumentoRoutingModule } from './tipo-documento-routing.module';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoDocumentoComponent } from './tipo-documento.component';

@NgModule({
  declarations: [TipoDocumentoComponent],
  imports: [CommonModule, SharedModule, TipoDocumentoRoutingModule],
})
export class TipoDocumentoModule {}
