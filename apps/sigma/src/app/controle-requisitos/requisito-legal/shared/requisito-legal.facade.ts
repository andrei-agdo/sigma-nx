import { MatDialog } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequisitoLegalService } from './requisito-legal.service';
import { Router } from '@angular/router';
import { ModalService } from '@sigma-nx/services/modal';

import { Atendimento } from './atendimento';

import { DepartamentosService } from '@sigma-nx/administrativo/departamentos';
import { Departamento } from '@sigma-nx/administrativo/departamentos';
import { MonitoramentoEControleDeLicencasService } from '../../../monitoramento-licencas/monitoramento-e-controle-de-licencas/shared/monitoramento-e-controle-de-licencas.service';
import { Gestao, GestoesService } from '@sigma-nx/administrativo/gestoes';
import { Tema, TemasService } from '@sigma-nx/administrativo/temas';
import { AmbitoService } from '@sigma-nx/controle-requisitos/ambito';
import { AplicabilidadeService } from 'libs/controle-requisitos/aplicabilidade/src/lib/shared/aplicabilidade.service';
import { OrigemService } from '@sigma-nx/controle-requisitos/origem';
import { TipoService } from '@sigma-nx/controle-requisitos/tipo-requisito';
export class RequisitoLegalFacade {

  readonly temas$: Observable<Tema[]> = inject(TemasService).get({ ativo: true }, true);

  readonly tipos$ = inject(TipoService).get({ ativo: true }, true);

  readonly origens$ = inject(OrigemService).get({ ativo: true }, true);

  readonly gestoes$: Observable<Gestao[]> = inject(GestoesService).get({ ativo: true }, true);

  readonly aplicabilidades$ = inject(AplicabilidadeService).get({ ativo: true }, true);

  readonly requisitoLegalService = inject(RequisitoLegalService);

  readonly atendimentos$: Observable<Atendimento[]> = this.requisitoLegalService.getAtendimentos();

  readonly router = inject(Router);

  readonly matDialog = inject(MatDialog);

  readonly modalService = inject(ModalService);

  readonly gacps$: Observable<any[]> = of([
    { id: '1', codigo: '11752', nome: 'REDUÇÃO DE IMPACTO NA ÁREA DA DESCARGA PNEUMÁTICA DA CMP1 - EMISSÃO ATMOSFÉRICA' },
    { id: '2', codigo: '11753', nome: 'REDUÇÃO DE IMPACTO NA ÁREA DA DESCARGA DA CMP2 - EMISSÃO ATMOSFÉRICA' },
  ]);

  readonly ambitos$ = inject(AmbitoService).get({ ativo: true }, true);

  readonly departamentos$: Observable<Departamento[]> =
    inject(DepartamentosService).get({ ativo: true }, true);


  readonly evidenciasPMService = inject(MonitoramentoEControleDeLicencasService);


}
