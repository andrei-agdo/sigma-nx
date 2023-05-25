import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@core/core.module';
import { LoadComponent } from '@core/utils/load/load.component';
import { UiModule } from '@sigma-nx/ui';
@Component({
  standalone: true,
  imports: [
    RouterModule, UiModule,
    CoreModule, LoadComponent],
  providers: [HttpClientModule],
  selector: 'sigma-nx-root',
  template: `<sigma-nx-load></sigma-nx-load><router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor() {
    console.log("%c\n\
                        \n\
   ███████╗██╗    ██╗   \n\
   ██╔════╝██║    ██║   \n\
   ███████╗██║ █╗ ██║   \n\
   ╚════██║██║███╗██║   \n\
   ███████║╚███╔███╔╝   \n\
   ╚══════╝ ╚══╝╚══╝    \n\
                        \n\
", "background-color: black; color: orange;");

    console.log(
      '%c                \n    Cebrace     \n                \n',
      'background: #f60; color: #000'
    );
  }
}
