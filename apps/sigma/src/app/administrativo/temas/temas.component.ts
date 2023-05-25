import { TemasService } from './shared/temas.service';
import { load } from '@core/utils/load/load.component';
import { MatDialog } from '@angular/material/dialog';
import { TablePagination } from '@shared/components/table/models/table-pagination.model';
import { Filter } from '@shared/models/filter';
import { Tema } from './shared/tema';
import { Component } from '@angular/core';

@Component({
  selector: 'sigma-nx-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.scss'],
})
export class TemasComponent {
  public filter: Filter & Partial<Tema> = {
    eDecrescente: false,
    itensPorPagina: 10,
    pagina: 0,
    ativo: true,
  };

  public page: TablePagination = {
    pageIndex: 0,
    pageSize: 10,
  };

  public temas: Tema[];

  constructor(
    private matDialog: MatDialog,
    private temasService: TemasService
  ) {}

  ngOnInit(): void {
    this.getTemas();
  }

  getTemas(resetPage = false) {
    if (resetPage) this.filter.pagina = 0;

    load.show();

    this.temasService.get(this.filter).subscribe((temas) => {
      this.temas = temas;
      load.hide();
    });
  }

  changeStatus(tema: Tema) {
    load.show();
    this.temasService.atualizarAtivo(tema).subscribe(() => {
      load.hide();
    });
  }

  changePage(page: TablePagination) {
    this.filter.pagina = page.pageIndex;
    this.filter.itensPorPagina = page.pageSize;
    this.getTemas();
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
    this.getTemas();
  }

  async openTema(tema?: Tema) {
    const { FormularioComponent } = await import(
      './formulario/formulario.component'
    );
    this.matDialog
      .open(FormularioComponent, {
        data: { tema },
      })
      .afterClosed()
      .subscribe((reload: boolean) => reload && this.getTemas());
  }
}
