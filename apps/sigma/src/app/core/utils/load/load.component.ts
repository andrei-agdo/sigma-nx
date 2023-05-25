import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

let mostrarLoad: boolean;
let escondendoLoad = false;
export const load = {
  /**
   * Exibe o load em Fullscreen
   */
  show() {
    mostrarLoad = true;
    escondendoLoad = true;
    setTimeout(() => {
      escondendoLoad = false;
    }, 1);
  },
  /**
   * Esconde o load em Fullscreen
   */
  hide() {
    escondendoLoad = true;
    setTimeout(() => {
      mostrarLoad = false;
      escondendoLoad = false;
    }, 400);
  },
};

@Component({
  selector: 'sigma-nx-load',
  templateUrl: './load.component.html',
  standalone: true,
  imports: [NgIf],
  styleUrls: ['./load.component.scss', './load-animation.component.scss']
})
export class LoadComponent {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        mostrarLoad = true;
      } else if (event instanceof NavigationEnd) {
        mostrarLoad = false;
      }
    });
  }
  public get loading() {
    return mostrarLoad;
  }
  public get loadingHiding() {
    return escondendoLoad;
  }
}
