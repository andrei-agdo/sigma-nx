import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '@sigma-nx/components/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';
import { porcentagens } from '../shared/porcentagem';
import { UsuariosService } from 'apps/sigma/src/app/administrativo/usuarios/shared/usuarios.service';
import { DepartamentosService } from '@sigma-nx/administrativo/departamentos';
import { FornecedorService } from '../../../../fornecedor/shared/fornecedor.service';
import { Acao } from '../../../shared/acoes';

@Component({
  selector: 'sigma-nx-acao-dialog',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './acao-dialog.component.html',
  styles: ['.dialog {width:675px} .body{ padding-top:17px}'],
})
export class AcaoDialogComponent {
  acao: Acao;

  porcentagens = porcentagens;

  responsaveis$ = inject(UsuariosService).get({ ativo: true }, true);

  departamentos$ = inject(DepartamentosService).get();

  fornecedores$ = inject(FornecedorService).get({
    ativo: true,
  }, true);

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { acao?: Acao },
    public dialogRef: MatDialogRef<AcaoDialogComponent, Acao>
  ) {
    this.acao = this.data.acao || {} as Acao;
  }

  salvarAcao(form: FormComponent) {
    if (!form.valid()) return;
    this.dialogRef.close(this.acao);
  }
}
