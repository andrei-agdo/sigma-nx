import { TablePagination } from '@sigma-nx/components/table';
import { load } from '@core/utils/load/load.component';
import { Filter } from '@sigma-nx/shared';
import { Component, inject } from '@angular/core';
import { MonitoramentoEControleDeLicenca } from '../shared/monitoramento-e-controle-de-licencas';
import { MonitoramentoEControleDeLicencasService } from '../shared/monitoramento-e-controle-de-licencas.service';
import { MonitoramentoEControleDeLicencaSimplificado } from '../shared/monitoramento-e-controle-de-licencas-simplificado';
import { MonitoramentoFacade } from '../shared/monitoramento.facade';

@Component({
  templateUrl: './monitoramento-e-controle-de-licencas.component.html',
  styleUrls: ['./monitoramento-e-controle-de-licencas.component.scss'],
})
export class MonitoramentoControleLicencaComponent extends MonitoramentoFacade {
  public filter: Filter & Partial<MonitoramentoEControleDeLicencaSimplificado> & Partial<MonitoramentoEControleDeLicenca> & {
    dataUltimaAtualizacao?: Date;
    diasParaVencimento?: number;
    data?: Date;
  } =
    {
      eDecrescente: false,
      itensPorPagina: 10,
      pagina: 0,
      ativo: true,
    };

  public page: TablePagination = {
    pageIndex: 0,
    pageSize: 10,
  };

  public monitoramentoControleLicencas: MonitoramentoEControleDeLicencaSimplificado[];

  private monitoramentoService = inject(MonitoramentoEControleDeLicencasService)

  ngOnInit(): void {
    this.getMonitoramentoControleLicencas();
  }

  exportAsExcel() {
    alert("exportAsExcel");
   }

  getMonitoramentoControleLicencas(resetPage = false) {
    if (resetPage) this.filter.pagina = 0;

    load.show();

    this.monitoramentoService
      .get(this.filter)
      .subscribe((monitoramentoControleLicencas) => {
        this.monitoramentoControleLicencas = monitoramentoControleLicencas;
        load.hide();
      });
  }

  changeStatus(MonitoramentoControleLicenca: MonitoramentoEControleDeLicenca) {
    load.show();
    this.monitoramentoService
      .atualizarAtivo(MonitoramentoControleLicenca)
      .subscribe(() => load.hide());
  }

  changePage(page: TablePagination) {
    this.filter.pagina = page.pageIndex;
    this.filter.itensPorPagina = page.pageSize;
    this.getMonitoramentoControleLicencas();
  }

  sortBy(prop: string) {
    if (this.filter.ordenarPor === prop && this.filter.eDecrescente) {
      this.filter.ordenarPor = '';
      this.filter.eDecrescente = false;
    } else {
      this.filter.eDecrescente =
        this.filter.ordenarPor === prop ? !this.filter.eDecrescente : false;
      this.filter.ordenarPor = prop;
    }
    this.getMonitoramentoControleLicencas();
  }
}
