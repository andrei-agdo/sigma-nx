import { ModalService } from '@sigma-nx/services/modal';
import { DepartamentosService } from './../shared/departamentos.service';
import { FormComponent } from '@sigma-nx/components/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Departamento } from '../shared/departamento';
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
  public departamento: Departamento;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { departamento?: Departamento },
    private departamentosService: DepartamentosService,
    public dialogRef: MatDialogRef<FormularioComponent, boolean>,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    if (this.data.departamento?.id)
      this.departamentosService
        .getById(this.data.departamento.id)
        .subscribe((departamento) => (this.departamento = departamento));
    else this.departamento = {
      codigo: '',
    };
  }

  salvarDepartamento(form: FormComponent) {
    if (!form.valid()) return;
    this.departamentosService.save(this.departamento).subscribe({
      next: () => {
        this.modalService.success(
          'Departamento ' +
          (!this.departamento.id ? 'cadastrado' : 'editado') +
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
