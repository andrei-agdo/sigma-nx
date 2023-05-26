import { TipoService } from './shared/tipo.service';
import { Tipo } from './shared/tipo';

import { MatDialog } from '@angular/material/dialog';
import { TablePagination } from '@sigma-nx/components/table';
import { Filter } from '@sigma-nx/shared';
import { Component } from '@angular/core';

@Component({
  selector: 'sigma-nx-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.scss'],
})
export class TipoComponent {
  public filter: Filter & Tipo = {
    eDecrescente: false,
    itensPorPagina: 10,
    pagina: 0,
    ativo: true,
  };

  public page: TablePagination = {
    pageIndex: 0,
    pageSize: 10,
  };

  public tipos: Tipo[];

  constructor(private matDialog: MatDialog, private tipoService: TipoService) {}

  ngOnInit(): void {
    this.getTipos();
  }

  getTipos(resetPage = false) {
    if (resetPage) this.filter.pagina = 0;

    this.tipoService.get(this.filter).subscribe((tipos) => {
      this.tipos = tipos;
    });
  }

  changeStatus(tipo: Tipo) {

    this.tipoService.atualizarAtivo(tipo).subscribe();
  }

  changePage(page: TablePagination) {
    this.filter.pagina = page.pageIndex;
    this.filter.itensPorPagina = page.pageSize;
    this.getTipos();
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
    this.getTipos();
  }

  async openTipos(tipo?: Tipo) {
    const { FormularioComponent } = await import(
      './formulario/formulario.component'
    );
    this.matDialog
      .open(FormularioComponent, {
        data: { tipo },
      })
      .afterClosed()
      .subscribe((reload: boolean) => reload && this.getTipos());
  }
}
