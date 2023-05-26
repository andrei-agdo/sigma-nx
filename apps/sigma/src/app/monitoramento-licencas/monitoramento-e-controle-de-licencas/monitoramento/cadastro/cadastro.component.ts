import { MonitoramentoEControleDeLicencasService } from '../../shared/monitoramento-e-controle-de-licencas.service';
import { Component, OnInit, inject } from '@angular/core';
import { MonitoramentoEControleDeLicenca } from '../../shared/monitoramento-e-controle-de-licencas';
import { Router, RouterModule } from '@angular/router';
import { FormComponent } from '@sigma-nx/components/input';

import { MonitoramentoFacade } from '../../shared/monitoramento.facade';
import { SharedModule } from '@shared/shared.module';
import { LegislacaoAplicadaComponent } from './legislacao-aplicada/legislacao-aplicada.component';
import { TabelaPrazoComponent } from './prazo-tabela/tabela-prazo.component';
import { TabelaAcaoComponent } from './acao-tabela/tabela-acao.component';
import { load } from '@core/utils/load/load.component';
import { Tema } from '@sigma-nx/administrativo/temas';

@Component({
  selector: 'sigma-nx-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  standalone: true,
  imports: [SharedModule, LegislacaoAplicadaComponent, RouterModule, TabelaPrazoComponent, TabelaAcaoComponent],
})
export class FormularioComponent extends MonitoramentoFacade implements OnInit {
  monitoramentoControleLicenca: MonitoramentoEControleDeLicenca;

  private monitoramentoService = inject(MonitoramentoEControleDeLicencasService)
  private router = inject(Router);

  ngOnInit(): void {
    this.monitoramentoService.monitoramento.subscribe((monitoramento) => {
      this.monitoramentoControleLicenca = monitoramento;
    });
  }

  selectTema(tema: Tema) {
    this.monitoramentoControleLicenca.numeroPasta = tema.numeroPasta;
  }

  public vencimentoPorPrazo = false;

  atualizaVencimento() {
    // verificar se o vencimento é por prazo com o back
    this.vencimentoPorPrazo = this.monitoramentoControleLicenca.vencimento?.nome === "Por Prazo"


  }

  createMonitoramentoControleLicenca(form: FormComponent) {
    if (!form.valid()) return;

    this.monitoramentoService.create(this.monitoramentoControleLicenca).subscribe((id) => {
      this.monitoramentoControleLicenca.id = id;
      this.monitoramentoService.monitoramento.next(this.monitoramentoControleLicenca);
      this.router.navigateByUrl(`/monitoramento-licencas/monitoramento-e-controle-de-licencas/${id}/editar`)
    })
  }

  salvarMonitoramentoControleLicenca(form: FormComponent) {
    load.show();
    if (!form.valid()) return;
    this.monitoramentoService
      .save(this.monitoramentoControleLicenca)
      .subscribe(() => {
        load.hide();
        this.modalService.success('Monitoramento salvo com sucesso');
        this.router.navigateByUrl('/monitoramento-licencas/monitoramento-e-controle-de-licencas');
      })
  }
}
