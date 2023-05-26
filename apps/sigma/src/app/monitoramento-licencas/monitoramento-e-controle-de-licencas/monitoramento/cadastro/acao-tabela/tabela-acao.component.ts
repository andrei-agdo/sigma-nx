import { porcentagens } from './../shared/porcentagem';
import { Component, inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from '@sigma-nx/components/table';
import { MatDialog } from '@angular/material/dialog';
import { Acao } from '../../../shared/acoes';
import { TableComponent } from '@sigma-nx/components/table';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MonitoramentoEControleDeLicencasService } from '../../../shared/monitoramento-e-controle-de-licencas.service';

@Component({
  selector: 'sigma-nx-tabela-acao',
  templateUrl: './tabela-acao.component.html',
  standalone: true,
  styleUrls: ['./tabela-acao.component.scss'],
  imports: [TableModule, MatButtonModule, CommonModule, MatIconModule, MatMenuModule]
})
export class TabelaAcaoComponent {

  @Input({ required: true }) acoes: Acao[] = [];
  @Output() acoesChange = new EventEmitter<Acao[]>();

  porcentagens = porcentagens;

  @ViewChild('table') table: TableComponent;

  matDialog = inject(MatDialog);

  isMobile = false;

  monitoramentoService = inject(MonitoramentoEControleDeLicencasService);

  constructor() {
    if (!this.acoes) this.acoes = [];
    inject(BreakpointObserver)
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  async openAcao(acao?: Acao) {
    const { AcaoDialogComponent } = await import('../acao-dialog/acao-dialog.component');
    const _acoes = structuredClone(this.acoes);

    this.matDialog
      .open(AcaoDialogComponent, {
        data: { acao }
      })
      .afterClosed()
      .subscribe((data) => {
        if (!data) return this.acoes = _acoes;
        if (!acao) this.acoes.push(data);

        this.table.data = this.acoes;
        this.acoesChange.emit(this.acoes);
      });
  }

  alterarPorcetagemConcluido(acao: Acao, porcentagem: number) {
    acao.concluido = porcentagem;
    console.error("Atualizar Porcentagem Conclusao Acao");
    // this.monitoramentoService.atualizarPorcentagemConclusaoAcao();
  }
}
