import { TipoDocumentoService } from './shared/tipo-documento.service';
import { TablePagination } from '@sigma-nx/components/table';
import { MatDialog } from '@angular/material/dialog';
import { load } from '@core/utils/load/load.component';
import { TipoDocumento } from './shared/tipo-documento';
import { Filter } from '@shared/models/filter';
import { Component } from '@angular/core';

@Component({
  selector: 'sigma-nx-tipoDocumento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.scss'],
})
export class TipoDocumentoComponent {
  public filter: Filter & TipoDocumento = {
    eDecrescente: false,
    itensPorPagina: 10,
    pagina: 0,
    ativo: true,
  };

  public page: TablePagination = {
    pageIndex: 0,
    pageSize: 10,
  };

  public tiposDocumento: TipoDocumento[];

  constructor(
    private matDialog: MatDialog,
    private tiposDocumentoService: TipoDocumentoService
  ) {}

  ngOnInit(): void {
    this.getTiposDocumento();
  }

  getTiposDocumento(resetPage = false) {
    if (resetPage) this.filter.pagina = 0;

    load.show();

    this.tiposDocumentoService.get(this.filter).subscribe((tiposDocumento) => {
      this.tiposDocumento = tiposDocumento;
      load.hide();
    });
  }

  changeStatus(tipoDocumento: TipoDocumento) {
    load.show();
    this.tiposDocumentoService.atualizarAtivo(tipoDocumento).subscribe(() => {
      load.hide();
    });
  }

  changePage(page: TablePagination) {
    this.filter.pagina = page.pageIndex;
    this.filter.itensPorPagina = page.pageSize;
    this.getTiposDocumento();
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
    this.getTiposDocumento();
  }

  async openTipoDocumento(tipoDocumento?: TipoDocumento) {
    const { FormularioComponent } = await import(
      './formulario/formulario.component'
    );
    this.matDialog
      .open(FormularioComponent, {
        data: { tipoDocumento },
      })
      .afterClosed()
      .subscribe((reload: boolean) => reload && this.getTiposDocumento());
  }
}
