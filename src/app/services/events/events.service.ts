import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }
  url = 'http://ec2-18-231-45-109.sa-east-1.compute.amazonaws.com:8080/event';

  //Responsavel por pegar playlists do evento por nome no momento fixado so pela jukebox
  getPlaylistFromEventByName() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get(this.url + '/jukebox',{headers});
  }
}
