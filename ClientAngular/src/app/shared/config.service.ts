import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class ConfigService {

  constructor() {}

  get authApiURI() {
    return 'https://auth.detree.ru/api/account';
  }

  get authApiURILogin() {
    return 'https://auth.detree.ru/account/login';
  }

  get resourceApiURI() {
    return 'http://localhost:5050/api';
  }
}
