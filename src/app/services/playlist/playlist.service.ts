import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  url = 'https://umcincoumproducoes.herokuapp.com';
  constructor(private http: HttpClient) { }

  putMusicOnPlaylist(playlist, payload) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(this.url + '/playlist?playlist=jukebox' + playlist, payload,{headers});
  }

  getMusicsOnPlaylist(playlist) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get(this.url + '/playlist/jukebox' + playlist,{headers});
  }

  voteMusicsOnPlaylist(playlist, email, music) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(this.url + '/playlist/jukebox' + playlist + '/vote?email=' + email + '&music=' + music,'',{headers});
  }
}
