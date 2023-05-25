import { animate, style, transition, trigger } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'sigma-nx--menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  standalone: true,
  imports: [RouterModule, NgIf, MatIconModule,NgFor],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ height: '0px', opacity: 0 }),
        animate('300ms', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('300ms', style({ height: '0px', opacity: 0 })),
      ]),
    ]),
  ],
})
export class MenuItemComponent {
  @Output() menuItemClick = new EventEmitter();
  public displayedMenu = false;
  @Input() modulo: any;
  @Input() level = 0;
  @Input() opened = false;

  constructor(private router: Router) { }

  get isActiveRoute() {
    return this.router.url.includes(this.modulo.rota);
  }

  menuClick(modulo: any) {
    this.displayedMenu = !this.displayedMenu;
    if (modulo?.rota && modulo?.modulosParent.length == 0)
      this.menuItemClick.emit(modulo.rota);
  }

  menuItemClicked(modulo: any) {
    this.menuItemClick.emit(modulo);
  }
}
