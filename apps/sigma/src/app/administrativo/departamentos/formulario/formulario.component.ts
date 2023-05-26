import { ModalService } from '@shared/components/modal/modal.service';
import { DepartamentosService } from './../shared/departamentos.service';
import { load } from '@core/utils/load/load.component';
import { FormComponent } from '@sigma-nx/components/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Departamento } from '../shared/departamento';
import { Component, Inject } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'sigma-nx-formulario',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  public departamento: Departamento;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { departamento?: Departamento },
    private departamentosService: DepartamentosService,
    public dialogRef: MatDialogRef<FormularioComponent,boolean>,
    private modalService: ModalService
  ) {}

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
    load.show();
    this.departamentosService.save(this.departamento).subscribe({
      next: () => {
        load.hide();
        this.modalService.success(
          'Departamento ' +
            (!this.departamento.id ? 'cadastrado' : 'editado') +
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
