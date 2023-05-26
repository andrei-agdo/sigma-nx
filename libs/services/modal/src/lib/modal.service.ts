import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable()
export class ModalService {
  constructor(private matDialog: MatDialog) { }

  success(message: string) {
    queueMicrotask(() => {
      this.matDialog.open(ModalComponent, {
        data: {
          message,
          image: 'success',
        },
      });
    });
  }

  error(message: string) {
    queueMicrotask(() => {
      this.matDialog.open(ModalComponent, {
        data: {
          message,
          image: 'error',
        },
      });
    });
  }
}
