import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  trigger,
  transition,
  style,
  query,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'sigma-nx--layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    NgIf,NgFor,
    HeaderComponent,
    MenuComponent,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule],
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({
              display: 'block',
              visibility: 'hidden',
              opacity: 0,
              transform: 'translateY(-100px)',
            }),
            animate(
              '400ms ease-in-out',
              style({
                display: 'block',
                visibility: 'visible',
                opacity: 1,
                transform: 'translateY(0)',
              })
            ),
          ],
          {
            optional: true,
          }
        ),
      ]),
    ]),
  ],
})
export class LayoutComponent {
  public mainOpened: boolean;

  public isMobile = false;

  public opened = false;

  public fixOpen = false;

  public loading = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd) {
        this.loading = false;
      }
    });

    this.mainOpened = false;

    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });

  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }

  changeMenu(value: boolean) {
    this.mainOpened = value;
  }
}
