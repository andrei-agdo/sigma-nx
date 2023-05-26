import { FabricanteService } from './shared/fabricante.service';
import { TablePagination } from '@sigma-nx/components/table';
import { MatDialog } from '@angular/material/dialog';
import { load } from '@core/utils/load/load.component';
import { Filter } from '@shared/models/filter';
import { Component } from '@angular/core';
import { FabricanteSimplificado } from './shared/fabricante-simplificado';

@Component({
  selector: 'sigma-nx-fabricante',
  templateUrl: './fabricante.component.html',
  styleUrls: ['./fabricante.component.scss'],
})
export class FabricanteComponent {
  public filter: Filter & FabricanteSimplificado = {
    eDecrescente: false,
    itensPorPagina: 10,
    pagina: 0,
    ativo: true,
  };

  public page: TablePagination = {
    pageIndex: 0,
    pageSize: 10,
  };

  public fabricantes: FabricanteSimplificado[];

  constructor(
    private matDialog: MatDialog,
    private fabricantesService: FabricanteService
  ) {}

  ngOnInit(): void {
    this.getFabricantes();
  }

  getFabricantes(resetPage = false) {
    if (resetPage) this.filter.pagina = 0;

    load.show();

    this.fabricantesService.get(this.filter).subscribe((fabricantes) => {
      this.fabricantes = fabricantes;
      load.hide();
    });
  }

  changeStatus(fabricante: FabricanteSimplificado) {
    load.show();
    this.fabricantesService
      .atualizarAtivo(fabricante)
      .subscribe(() => load.hide());
  }

  changePage(page: TablePagination) {
    this.filter.pagina = page.pageIndex;
    this.filter.itensPorPagina = page.pageSize;
    this.getFabricantes();
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
    this.getFabricantes();
  }

  async openFabricante(fabricante?: FabricanteSimplificado) {
    const { FormularioComponent } = await import(
      './formulario/formulario.component'
    );
    this.matDialog
      .open(FormularioComponent, {
        data: { fabricante },
      })
      .afterClosed()
      .subscribe((reload: boolean) => reload && this.getFabricantes());
  }
}
