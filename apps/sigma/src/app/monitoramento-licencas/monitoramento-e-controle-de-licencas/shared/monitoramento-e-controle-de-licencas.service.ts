import { MonitoramentoEControleDeLicenca } from './monitoramento-e-controle-de-licencas';
import { Injectable } from '@angular/core';

import { of, map, BehaviorSubject } from 'rxjs';
import { MonitoramentoEControleDeLicencaSimplificado } from './monitoramento-e-controle-de-licencas-simplificado';
import { CrudMockService } from '@core/services/crud.mock.service';

@Injectable({
  providedIn: 'root',
})
export class MonitoramentoEControleDeLicencasService extends CrudMockService<
  MonitoramentoEControleDeLicenca,
  MonitoramentoEControleDeLicencaSimplificado
> {

  monitoramento: BehaviorSubject<MonitoramentoEControleDeLicenca>;
  constructor() {
    super('/monitoramento-controle-de-licencas');
    this.clearMonitoramento()
  }

  create(item: MonitoramentoEControleDeLicenca) {
    return this.http.post<MonitoramentoEControleDeLicenca>('/monitoramento-controle-de-licencas', item).pipe(map((x) => {
      return x._id
    }))
  }

  clearMonitoramento() {
    this.monitoramento = new BehaviorSubject<MonitoramentoEControleDeLicenca>({
      empresaId: '',
      legislacaoAplicada: [],
      ativo: true,
      prazos: [],
      acoes: [],
    });

  }

  getReferencias() {
    return of([
      {
        id: '1',
        nome: 'Controle de Licença',
      },
      {
        id: '2',
        nome: 'Plano de Monitoramento',
      },
    ]);
  }

  getDocumentos() {
    return of([
      {
        id: '1',
        nome: 'Documento 1',
      },
      {
        id: '2',
        nome: 'Documento 2',
      },
    ]);
  }

  getEmpresas() {
    return of([
      {
        id: '1',
        nome: 'Cebrace',
      },
      {
        id: '2',
        nome: 'Fornecedor',
      },
    ]);
  }

  getVencimento() {
    return of([
      {
        id: '1',
        nome: 'Indeterminado',
      },
      {
        id: '2',
        nome: 'Por Prazo',
      },
      {
        id: '3',
        nome: 'Obsoleto',
      },
    ]);
  }

  getPeriodicidades() {
    return of([
      {
        id: '1',
        nome: 'Diário',
        day: 1
      },
      {
        id: '2',
        nome: 'Semanal',
        day: 7
      },
      {
        id: '3',
        nome: 'Quinzenal',
        day: 15
      },
      {
        id: '4',
        nome: 'Mensal',
        day: 30
      },
      {
        id: '5',
        nome: 'Bimestral',
        day: 60
      },
      {
        id: '6',
        nome: 'Trimestral',
        day: 90
      },
      {
        id: '7',
        nome: 'Quadrimestral',
        day: 120
      },
      {
        id: '8',
        nome: 'Semestral',
        day: 180
      },
      {
        id: '9',
        nome: 'Anual',
        day: 365
      },
      {
        id: '10',
        nome: 'Bienal',
        day: 730
      },
      {
        id: '11',
        nome: 'Outros',
        day: 0
      },
    ]);
  }
}
