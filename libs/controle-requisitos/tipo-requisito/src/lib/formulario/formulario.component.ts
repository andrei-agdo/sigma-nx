import { ModalService } from '@sigma-nx/services/modal';
import { TipoService } from './../shared/tipo.service';

import { FormComponent } from '@sigma-nx/components/input';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tipo } from './../shared/tipo';
import { Component, Inject } from '@angular/core';
import { FormularioModule } from '@sigma-nx/shared';

@Component({
  selector: 'sigma-nx-formulario',
  standalone: true,
  imports: [FormularioModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  public tipo: Tipo;

  constructor(
    public dialogRef: MatDialogRef<FormularioComponent,boolean>,
    @Inject(MAT_DIALOG_DATA) readonly data: { tipo?: Tipo },
    private tipoService: TipoService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    if (this.data.tipo?.id)
      this.tipoService
        .getById(this.data.tipo.id)
        .subscribe((tipo) => (this.tipo = tipo));
    else this.tipo = {};
  }

  salvarTipo(form: FormComponent) {
    if (!form.valid()) return;

    this.tipoService.save(this.tipo).subscribe({
      next: () => {

        this.modalService.success(
          `Tipo ${!this.tipo.id ? 'cadastrado' : 'editado'} com sucesso`
        );
        this.dialogRef.close(true);
      },
      error: (error) => {

        this.modalService.error(error);
      },
    });
  }
}
