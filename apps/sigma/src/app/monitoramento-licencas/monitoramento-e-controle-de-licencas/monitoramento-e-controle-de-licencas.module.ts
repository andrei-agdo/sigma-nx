import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MonitoramentoControleLicencaComponent } from './lista/monitoramento-e-controle-de-licencas.component';
import { SharedModule } from '@shared/shared.module';
import { TabelaAcoesComponent } from './lista/tabela-acoes/tabela-acoes.component';


const routes: Routes = [
  {
    path: '', component: MonitoramentoControleLicencaComponent
  },
  {
    path: 'novo',
    data: {
      preload: true
    },
    loadComponent: () =>
      import('./monitoramento/cadastro/cadastro.component').then(c => c.FormularioComponent)
  },
  {
    path: ':monitoramentoId',
    loadComponent: () => import('./monitoramento/monitoramento.component').then(c => c.MonitoramentoComponent),
    children: [
      {
        path: 'editar',
        loadComponent: () =>
          import('./monitoramento/cadastro/cadastro.component').then(c => c.FormularioComponent)
      },
      {
        path: 'historico',
        loadComponent: () => import('./monitoramento/historico/historico.component').then(c => c.HistoricoComponent)
      },
      {
        path: 'arquivos',
        loadComponent: () => import('./monitoramento/arquivos/arquivos.component').then(c => c.ArquivosComponent)
      },
    ]
  },
];

@NgModule({
  declarations: [MonitoramentoControleLicencaComponent, TabelaAcoesComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class MonitoramentoEControleDeLicencasModule { }
