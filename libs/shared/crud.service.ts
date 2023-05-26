import { Observable } from 'rxjs';
import { Filter } from './filter';
import { Injectable, inject, Inject } from '@angular/core';
import { Http } from '../services/http/src';
import { Base } from './base';

interface AtualizacaoAtivo {
  readonly id: string;
  unidadeId: string;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CrudService<T extends Base, TSimplificado extends Base = T, TFilter extends Base = T> {
  protected http: Http = inject(Http);

  constructor(private route: string) { }

  public mapGet = (filter?: Filter & Partial<TFilter>): {
    [k: string]: string | number | boolean;
  } => {
    const _filter = { ...filter } as Filter & T;

    if (!_filter.itensPorPagina) _filter.itensPorPagina = 99;
    if (!_filter.pagina) _filter.pagina = 0;
    if (_filter.ativo === undefined) _filter.ativo = true;

    _filter.unidadeId = 'a4895a99-395b-4d97-8a0a-4528601eaa5d';
    // limpa os campos vazios do filtro
    return Object.fromEntries(
      Object.entries(_filter).filter(([key, v]) => v !== '' && v !== undefined).map(([key, v]) => v.toISOString ? [key, v.toISOString()] : [key, v])
    );
  }

  public get = (filter?: Filter & Partial<TFilter>, cache = false): Observable<TSimplificado[]> => {
    if (!cache)
      return this.http.get<TSimplificado[]>(this.route, {
        params: this.mapGet(filter),
        cache: cache,
      })
    else
      return new Observable<TSimplificado[]>(ob =>
        queueMicrotask(() =>
          this.http.get<TSimplificado[]>(this.route, {
            params: this.mapGet(filter),
            cache: cache,
          }).subscribe((res) => {
            ob.next(res);
            ob.complete();
          })
        )
      )
  }

  public getById(id: string): Observable<T> {
    return this.http.get<T>(
      this.route + '/' + id + '/a4895a99-395b-4d97-8a0a-4528601eaa5d'
    );
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
      : this.http.put<T, boolean>(this.route, item);
  }
}
