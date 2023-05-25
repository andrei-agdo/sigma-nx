import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterceptorModule } from './interceptor/interceptor.module';

@NgModule({
  exports: [
    HttpClientModule,
    InterceptorModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  imports: [CommonModule],
  providers: [HttpClientModule],
})
export class CoreModule {}
