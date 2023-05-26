import { ModalService } from '@sigma-nx/services/modal';
import { OrigemService } from './../shared/origem.service';

import { FormComponent } from '@sigma-nx/components/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Origem } from './../shared/origem';
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
  public origem: Origem;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { origem?: Origem },
    public dialogRef: MatDialogRef<FormularioComponent, boolean>,
    private origemService: OrigemService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    if (this.data.origem?.id)
      this.origemService
        .getById(this.data.origem.id)
        .subscribe((origem) => (this.origem = origem));
    else this.origem = {};
  }

  salvarOrigem(form: FormComponent) {
    if (!form.valid()) return;

    this.origemService.save(this.origem).subscribe({
      next: () => {

        this.modalService.success(
          `Origem ${!this.origem.id ? 'cadastrada' : 'editada'} com sucesso`
        );
        this.dialogRef.close(true);
      },
      error: (error) => {

        this.modalService.error(error);
      },
    });
  }
}
