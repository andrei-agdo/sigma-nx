import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';
import { FormComponent } from '@shared/components/form/form.component';
import { Base } from '@shared/models/base';
import { Prazo } from '../../../shared/prazos';

@Component({
  selector: 'sigma-nx-prazo-dialog',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './prazo-dialog.component.html'
})
export class PrazoDialogComponent {
  prazo: Prazo;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: {
      prazo: Prazo,
      periodicidade: Base & { day: number },
      anos: number
    },
    public dialogRef: MatDialogRef<PrazoDialogComponent, Prazo>
  ) {
    this.prazo = this.data.prazo || {} as Prazo;

    //TODO: verificar como irá funcionar a periodicidade
    if (this.data.periodicidade.nome == "Outros")
      this.data.periodicidade.day = this.data.anos * 365;

    this.prazo.dataVencimento = new Date(this.prazo.dataExpedicao);
    this.prazo.dataVencimento.setDate(this.prazo.dataVencimento.getDate() + this.data.periodicidade.day);

  }

  setVencimento() {
    this.prazo.dataVencimento = new Date(this.prazo.dataExpedicao);
    this.prazo.dataVencimento.setDate(this.prazo.dataVencimento.getDate() + this.data.periodicidade.day);
  }

  salvarPrazo(form: FormComponent) {
    if (form.valid())
      this.dialogRef.close(this.prazo);
  }

}
