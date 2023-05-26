import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

import { load } from '@core/utils/load/load.component';
import { ModalService } from '@sigma-nx/services/modal';
import { AmbitoService } from '../shared/ambito.service';
import { FormComponent } from '@sigma-nx/components/input';
import { Ambito } from '../shared/ambito';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'sigma-nx-formulario',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  public ambito: Ambito;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { ambito?: Ambito },
    private dialogRef: MatDialogRef<FormularioComponent, boolean>,
    private ambitoService: AmbitoService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    if (this.data.ambito?.id)
      this.ambitoService
        .getById(this.data.ambito.id)
        .subscribe((ambito) => (this.ambito = ambito));
    else this.ambito = {};
  }

  salvarAmbito(form: FormComponent) {
    if (!form.valid()) return;
    load.show();
    this.ambitoService.save(this.ambito).subscribe({
      next: () => {
        load.hide();
        this.modalService.success(
          `Âmbito ${!this.ambito.id ? 'cadastrado' : 'editado'} com sucesso`
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
