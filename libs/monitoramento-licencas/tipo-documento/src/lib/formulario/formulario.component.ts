
import { FormComponent } from '@sigma-nx/components/input';
import { ModalService } from '@sigma-nx/services/modal';
import { TipoDocumentoService } from './../shared/tipo-documento.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoDocumento } from './../shared/tipo-documento';
import { FormularioModule } from '@sigma-nx/shared';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'sigma-nx-formulario',
  standalone: true,
  imports: [FormularioModule],
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

    this.tiposDocumentoService.save(this.tipoDocumento).subscribe({
      next: () => {

        this.modalService.success(
          'Tipo de documento ' +
            (!this.tipoDocumento.id ? 'cadastrado' : 'editado') +
            ' com sucesso'
        );
        this.dialogRef.close(true);
      },
      error: (error) => {

        this.modalService.error(error);
      },
    });
  }
}
