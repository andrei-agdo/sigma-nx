import { LayoutComponent } from '@core/layout/layout.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'controle-requisitos',
        loadChildren: () =>
          import('./controle-requisitos/controle-requisitos.module').then(
            (m) => m.ControleRequisitosModule
          ),
      },
      {
        path: 'monitoramento-licencas',
        loadChildren: () =>
          import('./monitoramento-licencas/monitoramento-licencas.module').then(
            (m) => m.MonitoramentoLicencasModule
          ),
      },
      {
        path: 'sismetro',
        loadChildren: () =>
          import('./sismetro/sismetro.module').then(
            (m) => m.SismetroModule
          ),
      },
      {
        path: 'administrativo',
        loadChildren: () =>
          import('./administrativo/administrativo.module').then(
            (m) => m.AdministrativoModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class SiscomRoutingModule { }
