import { Component } from '@angular/core';

import { TipoEquipamentoService } from './shared/tipo-equipamento.service';
import { MatDialog } from '@angular/material/dialog';

import { TablePagination } from '@sigma-nx/components/table';
import { TipoEquipamento } from './shared/tipo-equipamento';
import { Filter } from '@sigma-nx/shared';

@Component({
  selector: 'sigma-nx-tipo-equipamento',
  templateUrl: './tipo-equipamento.component.html',
  styleUrls: ['./tipo-equipamento.component.scss'],
})
export class TipoEquipamentoComponent {
  public filter: Filter & TipoEquipamento = {
    eDecrescente: false,
    itensPorPagina: 10,
    pagina: 0,
    ativo: true,
  };

  public page: TablePagination = {
    pageIndex: 0,
    pageSize: 10,
  };

  public tiposEquipamento: TipoEquipamento[];

  constructor(
    private matDialog: MatDialog,
    private tiposEquipamentoService: TipoEquipamentoService
  ) { }

  ngOnInit(): void {
    this.getTiposEquipamento();
  }

  getTiposEquipamento(resetPage = false) {
    if (resetPage) this.filter.pagina = 0;



    this.tiposEquipamentoService
      .get(this.filter)
      .subscribe((tiposEquipamento) => {
        this.tiposEquipamento = tiposEquipamento;

      });
  }

  changeStatus(tipoEquipamento: TipoEquipamento) {

    this.tiposEquipamentoService
      .atualizarAtivo(tipoEquipamento)
      .subscribe(() => {

      });
  }

  changePage(page: TablePagination) {
    this.filter.pagina = page.pageIndex;
    this.filter.itensPorPagina = page.pageSize;
    this.getTiposEquipamento();
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
    this.getTiposEquipamento();
  }

  async openTipoEquipamento(tipoEquipamento?: TipoEquipamento) {
    const { FormularioComponent } = await import(
      './formulario/formulario.component'
    );
    this.matDialog
      .open(FormularioComponent, {
        data: { tipoEquipamento: tipoEquipamento },
      })
      .afterClosed()
      .subscribe((reload: boolean) => reload && this.getTiposEquipamento());
  }
}
