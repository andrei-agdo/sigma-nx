import { ModalService } from '@shared/components/modal/modal.service';
import { GestoesService } from './../shared/gestoes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { load } from '@core/utils/load/load.component';
import { Gestao } from '../shared/gestao';
import { Component, Inject } from '@angular/core';
import { FormComponent } from '@sigma-nx/components/input';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'sigma-nx-formulario',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  public gestao: Gestao;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { gestao?: Gestao },
    public dialogRef: MatDialogRef<FormularioComponent, boolean>,
    private gestaoService: GestoesService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    if (this.data.gestao?.id)
      this.gestaoService
        .getById(this.data.gestao.id)
        .subscribe((gestao) => (this.gestao = gestao));
    else this.gestao = {};
  }

  salvarGestao(form: FormComponent) {
    if (!form.valid()) return;
    load.show();
    this.gestaoService.save(this.gestao).subscribe({
      next: () => {
        load.hide();
        this.modalService.success(
          'Gestão ' +
          (!this.gestao.id ? 'cadastrada' : 'editada') +
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
