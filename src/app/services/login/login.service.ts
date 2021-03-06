import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://jukebox-lab151.com.br:8080/user';
  constructor(private http: HttpClient) { }

  // Responsavel por logar usuario cadastrado
  submitForm(payload) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(this.url + '/login' , payload ,{headers});
  }

  // Responsavel por adicionar evento ao documento user no mongodb
  addEventUser(email) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(this.url + '/' + email + '/event/jukebox', '' ,{headers});
  }

  createUser(payload) {
    console.log(payload)
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(this.url , payload ,{headers});
  }
}
