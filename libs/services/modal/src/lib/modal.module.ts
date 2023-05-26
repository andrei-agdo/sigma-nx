import { NgModule } from '@angular/core';
import { ModalService } from './modal.service';
import { MatDialogRef } from '@angular/material/dialog';

@NgModule({
  imports: [],
  providers: [ModalService,MatDialogRef],
})
export class ModalModule { }
