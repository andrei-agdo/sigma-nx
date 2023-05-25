import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
// import { CryptoStorage } from '@webcrypto/storage';
// import * as CryptoJS from 'crypto-js';
// import * as Forge from 'node-forge';

@Injectable({
  providedIn: 'root',
})
export class Encrypt {
  private publicKey: string = environment.publicKey;
  // private cryptoStore = new CryptoStorage(this.publicKey);

  public getItem(key: string): Observable<string> {
    return new Observable<string>((ob) => {
      // this.cryptoStore.get(key).then((value) => {
        // ob.next(value || '');
        ob.next('');
        ob.complete();
      // });
    });
  }

  public setItem(key: string, value: string): Observable<void> {
    return new Observable<void>((ob) => {
      // this.cryptoStore.set(key, value).then((value) => {
        ob.next();
        ob.complete();
      // });
    });
  }

  // public removeItem(key: string): Promise<void> {
  //   // return this.cryptoStore.delete(key);
  // }

  // public encryptAES(valorParaCriptografar: string): string {
  //   return CryptoJS.AES.encrypt(
  //     valorParaCriptografar,
  //     this.publicKey
  //   ).toString();
  // }

  // public decryptAES(valorParaCriptografar: string): string {
  //   throw("Não implementado");
  //   // let bytes = CryptoJS.AES.decrypt(valorParaCriptografar, this.publicKey);
  //   // if (bytes.toString()) {
  //   //   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //   // }
  //   return valorParaCriptografar;
  // }

  public encryptPublicKey(valorParaCriptografar: string): string {
    throw("Não implementado");
    return '';
    // const rsa = Forge.pki.publicKeyFromPem(this.publicKey);
    // return window.btoa(rsa.encrypt(valorParaCriptografar.toString()));
  }
}
