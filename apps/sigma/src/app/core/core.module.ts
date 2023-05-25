import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InterceptorModule } from './interceptor/interceptor.module';

@NgModule({
  exports: [
    HttpClientModule,
    InterceptorModule,
  ],
  imports: [CommonModule],
  providers: [HttpClientModule],
})
export class CoreModule {}
