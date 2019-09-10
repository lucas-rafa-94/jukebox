import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // url = 'https://umcincoumproducoes.herokuapp.com/user';
  url = 'http://localhost:8080/user';
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

  updatePasswordUser(payload) {
    console.log(payload)
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(this.url + '/update-password' , payload ,{headers});
  }

  getUserByEmail(email) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get(this.url + '/' + email  , {headers});
  }
}
