import { RequisitoLegal } from './requisito-legal';
import { Filter } from '@shared/models/filter';
import { Injectable } from '@angular/core';
import { CrudService } from '@core/services/crud.service';
import { RequisitoLegalSimplificado } from './requisito-legal-simplificado';
import { RequisitoLegalFilter } from './requisito-legal-filter';
import { Atendimento } from './atendimento';
import { environment } from '@environments/environment';



@Injectable({
  providedIn: 'root',
})
export class RequisitoLegalService extends CrudService<RequisitoLegal, RequisitoLegalSimplificado, RequisitoLegalFilter> {
  constructor() {
    super('/requisitos-legais');
  }

  gerarXlsx(filter: Filter & RequisitoLegalFilter) {
    window.open(environment.api + '/requisitos-legais/gerar-xlsx?' + new URLSearchParams(this.mapGet(filter) as any).toString())
  }

  atualizarDataAnalise(data: Date, requisitosLegais: RequisitoLegal[]) {
    return this.http.put('/requisitos-legais/atualizar-datas-analise', {
      unidadeId: "a4895a99-395b-4d97-8a0a-4528601eaa5d",
      dataAnalise: data.toISOString(),
      requisitosLegaisId: requisitosLegais.map(x => x.id)
    });
  }

  getAtendimentos = () => this.http.get<Atendimento[]>('/atendimentos', { cache: true })

}
