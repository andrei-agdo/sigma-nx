import { Injectable } from '@angular/core';
import { AuthLogin } from '../shared/models/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public authLogin: AuthLogin = {
    login: 'sw@cebrace.com.br',
    password: 'SW2017',
  };
}
