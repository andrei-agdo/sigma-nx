import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterceptorModule } from './interceptor/interceptor.module';

@NgModule({
  exports: [
    InterceptorModule,
  ],
  imports: [CommonModule],
})
export class CoreModule { }
