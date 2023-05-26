import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'sigma-nx-search-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `<button mat-flat-button color="accent" class="button-search"><mat-icon>search</mat-icon></button>
  `,
  styles: [`.button-search {
    float: right;
    min-width: 44px;
    height: 44px;
    padding: 0;

    mat-icon {
      margin: 0px;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }
  }
  `]
})
export class SearchButtonComponent {

}
