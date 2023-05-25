import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'monitoramento-e-controle-de-licencas',
    title: 'Monitoramento e Controle de Licenças',
    loadChildren: () =>
      import(
        './monitoramento-e-controle-de-licencas/monitoramento-e-controle-de-licencas.module'
      ).then((m) => m.MonitoramentoEControleDeLicencasModule),
  },
  {
    path: 'fornecedores',
    title: 'Fornecedores',
    loadChildren: () =>
      import('./fornecedor/fornecedor.module').then((m) => m.FornecedorModule),
  },
  {
    path: 'orgao-de-controle',
    title: 'Órgão de Controle',
    loadChildren: () =>
      import('./orgao-controle/orgao-controle.module').then(
        (m) => m.OrgaoControleModule
      ),
  },
  {
    path: 'tipo-documento',
    title: 'Tipo de Documento',
    loadChildren: () =>
      import('./tipo-documento/tipo-documento.module').then(
        (m) => m.TipoDocumentoModule
      ),
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MonitoramentoLicencasModule {}
