import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChildren,
} from '@angular/core';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'sigma-nx-menu',
  standalone: true,
  imports: [MenuItemComponent,NgFor],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() opened = false;
  @Output() itemClick = new EventEmitter();

  @ViewChildren(MenuItemComponent) menuItem: MenuItemComponent[] = [];

  public modulos: any[] = [];

  constructor(
  ) {
    this.getMenu();
  }

  closeMenus() {
    this.menuItem.forEach((item) => {
      item.displayedMenu = false;
    });
  }

  private getMenu() {
    this.modulos = [
      {
        descricao: 'Dashboard',
        rota: '/dashboard',
        icone: 'home',
        ordem: 1,
        modulosParent: [],
        id: '0f236608-2211-4d8b-a92a-14955822cffa',
      },
      {
        descricao: 'Controle de Requisitos',
        ordem: 4,
        rota: '/controle-requisitos',
        icone: 'gavel',
        modulosParent: [
          {
            moduloParentId: '31f912a7-7c96-4c64-885c-69a54855014e',
            descricao: 'Requisito Legal',
            rota: '/controle-requisitos/requisito-legal',
            ordem: 1,
            modulosParent: [],
            id: '2967b43a-458e-4494-ac4b-018828571599',
          },
          {
            moduloParentId: '31f912a7-7c96-4c64-885c-69a54855014e',
            descricao: 'Cadastro',
            icone: 'arrow_back_ios',
            ordem: 2,
            modulosParent: [
              {
                moduloParentId: '31f912a7-7c96-4c64-885c-69a54855014e',
                descricao: 'Tipo',
                rota: '/controle-requisitos/tipo',
                ordem: 1,
                modulosParent: [],
                id: '2967b43a-458e-4494-ac4b-018828571599',
              },
              {
                moduloParentId: '31f912a7-7c96-4c64-885c-69a54855014e',
                descricao: 'Origem',
                rota: '/controle-requisitos/origem',
                ordem: 1,
                modulosParent: [],
                id: '2967b43a-458e-4494-ac4b-018828571599',
              },
              {
                moduloParentId: '31f912a7-7c96-4c64-885c-69a54855014e',
                descricao: 'Aplicabilidade',
                rota: '/controle-requisitos/aplicabilidade',
                ordem: 1,
                modulosParent: [],
                id: '2967b43a-458e-4494-ac4b-018828571599',
              },
              {
                moduloParentId: '31f912a7-7c96-4c64-885c-69a54855014e',
                descricao: 'Âmbito',
                rota: '/controle-requisitos/ambito',
                ordem: 1,
                modulosParent: [],
                id: '2967b43a-458e-4494-ac4b-018828571599',
              },
            ],
            id: '1dc23611-24b9-46f2-a8b7-75443c11a6f7',
          },
        ],
        id: '31f912a7-7c96-4c64-885c-69a54855014e',
      },
      {
        descricao: 'Monitoramento de licenças',
        ordem: 4,
        icone: 'folder_open',
        rota: '/monitoramento-licencas',
        modulosParent: [
          {
            moduloParentId: '31f912a7-7c96-4c64-885c-69a54855014e',
            descricao: 'Monitoramento e controle',
            rota: '/monitoramento-licencas/monitoramento-e-controle-de-licencas',
            ordem: 1,
            modulosParent: [],
            id: '2967b43a-458e-4494-ac4b-018828571599',
          },
          {
            descricao: 'Cadastro',
            ordem: 2,
            icone: 'arrow_back_ios',
            modulosParent: [
              {
                descricao: 'Fornecedores',
                rota: '/monitoramento-licencas/fornecedores',
                ordem: 1,
                modulosParent: [],
              },
              {
                descricao: 'Tipo Documento',
                rota: '/monitoramento-licencas/tipo-documento',
                ordem: 1,
                modulosParent: [],
              },
              {
                descricao: 'Órgãos de controle',
                rota: '/monitoramento-licencas/orgao-de-controle',
                ordem: 1,
                modulosParent: [],
              },
            ],
          },
        ],
      },
      {
        descricao: 'Sismetro',
        ordem: 5,
        icone: 'construction',
        rota: '/sismetro',
        modulosParent: [
          {
            descricao: 'Equipamento',
            // rota: '/sismetro/equipamento',
            ordem: 1,
            modulosParent: [],
            id: '2967b43a-458e-4494-ac4b-018828571599',
          },
          {
            descricao: 'Cadastro',
            ordem: 2,
            icone: 'arrow_back_ios',
            modulosParent: [
              {
                descricao: 'Fabricante',
                rota: '/sismetro/fabricante',
                ordem: 1,
                modulosParent: [],
              },
              {
                descricao: 'Tipo equipamento',
                rota: '/sismetro/tipo-equipamento',
                ordem: 1,
                modulosParent: [],
              },
              {
                descricao: 'Unidade de medida',
                rota: '/sismetro/unidade-medida',
                ordem: 1,
                modulosParent: [],
              }
            ],
          },

        ],
      },
      {
        descricao: 'Administrativo',
        ordem: 4,
        icone: 'settings',
        rota: '/administrativo',
        modulosParent: [
          {
            moduloParentId: '31f912a7-7c96-4c64-885c-69a54855014e',
            descricao: 'Usuário',
            ordem: 1,
            rota: '/administrativo/usuarios',
            modulosParent: [],
            id: '2967b43a-458e-4494-ac4b-018828571599',
          },
          {
            moduloParentId: '31f912a7-7c96-4c64-885c-69a54855014e',
            descricao: 'Gestão',
            ordem: 1,
            rota: '/administrativo/gestoes',
            modulosParent: [],
            id: '2967b43a-458e-4494-ac4b-018828571599',
          },
          {
            moduloParentId: '31f912a7-7c96-4c64-885c-69a54855014e',
            descricao: 'Departamento',
            ordem: 1,
            rota: '/administrativo/departamentos',
            modulosParent: [],
            id: '2967b43a-458e-4494-ac4b-018828571599',
          },
          {
            moduloParentId: '31f912a7-7c96-4c64-885c-69a54855014e',
            descricao: 'Tema',
            ordem: 1,
            rota: '/administrativo/temas',
            modulosParent: [],
            id: '2967b43a-458e-4494-ac4b-018828571599',
          },
        ],
      },
    ];
  }

  // TODO : Aplicar após a criação das rotas
  // private findRouteActive(): void {
  //   const _currentRoute = location.hash.replace('#', '');

  //   if (this.modulos.some((wh) => wh.rota && _currentRoute.includes(wh.rota)))
  //     this.showSubmenu(
  //       this.modulos.find((wh) => _currentRoute.includes(wh.rota))
  //         .moduloParentId
  //     );
  //   else {
  //     let _modulo = this.modulos
  //       .filter((wh) => wh.modulosParent.length > 0)
  //       .map((m) =>
  //         m.modulosParent.find((wh: any) => _currentRoute.includes(wh.rota))
  //       )[0];
  //     if (_modulo) this.showSubmenu(_modulo.moduloParentId);
  //   }
  // }
}
