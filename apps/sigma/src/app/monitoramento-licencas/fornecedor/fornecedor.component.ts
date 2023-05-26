import { tap } from 'rxjs/operators';
import { FornecedorService } from './shared/fornecedor.service';
import { TablePagination } from '@sigma-nx/components/table';
import { MatDialog } from '@angular/material/dialog';
import { load } from '@core/utils/load/load.component';
import { Fornecedor } from './shared/fornecedor';
import { Filter } from '@shared/models/filter';
import {
  Component,
  signal,
  ChangeDetectionStrategy
} from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'sigma-nx-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FornecedorComponent {

  filter = signal<Filter & Partial<Fornecedor>>({
    eDecrescente: false,
    itensPorPagina: 10,
    pagina: 0,
    ativo: true,
  });

  public page: TablePagination = {
    pageIndex: 0,
    pageSize: 10,
  };

  public fornecedores = toSignal(
    toObservable(this.filter).pipe(
      tap(() => load.show()),
      switchMap((filter) => this.fornecedoresService.get(filter)),
      tap(() => load.hide()),
    ),
    { initialValue: [] }
  );

  constructor(
    private matDialog: MatDialog,
    private fornecedoresService: FornecedorService
  ) { }


  getFornecedores(resetPage = false) {
    this.filter.mutate((filter) => {
      if (resetPage) filter.pagina = 0;
    });
  }

  changeStatus(fornecedor: Fornecedor) {
    load.show();
    this.fornecedoresService
      .atualizarAtivo(fornecedor)
      .subscribe(() => load.hide());
  }

  changePage(page: TablePagination) {
    this.filter.mutate((filter) => {
      filter.pagina = page.pageIndex;
      filter.itensPorPagina = page.pageSize;
    });
  }

  sortBy(prop: string) {
    this.filter.mutate((filter) => {
      if (filter.ordenarPor === prop && filter.eDecrescente) {
        filter.ordenarPor = '';
        filter.eDecrescente = false;
      } else {
        filter.eDecrescente =
          filter.ordenarPor === prop ? !filter.eDecrescente : false;
        filter.ordenarPor = prop;
      }
    });
  }

  async openFornecedor(fornecedor?: Fornecedor) {
    const { FormularioComponent } = await import(
      './formulario/formulario.component'
    );
    this.matDialog
      .open(FormularioComponent, {
        data: { fornecedor },
      })
      .afterClosed()
      .subscribe((reload: boolean) => reload && this.getFornecedores());
  }
}
