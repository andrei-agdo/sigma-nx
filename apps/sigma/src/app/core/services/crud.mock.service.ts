import { Observable, map } from 'rxjs';
import { Filter } from '@shared/models/filter';
import { Injectable, inject, Inject } from '@angular/core';
import { HttpMock } from '@shared/services/http.mock.service';

interface AtualizacaoAtivo {
  readonly id: string;
  unidadeId: string;
  ativo: boolean;
}

interface Base {
  id?: string;
  _id?: string;
  nome?: string;
  ativo?: boolean;
  unidadeId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CrudMockService<T extends Base, TSimplificado extends Base = T> {
  protected http: HttpMock = inject(HttpMock);

  constructor(@Inject(String) private route: string) { }

  public mapGet(filter?: Filter & Partial<T>): {
    [k: string]: string | number | boolean;
  } {
    let _filter = { ...filter } as Filter & T;

    if (!_filter.itensPorPagina) _filter.itensPorPagina = 99;
    if (!_filter.pagina) _filter.pagina = 0;
    if (_filter.ativo === undefined) _filter.ativo = true;

    _filter.unidadeId = 'a4895a99-395b-4d97-8a0a-4528601eaa5d';
    // limpa os campos vazios do filtro
    return Object.fromEntries(
      Object.entries(_filter).filter(([key, v]) => v !== '')
    );
  }

  public get(filter?: Filter & Partial<T>): Observable<TSimplificado[]> {
    return this.http.get<TSimplificado[]>(this.route, {
      params: this.mapGet(filter),
    }).pipe(map((x) => {
      x.forEach(y => y.id = y._id);
      return x;
    }));;
  }
  public filter(filter?: Filter & Partial<T>) {
    return this.http.post<any, any[]>(this.route + '/find', filter);
  }

  public getById(id: string): Observable<T> {
    return this.http.get<T>(
      this.route + '/' + id
    ).pipe(map((x: any) => {
      x.id = x._id;
      return x;
    }));
  }

  public atualizarAtivo(item: T | TSimplificado): Observable<boolean> {
    item.ativo = !item.ativo;
    return this.http.put<AtualizacaoAtivo, boolean>(
      this.route + '/atualizar-ativo',
      {
        id: item.id!,
        unidadeId: 'a4895a99-395b-4d97-8a0a-4528601eaa5d',
        ativo: item.ativo,
      }
    );
  }

  public save(item: T): Observable<boolean> {
    item.unidadeId = 'a4895a99-395b-4d97-8a0a-4528601eaa5d';
    return !item.id
      ? this.http.post<T, boolean>(this.route, item)
      : this.http.put<T, boolean>(this.route + "/" + item.id, item);
  }
}
