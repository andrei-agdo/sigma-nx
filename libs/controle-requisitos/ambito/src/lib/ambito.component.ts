import { AmbitoService } from './shared/ambito.service';
import { Ambito } from './shared/ambito';
import { MatDialog } from '@angular/material/dialog';
import { TablePagination } from '@sigma-nx/components/table';
import { Filter } from '@sigma-nx/shared';
import { Component } from '@angular/core';
@Component({
  selector: 'sigma-nx-ambito',
  templateUrl: './ambito.component.html',
  styleUrls: ['./ambito.component.scss'],
})
export class AmbitoComponent {
  public filter: Filter & Ambito = {
    eDecrescente: false,
    itensPorPagina: 10,
    pagina: 0,
    ativo: true,
  };

  public page: TablePagination = {
    pageIndex: 0,
    pageSize: 10,
  };

  public ambitos: Ambito[];

  constructor(
    private matDialog: MatDialog,
    private ambitoService: AmbitoService
  ) {}

  ngOnInit(): void {
    this.getAmbitos();
  }

  getAmbitos(resetPage = false) {
    if (resetPage) this.filter.pagina = 0;


    this.ambitoService.get(this.filter).subscribe((ambito) => {
      this.ambitos = ambito;
    });
  }

  changeStatus(ambito: Ambito) {
    this.ambitoService.atualizarAtivo(ambito).subscribe();
  }

  changePage(page: TablePagination) {
    this.filter.pagina = page.pageIndex;
    this.filter.itensPorPagina = page.pageSize;
    this.getAmbitos();
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
    this.getAmbitos();
  }

  async openAmbito(ambito?: Ambito) {
    const { FormularioComponent } = await import(
      './formulario/formulario.component'
    );
    this.matDialog
      .open(FormularioComponent, {
        data: { ambito },
      })
      .afterClosed()
      .subscribe((reload: boolean) => reload && this.getAmbitos());
  }
}
