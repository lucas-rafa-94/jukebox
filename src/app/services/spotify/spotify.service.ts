import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  url = 'http://jukebox-lab151.com.br:8080';
  url2 = 'http://jukebox-lab151.com.br:8080/jukebox';
  constructor(private http: HttpClient) { }

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
  //Postgree

  getArtistsByPlaylist(playlist) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get(this.url2 + '/playlist/' + playlist + '/artists',{headers});
  }

  getArtistPostgree(artist , playlist) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get(this.url2 + '/artist?name=' + artist + '&playlist=' + playlist,{headers});
  }

  getTracksByArtist(artist , playlist) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get(this.url2 + '/tracks?artist=' + artist + '&playlist=' + playlist,{headers});
  }

  getTracksFilterByArtist(artist , music,  playlist) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get(this.url2 + '/tracks/filter?artist=' + artist + '&playlist=' + playlist + '&music=' + music,{headers});
  }

  getMusics(music,  playlist) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.get(this.url2 + '/playlist/' + playlist + '/filter?music=' + music,{headers});
  }

  postSugestao(payload) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(this.url2 + '/sugestao', payload, {headers});
  }
}
