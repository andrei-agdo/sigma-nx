import { Component } from '@angular/core';
import { load } from '@core/utils/load/load.component';
import { TipoEquipamentoService } from './shared/tipo-equipamento.service';
import { MatDialog } from '@angular/material/dialog';
import { TablePagination } from '@shared/components/table/models/table-pagination.model';
import { TipoEquipamento } from './shared/tipo-equipamento';
import { Filter } from './../../shared/models/filter';

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
  ) {}

  ngOnInit(): void {
    this.getTiposEquipamento();
  }

  getTiposEquipamento(resetPage = false) {
    if (resetPage) this.filter.pagina = 0;

    load.show();

    this.tiposEquipamentoService
      .get(this.filter)
      .subscribe((tiposEquipamento) => {
        this.tiposEquipamento = tiposEquipamento;
        load.hide();
      });
  }

  changeStatus(tipoEquipamento: TipoEquipamento) {
    load.show();
    this.tiposEquipamentoService
      .atualizarAtivo(tipoEquipamento)
      .subscribe(() => {
        load.hide();
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
