import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AplicabilidadeService } from './shared/aplicabilidade.service';
import { Aplicabilidade } from './shared/aplicabilidade';
import { load } from '@core/utils/load/load.component';
import { TablePagination } from '@shared/components/table/models/table-pagination.model';
import { Filter } from '@shared/models/filter';

@Component({
  selector: 'sigma-nx-aplicabilidade',
  templateUrl: './aplicabilidade.component.html',
  styleUrls: ['./aplicabilidade.component.scss'],
})
export class AplicabilidadeComponent {
  public filter: Filter & Aplicabilidade = {
    eDecrescente: false,
    itensPorPagina: 10,
    pagina: 0,
    ativo: true,
  };

  public page: TablePagination = {
    pageIndex: 0,
    pageSize: 10,
  };

  public aplicabilidades: Aplicabilidade[];

  constructor(
    private matDialog: MatDialog,
    private aplicabilidadeService: AplicabilidadeService
  ) {}

  ngOnInit(): void {
    this.getAplicabilidades();
  }

  getAplicabilidades(resetPage = false) {
    if (resetPage) this.filter.pagina = 0;

    load.show();
    this.aplicabilidadeService.get(this.filter).subscribe((aplicabilidades) => {
      this.aplicabilidades = aplicabilidades;
      load.hide();
    });
  }

  changeStatus(aplicabilidade: Aplicabilidade) {
    load.show();
    this.aplicabilidadeService.atualizarAtivo(aplicabilidade).subscribe(() => {
      load.hide();
    });
  }

  changePage(page: TablePagination) {
    this.filter.pagina = page.pageIndex;
    this.filter.itensPorPagina = page.pageSize;
    this.getAplicabilidades();
  }

  sortBy(prop: string) {
    if (this.filter.ordenarPor === prop && this.filter.eDecrescente) {
      this.filter.ordenarPor = '';
      this.filter.eDecrescente = false;
    } else {
      this.filter.eDecrescente =
        this.filter.ordenarPor === prop ? !this.filter.eDecrescente : false;
      this.filter.ordenarPor = prop;
    }
    this.getAplicabilidades();
  }

  async openAplicabilidades(aplicabilidade?: Aplicabilidade) {
    const { FormularioComponent } = await import(
      './formulario/formulario.component'
    );
    this.matDialog
      .open(FormularioComponent, {
        data: { aplicabilidade },
      })
      .afterClosed()
      .subscribe((reload: boolean) => reload && this.getAplicabilidades());
  }
}
