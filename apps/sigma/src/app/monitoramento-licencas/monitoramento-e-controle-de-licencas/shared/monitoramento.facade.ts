import { TemasService } from '@sigma-nx/administrativo/temas';
import { inject } from '@angular/core';
import { MonitoramentoEControleDeLicencasService } from './monitoramento-e-controle-de-licencas.service';
import { GestoesService } from '@sigma-nx/administrativo/gestoes';
import { ModalService } from '@sigma-nx/services/modal';
import { UsuariosService } from '@sigma-nx/administrativo/usuarios';
import { FornecedorService } from '@sigma-nx/monitoramento-licencas/fornecedor';
import { OrgaoControleService } from '@sigma-nx/monitoramento-licencas/orgao-controle';
import { TipoDocumentoService } from '@sigma-nx/monitoramento-licencas/tipo-documento';


export class MonitoramentoFacade {
  readonly temas$ = inject(TemasService).get({
    ativo: true,
  }, true);

  readonly responsaveis$ = inject(UsuariosService).get({
    ativo: true,
  }, true);

  readonly orgaosControle$ = inject(OrgaoControleService).get({
    ativo: true,
  }, true);

  readonly gestoes$ = inject(GestoesService).get({
    ativo: true,
  }, true);

  readonly documentos$ = inject(TipoDocumentoService).get({
    ativo: true,
  }, true);

  readonly referencias$ = inject(
    MonitoramentoEControleDeLicencasService
  ).getReferencias();

  readonly empresas$ = inject(
    MonitoramentoEControleDeLicencasService
  ).getEmpresas();

  readonly vencimentos$ = inject(
    MonitoramentoEControleDeLicencasService
  ).getVencimento();

  readonly periodicidades$ = inject(
    MonitoramentoEControleDeLicencasService
  ).getPeriodicidades();

  readonly fornecedores$ = inject(FornecedorService).get({
    ativo: true,
  }, true);

  readonly modalService = inject(ModalService);

}
