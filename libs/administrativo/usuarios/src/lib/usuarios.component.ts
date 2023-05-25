import { PerfilService } from '@shared/services/perfil.service';
import { TablePagination } from '@shared/components/table/models/table-pagination.model';
import { Filter } from '@shared/models/filter';
import { Usuario } from './shared/usuario';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from './shared/usuarios.service';
import { Component } from '@angular/core';
import { load } from '@core/utils/load/load.component';
import { UsuarioSimplificado } from './shared/usuario-simplificado';

@Component({
  selector: 'sigma-nx-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent {
  public filter: Filter & Partial<Usuario> = {
    eDecrescente: false,
    itensPorPagina: 10,
    pagina: 0,
    ativo: true,
  };

  public page: TablePagination = {
    pageIndex: 0,
    pageSize: 10,
  };

  public perfis$ = this.perfilService.get();

  public usuarios: UsuarioSimplificado[];

  constructor(
    private usuariosService: UsuariosService,
    private matDialog: MatDialog,
    private perfilService: PerfilService
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(resetPage = false) {
    if (resetPage) this.filter.pagina = 0;
    load.show();

    this.usuariosService.get(this.filter).subscribe((usuarios) => {
      this.usuarios = usuarios;
      load.hide();
    });
  }

  changeStatus(usuario: Usuario) {
    load.show();
    this.usuariosService.atualizarAtivo(usuario).subscribe(() => {
      load.hide();
    });
  }

  changePage(page: TablePagination) {
    this.filter.pagina = page.pageIndex;
    this.filter.itensPorPagina = page.pageSize;
    this.getUsuarios();
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
    this.getUsuarios();
  }

  async openUsuario(usuario?: Usuario) {
    const { FormularioComponent } = await import(
      './formulario/formulario.component'
    );

    this.matDialog
      .open(FormularioComponent, {
        data: { usuario },
      })
      .afterClosed()
      .subscribe((reload: boolean) => reload && this.getUsuarios());
  }
}
