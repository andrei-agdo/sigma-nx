import { load } from '@core/utils/load/load.component';
import { FormComponent } from '@shared/components/form/form.component';
import { ModalService } from '@shared/components/modal/modal.service';
import { TipoEquipamentoService } from './../shared/tipo-equipamento.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoEquipamento } from './../shared/tipo-equipamento';
import { SharedModule } from '@shared/shared.module';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'sigma-nx-formulario',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  public tipoEquipamento: TipoEquipamento;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly data: { tipoEquipamento?: TipoEquipamento },
    private tipoEquipamentoService: TipoEquipamentoService,
    public dialogRef: MatDialogRef<FormularioComponent, boolean>,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    if (this.data.tipoEquipamento?.id)
      this.tipoEquipamentoService
        .getById(this.data.tipoEquipamento.id)
        .subscribe(
          (tipoEquipamento) => (this.tipoEquipamento = tipoEquipamento)
        );
    else this.tipoEquipamento = {};
  }

  salvarTipoEquipamento(form: FormComponent) {
    if (!form.valid()) return;
    load.show();
    this.tipoEquipamentoService.save(this.tipoEquipamento).subscribe({
      next: () => {
        load.hide();
        this.modalService.success(
          'Tipo de equipamento ' +
            (!this.tipoEquipamento.id ? 'cadastrado' : 'editado') +
            ' com sucesso'
        );
        this.dialogRef.close(true);
      },
      error: (error) => {
        load.hide();
        this.modalService.error(error);
      },
    });
  }
}
