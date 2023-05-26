import { FormComponent } from '@sigma-nx/components/input';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, inject } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RequisitoLegal } from '../shared/requisito-legal';
import { load } from '@core/utils/load/load.component';
import { ModalService } from '@sigma-nx/services/modal';
import { RequisitoLegalService } from '../shared/requisito-legal.service';

@Component({
  selector: 'sigma-nx-formulario',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './select-data.component.html',
  styleUrls: ['./select-data.component.scss'],
})
export class SelectDataComponent {
  public data: Date;

  modalService = inject(ModalService);

  constructor(
    @Inject(MAT_DIALOG_DATA) private requisitosLegais: RequisitoLegal[],
    public dialogRef: MatDialogRef<SelectDataComponent>,
    private requisitoLegalService: RequisitoLegalService) { }

  selectData(form: FormComponent) {
    if (!form.valid()) return;

    load.show();
    this.requisitoLegalService
      .atualizarDataAnalise(this.data, this.requisitosLegais)
      .subscribe({
        next: () => {
          load.hide();
          this.modalService.success('Requisitos Legais atualizados com sucesso');
          this.dialogRef.close();
        },
        error: () => {
          load.hide();
          this.modalService.error(
            `Erro ao atualizar Requisitos Legais`
          );
        },
      });
  }
}
