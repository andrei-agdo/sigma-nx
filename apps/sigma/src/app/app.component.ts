import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule } from '@sigma-nx/ui';
@Component({
  standalone: true,
  imports: [
    RouterModule, UiModule],
  selector: 'sigma-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sigma';
}
