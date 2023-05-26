import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Http } from './http.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [HttpClientModule,Http],
})
export class HttpModule { }
