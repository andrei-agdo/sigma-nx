
import { OrgaoControleService } from './shared/orgao-controle.service';
import { MatDialog } from '@angular/material/dialog';
import { TablePagination } from '@sigma-nx/components/table';
import { OrgaoControle } from './shared/orgao-controle';
import { Filter } from '@sigma-nx/shared';
import { Component } from '@angular/core';

@Component({
  selector: 'sigma-nx-orgao-controle',
  templateUrl: './orgao-controle.component.html',
  styleUrls: ['./orgao-controle.component.scss'],
})
export class OrgaoControleComponent {
  public filter: Filter & OrgaoControle = {
    eDecrescente: false,
    itensPorPagina: 10,
    pagina: 0,
    ativo: true,

  };

  public page: TablePagination = {
    pageIndex: 0,
    pageSize: 10,
  };

  public orgaos: OrgaoControle[];

  constructor(
    private matDialog: MatDialog,
    private orgaosService: OrgaoControleService
  ) {}

  ngOnInit(): void {
    this.getOrgaosControle();
  }

  getOrgaosControle(resetPage = false) {
    if (resetPage) this.filter.pagina = 0;



    this.orgaosService.get(this.filter).subscribe((orgaos) => {
      this.orgaos = orgaos;

    });
  }

  changeStatus(orgaoControle: OrgaoControle) {

    this.orgaosService.atualizarAtivo(orgaoControle).subscribe();
  }

  changePage(page: TablePagination) {
    this.filter.pagina = page.pageIndex;
    this.filter.itensPorPagina = page.pageSize;
    this.getOrgaosControle();
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
    this.getOrgaosControle();
  }

  async openOrgaoControle(orgaoControle?: OrgaoControle) {
    const { FormularioComponent } = await import(
      './formulario/formulario.component'
    );
    this.matDialog
      .open(FormularioComponent, {
        data: { orgaoControle },
      })
      .afterClosed()
      .subscribe((reload: boolean) => reload && this.getOrgaosControle());
  }
}
