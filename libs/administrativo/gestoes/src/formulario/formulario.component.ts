import { GestoesService } from './../shared/gestoes.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Gestao } from '../shared/gestao';
import { Component, Inject } from '@angular/core';
import { FormComponent } from '@sigma-nx/components/input';
import { ModalService } from '@sigma-nx/services/modal';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'sigma-nx-formulario',
  standalone: true,
  imports: [FormComponent, MatDialogModule, MatSlideToggleModule, FormsModule, MatIconModule, NgIf],
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
    this.gestaoService.save(this.gestao).subscribe({
      next: () => {
        this.modalService.success(
          'Gestão ' +
          (!this.gestao.id ? 'cadastrada' : 'editada') +
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
