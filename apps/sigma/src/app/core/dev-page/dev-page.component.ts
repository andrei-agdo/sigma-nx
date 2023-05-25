import { Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'sigma-nx-dev-page',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dev-page.component.html',
  styleUrls: ['./dev-page.component.scss'],
})
export class DevPageComponent {}
