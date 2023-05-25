import { load } from '@core/utils/load/load.component';
import { FormComponent } from '@shared/components/form/form.component';
import { ModalService } from '@shared/components/modal/modal.service';
import { TipoDocumentoService } from './../shared/tipo-documento.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoDocumento } from './../shared/tipo-documento';
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
  public tipoDocumento: TipoDocumento;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { tipoDocumento?: TipoDocumento },
    private tiposDocumentoService: TipoDocumentoService,
    public dialogRef: MatDialogRef<FormularioComponent, boolean>,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    if (this.data.tipoDocumento?.id)
      this.tiposDocumentoService
        .getById(this.data.tipoDocumento.id)
        .subscribe((tipoDocumento) => (this.tipoDocumento = tipoDocumento));
    else this.tipoDocumento = {};
  }

  salvarTipoDocumento(form: FormComponent) {
    if (!form.valid()) return;
    load.show();
    this.tiposDocumentoService.save(this.tipoDocumento).subscribe({
      next: () => {
        load.hide();
        this.modalService.success(
          'Tipo de documento ' +
            (!this.tipoDocumento.id ? 'cadastrado' : 'editado') +
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
