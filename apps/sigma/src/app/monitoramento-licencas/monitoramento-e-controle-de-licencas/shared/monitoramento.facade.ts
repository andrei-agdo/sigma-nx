import { inject } from '@angular/core';
import { OrgaoControleService } from '../../orgao-controle/shared/orgao-controle.service';
import { MonitoramentoEControleDeLicencasService } from './monitoramento-e-controle-de-licencas.service';
import { FornecedorService } from '../../fornecedor/shared/fornecedor.service';
import { TipoDocumentoService } from '../../tipo-documento/shared/tipo-documento.service';
import { TemasService } from '../../../administrativo/temas/shared/temas.service';
import { UsuariosService } from '../../../administrativo/usuarios/shared/usuarios.service';
import { GestoesService } from '@sigma-nx/administrativo/gestoes';
import { ModalService } from '@shared/components/modal/modal.service';

export class MonitoramentoFacade  {
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
