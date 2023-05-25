import { LoadComponent } from '@core/utils/load/load.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoadComponent],
  imports: [CommonModule],
  exports:[LoadComponent]
})
export class LoadModule {}
