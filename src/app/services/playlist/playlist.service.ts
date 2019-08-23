import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  url = 'http://ec2-18-231-45-109.sa-east-1.compute.amazonaws.com:8080';
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
