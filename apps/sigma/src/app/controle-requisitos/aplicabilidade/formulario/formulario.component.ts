import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ModalService } from '@sigma-nx/services/modal';
import { AplicabilidadeService } from '../shared/aplicabilidade.service';
import { load } from '@core/utils/load/load.component';
import { FormComponent } from '@sigma-nx/components/input';
import { Aplicabilidade } from './../shared/aplicabilidade';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'sigma-nx-formulario',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  public aplicabilidade: Aplicabilidade;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { aplicabilidade?: Aplicabilidade },
    public dialogRef: MatDialogRef<FormularioComponent, boolean>,
    private aplicabilidadeService: AplicabilidadeService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    if (this.data.aplicabilidade?.id)
      this.aplicabilidadeService
        .getById(this.data.aplicabilidade.id)
        .subscribe((aplicabilidade) => (this.aplicabilidade = aplicabilidade));
    else this.aplicabilidade = {};
  }

  salvarAplicabilidade(form: FormComponent) {
    if (!form.valid()) return;
    load.show();
    this.aplicabilidadeService.save(this.aplicabilidade).subscribe({
      next: () => {
        load.hide();
        this.modalService.success(
          `Aplicabilidade ${
            !this.aplicabilidade.id ? 'cadastrada' : 'editada'
          } com sucesso`
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
