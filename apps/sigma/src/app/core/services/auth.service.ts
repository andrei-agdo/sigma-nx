import { Observable, of, forkJoin } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public authenticate(authReturn: any): Observable<any> {
    console.error('Authenticate');
    return new Observable((ob) => {
      // let _auth = {
      //   login: authReturn.login,
      //   password: this.securityService.criptografarComChavePublica(
      //     authReturn.password
      //   ),
      // };
      // TODO:  quando tiver a rota de login, aplicar aqui
      // return this.http.post(`${this.route}/authenticate`, _auth);
      if (
        authReturn.login !== 'sw@cebrace.com.br' ||
        authReturn.password !== 'SW2017'
      ) {
        ob.error({ error: 'Usuário ou senha inválido' });
        ob.complete();
      } else
        of({ token: 'token', usuarioId: 'usuarioId' }).subscribe((response) => {
          forkJoin([of(true)
            // this.securityService.setToken(response.token),
            // this.securityService.setLoggedUserId(response.usuarioId),
          ]).subscribe(() => {
            ob.next();
            ob.complete();
          });
        });
    });
  }
}
