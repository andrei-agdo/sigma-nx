import { MatDialog } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { Tipo } from '../../tipo/shared/tipo';
import { Origem } from '../../origem/shared/origem';
import { Aplicabilidade } from '../../aplicabilidade/shared/aplicabilidade';
import { AplicabilidadeService } from './../../aplicabilidade/shared/aplicabilidade.service';
import { Gestao } from './../../../administrativo/gestoes/shared/gestao';
import { GestoesService } from './../../../administrativo/gestoes/shared/gestoes.service';
import { OrigemService } from './../../origem/shared/origem.service';
import { TipoService } from './../../tipo/shared/tipo.service';
import { TemasService } from './../../../administrativo/temas/shared/temas.service';
import { Tema } from './../../../administrativo/temas/shared/tema';
import { Observable, of } from 'rxjs';
import { RequisitoLegalService } from './requisito-legal.service';
import { Router } from '@angular/router';
import { ModalService } from '@shared/components/modal/modal.service';
import { AmbitoService } from '../../ambito/shared/ambito.service';
import { Ambito } from '../../ambito/shared/ambito';
import { Atendimento } from './atendimento';
import { Departamento } from '../../../administrativo/departamentos/shared/departamento';
import { DepartamentosService } from '../../../administrativo/departamentos/shared/departamentos.service';
import { MonitoramentoEControleDeLicencasService } from '../../../monitoramento-licencas/monitoramento-e-controle-de-licencas/shared/monitoramento-e-controle-de-licencas.service';

export class RequisitoLegalFacade {

  readonly temas$: Observable<Tema[]> = inject(TemasService).get({ ativo: true }, true);

  readonly tipos$: Observable<Tipo[]> = inject(TipoService).get({ ativo: true }, true);

  readonly origens$: Observable<Origem[]> = inject(OrigemService).get({ ativo: true }, true);

  readonly gestoes$: Observable<Gestao[]> = inject(GestoesService).get({ ativo: true }, true);

  readonly aplicabilidades$: Observable<Aplicabilidade[]> = inject(AplicabilidadeService).get({ ativo: true }, true);

  readonly requisitoLegalService = inject(RequisitoLegalService);

  readonly atendimentos$: Observable<Atendimento[]> = this.requisitoLegalService.getAtendimentos();

  readonly router = inject(Router);

  readonly matDialog = inject(MatDialog);

  readonly modalService = inject(ModalService);

  readonly gacps$: Observable<any[]> = of([
    { id: '1', codigo: '11752', nome: 'REDUÇÃO DE IMPACTO NA ÁREA DA DESCARGA PNEUMÁTICA DA CMP1 - EMISSÃO ATMOSFÉRICA' },
    { id: '2', codigo: '11753', nome: 'REDUÇÃO DE IMPACTO NA ÁREA DA DESCARGA DA CMP2 - EMISSÃO ATMOSFÉRICA' },
  ]);

  readonly ambitos$: Observable<Ambito[]> = inject(AmbitoService
  ).get({ ativo: true }, true);

  readonly departamentos$: Observable<Departamento[]> =
    inject(DepartamentosService).get({ ativo: true }, true);


  readonly evidenciasPMService = inject(MonitoramentoEControleDeLicencasService);


}
