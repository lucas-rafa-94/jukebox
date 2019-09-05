import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  url = 'https://umcincoumproducoes.herokuapp.com';
  constructor(private http: HttpClient) {}

  getArtists(artist) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get(this.url + '/search-music?artists=' + artist,{headers});
  }

  getTopTracksArtist(id) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get(this.url + '/search-music/top-tracks/' + id,{headers});
  }


  getTracksFromArtist(track, artist) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get(this.url + '/search-music/artist?name=' + artist + '&track=' + track,{headers});
  }

  getTracksWithoutArtists(track) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get(this.url + '/search-music/by-track?track=' + track ,{headers});
  }
}
