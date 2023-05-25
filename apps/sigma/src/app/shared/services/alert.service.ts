import { Injectable, Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable()
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  private show(
    mensagem: string = '',
    type: 'success' | 'error' = 'success',
    tempoEmSegundos: number
  ): void {
    this.snackBar.openFromComponent(AlertComponent, {
      duration: (tempoEmSegundos || 3) * 1000,
      data: mensagem,
      panelClass: [type],
      verticalPosition: 'top',
    });
  }

  success(mensagem: string = '', tempoEmSegundos: number = 3): void {
    this.show(mensagem, 'success', tempoEmSegundos);
  }
  error(mensagem: string = '', tempoEmSegundos: number = 3): void {
    this.show(mensagem, 'error', tempoEmSegundos);
  }
}

@Component({
  selector: 'sigma-nx-alert',
  template: `{{ snackBarRef.containerInstance.snackBarConfig.data }}`,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        height: 80px;
        line-height: 80px;
        font-family: Roboto;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0.5px;
        text-align: center;
        border-radius: 4px;
      }
      ::ng-deep {
        .mdc-snackbar__label {
          padding: 0px;
        }
        .success .mdc-snackbar__surface {
          --mdc-snackbar-container-color: #4caf50;
          border-left: 10px #79c37c solid;
        }

        .error .mdc-snackbar__surface {
          --mdc-snackbar-container-color: #ff5252;
          border-left: 10px #ff7d7d solid;
        }
      }
    `,
  ],
})
export class AlertComponent {
  constructor(public snackBarRef: MatSnackBarRef<AlertComponent>) {}
}
