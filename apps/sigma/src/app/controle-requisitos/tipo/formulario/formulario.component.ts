import { ModalService } from '@shared/components/modal/modal.service';
import { TipoService } from './../shared/tipo.service';
import { load } from '@core/utils/load/load.component';
import { FormComponent } from '@shared/components/form/form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tipo } from './../shared/tipo';
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
    load.show();
    this.tipoService.save(this.tipo).subscribe({
      next: () => {
        load.hide();
        this.modalService.success(
          `Tipo ${!this.tipo.id ? 'cadastrado' : 'editado'} com sucesso`
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
