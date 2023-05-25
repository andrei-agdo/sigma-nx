import { ModalService } from '@shared/components/modal/modal.service';
import { OrigemService } from './../shared/origem.service';
import { load } from '@core/utils/load/load.component';
import { FormComponent } from '@shared/components/form/form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Origem } from './../shared/origem';
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
    load.show();
    this.origemService.save(this.origem).subscribe({
      next: () => {
        load.hide();
        this.modalService.success(
          `Origem ${!this.origem.id ? 'cadastrada' : 'editada'} com sucesso`
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
