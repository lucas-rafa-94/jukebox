import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }
  url = 'https://umcincoumproducoes.herokuapp.com/event';

  //Responsavel por pegar playlists do evento por nome no momento fixado so pela jukebox
  getPlaylistFromEventByName() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get(this.url + '/jukebox',{headers});
  }
}
