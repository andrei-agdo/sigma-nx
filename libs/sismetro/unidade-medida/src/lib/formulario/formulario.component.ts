
import { FormComponent } from '@sigma-nx/components/input';
import { ModalService } from '@sigma-nx/services/modal';
import { UnidadeMedidaService } from './../shared/unidade-medida.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UnidadeMedida } from './../shared/unidade-medida';
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
  public unidadeMedida: UnidadeMedida;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { unidadeMedida?: UnidadeMedida },
    private unidadeMedidaService: UnidadeMedidaService,
    public dialogRef: MatDialogRef<FormularioComponent, boolean>,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    if (this.data.unidadeMedida?.id)
      this.unidadeMedidaService
        .getById(this.data.unidadeMedida.id)
        .subscribe((unidadeMedida) => (this.unidadeMedida = unidadeMedida));
    else this.unidadeMedida = {};
  }

  salvarUnidadeMedida(form: FormComponent) {
    if (form.valid()) {

      this.unidadeMedidaService.save(this.unidadeMedida).subscribe({
        next: () => {

          this.modalService.success(
            'Unidade de medida ' +
              (!this.unidadeMedida.id ? 'cadastrada' : 'editada') +
              ' com sucesso'
          );
          this.dialogRef.close(true);
        },
        error: () => {

          this.modalService.error('Unidade de medida já cadastrada');
        },
      });

    }
  }
}
