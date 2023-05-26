import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { OrigemService } from './shared/origem.service';
import { Origem } from './shared/origem';

import { TablePagination } from '@sigma-nx/components/table';
import { Filter } from '@sigma-nx/shared';
@Component({
  selector: 'sigma-nx-origem',
  templateUrl: './origem.component.html',
  styleUrls: ['./origem.component.scss'],
})
export class OrigemComponent {
  public filter: Filter & Origem = {
    eDecrescente: false,
    itensPorPagina: 10,
    pagina: 0,
    ativo: true,
  };

  public page: TablePagination = {
    pageIndex: 0,
    pageSize: 10,
  };

  public origens: Origem[];

  constructor(
    private matDialog: MatDialog,
    private origemService: OrigemService
  ) {}

  ngOnInit(): void {
    this.getOrigens();
  }

  getOrigens(resetPage = false) {
    if (resetPage) this.filter.pagina = 0;


    this.origemService.get(this.filter).subscribe((origens) => {
      this.origens = origens;

    });
  }

  changeStatus(origem: Origem) {

    this.origemService.atualizarAtivo(origem).subscribe();
  }

  changePage(page: TablePagination) {
    this.filter.pagina = page.pageIndex;
    this.filter.itensPorPagina = page.pageSize;
    this.getOrigens();
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
    this.getOrigens();
  }

  async openOrigens(origem?: Origem) {
    const { FormularioComponent } = await import(
      './formulario/formulario.component'
    );
    this.matDialog
      .open(FormularioComponent, {
        data: { origem },
      })
      .afterClosed()
      .subscribe((reload: boolean) => reload && this.getOrigens());
  }
}
