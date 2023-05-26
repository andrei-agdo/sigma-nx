import { Component } from '@angular/core';

import { UnidadeMedidaService } from './shared/unidade-medida.service';
import { MatDialog } from '@angular/material/dialog';
import { TablePagination } from '@sigma-nx/components/table';
import { UnidadeMedida } from './shared/unidade-medida';
import { Filter } from '@sigma-nx/shared';

@Component({
  selector: 'sigma-nx-unidade-medida',
  templateUrl: './unidade-medida.component.html',
  styleUrls: ['./unidade-medida.component.scss'],
})
export class UnidadeMedidaComponent {
  public filter: Filter & UnidadeMedida = {
    eDecrescente: false,
    itensPorPagina: 10,
    pagina: 0,
    ativo: true,
    ordenarPor: '',
  };

  public page: TablePagination = {
    pageIndex: 0,
    pageSize: 10,
  };

  public unidadesMedida: UnidadeMedida[];

  constructor(
    private matDialog: MatDialog,
    private unidadesMedidaService: UnidadeMedidaService
  ) {}

  ngOnInit(): void {
    this.getUnidadesMedida();
  }

  getUnidadesMedida(resetPage = false) {
    if (resetPage) this.filter.pagina = 0;



    this.unidadesMedidaService.get(this.filter).subscribe((unidadesMedida) => {
      this.unidadesMedida = unidadesMedida;

    });
  }

  changeStatus(unidadeMedida: UnidadeMedida) {

    this.unidadesMedidaService.atualizarAtivo(unidadeMedida).subscribe();
  }

  changePage(page: TablePagination) {
    this.filter.pagina = page.pageIndex;
    this.filter.itensPorPagina = page.pageSize;
    this.getUnidadesMedida();
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
    this.getUnidadesMedida();
  }

  async openUnidadeMedida(unidadeMedida?: UnidadeMedida) {
    const { FormularioComponent } = await import(
      './formulario/formulario.component'
    );
    this.matDialog
      .open(FormularioComponent, {
        data: { unidadeMedida: unidadeMedida },
      })
      .afterClosed()
      .subscribe((reload: boolean) => reload && this.getUnidadesMedida());
  }
}
