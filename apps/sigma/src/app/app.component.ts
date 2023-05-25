import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@core/core.module';
import { LoadComponent } from '@core/utils/load/load.component';
@Component({
  standalone: true,
  imports: [
    RouterModule,
    CoreModule, LoadComponent],
  selector: 'sigma-nx-root',
  template: `<sigma-nx-load></sigma-nx-load><router-outlet></router-outlet>`
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
