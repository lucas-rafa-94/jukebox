import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventsService} from './../services/events/events.service';
import {SpotifyService} from './../services/spotify/spotify.service';
import {PlaylistService} from './../services/playlist/playlist.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {log} from 'util';
// import Swal from 'sweetalert2/dist/sweetalert2.js';

declare const run: any;
declare const pickSucesso: any;
declare const pickErro: any;
declare const votoSucesso: any;
declare const votoErro: any;
declare const resetSearch: any;
declare const filtroVazio: any;
declare const playlistSemMusica: any;

@Component({
  selector: 'app-jukebox-home',
  templateUrl: './jukebox-home.component.html',
  styleUrls: ['./jukebox-home.component.css']
})
export class JukeboxHomeComponent implements OnInit {
  //Services
  getEventService;
  getSpotifyService;
  getPlaylistService;
  // ----

  //Arrays
  musicsPlaylists = []
  playlists = [];
  artists = [];
  musicsTopTracks = [];
  musicsFilterArtist = [];
  musicsBytrack = [];
  artistaEscolhido = '';
  musicEscolhida = '';
  fotoMusicaEscolhida = '';

  //
  musicVotedName = '';
  musicVotedArtist = '';
  musicVotedPhotoUri = '';
  musicVotedId = '';

  //
  fromFilterTracks = false;

  // estado playlists e situacao de escolha
  artistPicked;
  musicPicked;
  musicVoted;
  enterTopTracks = false;
  enterFilter = false;
  statePlaylist = '';
  statePickPlaylist = '';
  status = '';
  statusBackUp = '';
  status2BackUp = '';
  status2 = '';

  artistaSelecionado = '';


  //estado views
  voteCardOpen = false;
  musicPlaylistOpen = false;
  homeOpen = true;
  tableByTrackOpen = false;
  topTracksArtistOpen = false;
  artistasTableOpen = false;
  searchOpen = false;
  cardEscolhaOpen = false;
  trackArtistsFilter = false;

  constructor(private router: Router, private eventService: EventsService, private spinnerService: NgxSpinnerService, private spotifyService: SpotifyService, private playlistService: PlaylistService) {
    this.getEventService = eventService;
    this.getSpotifyService = spotifyService;
    this.getPlaylistService = playlistService;
    this.getTokenSession();
  }

  ngOnInit() {
    run();
    this.getPlaylistsFromEvent();
  }


  getTokenSession() {
    console.log(localStorage.getItem('email'));
    if (!localStorage.getItem('email') || localStorage.getItem('email') === '') {
      this.router.navigate(['']);
    }
  }


  //****************************** Get Music *******************************

  //********** chamadas service Inicio  *****************

  getPlaylistsFromEvent() {
    this.spinnerService.show();
    this.getEventService.getPlaylistFromEventByName().subscribe((data) => {
      console.log(data);
      console.log(data.playlists);
      this.spinnerService.hide();
      this.playlists = data.playlists;
    }, (error) => {
      this.spinnerService.hide();
      console.log(error);
    });
  }



  //********** chamadas service  Fim *****************


  //Controla o estado das playlists escolhidas

  modifyStatePlaylistPick(playlist) {
    this.artistaSelecionado = '';
    this.statePlaylist = playlist;
    console.log(this.statePlaylist);
  }

  //Controla o estado do metodo de escolha | por musica ou por artista

  modifyStatePlaylistVote(pick) {
    this.artistaSelecionado = '';
    this.homeOpen = false;
    this.musicPlaylistOpen = false;
    this.voteCardOpen = false;
    this.musicsPlaylists = [];
    this.statePickPlaylist = pick;
    this.searchOpen = true;
    if(pick === 'artista'){
      this.status = 'Procure um artista';
      this.musicPlaylistOpen = false;
      this.musicsBytrack = [];
      this.musicVotedArtist = '';
      this.musicVotedId = '';
      this.musicVotedName = '';
      this.musicVotedPhotoUri = '';
      this.musicPlaylistOpen = false;
      this.voteCardOpen = false;
      this.cardEscolhaOpen = false;
      this.playlists = [];
      this.artists = [];
      this.musicsTopTracks = [];
      this.musicsFilterArtist = [];
      this.artistaEscolhido = '';
      this.musicEscolhida = '';
      this.fotoMusicaEscolhida = '';
      this.musicsPlaylists = [];
      this.status2 = '';
      this.topTracksArtistOpen = false;
      this.artistasTableOpen = false;
      this.enterTopTracks = false;
      this.enterFilter = false;
      this.topTracksArtistOpen = false;
      this.artistasTableOpen = false;
      this.cardEscolhaOpen = false;
    }else{
      this.cardEscolhaOpen = false;
      this.status2 = '';
      this.status = 'Procure uma música';
      this.topTracksArtistOpen = false;
      this.artistasTableOpen = false;
      this.enterTopTracks = false;
      this.enterFilter = false;
      this.topTracksArtistOpen = false;
      this.artistasTableOpen = false;
      this.playlists = [];
      this.artists = [];
      this.musicsTopTracks = [];
      this.musicsFilterArtist = [];
      this.artistaEscolhido = '';
      this.musicEscolhida = '';
      this.fotoMusicaEscolhida = '';
      this.musicsPlaylists = [];
    }

    console.log(' playlist ' + this.statePlaylist);
    console.log(' pick ' + this.statePickPlaylist);
  }


  // Search por Musica ou Artista

  search(form, bool) {
    if(!this.fromFilterTracks) {
      this.searchOpen = true;
      console.log(this.enterTopTracks);
      if (this.statePickPlaylist === 'artista' && !this.enterTopTracks) {
        console.log('Busca por artista....');
        console.log(form);
        this.spinnerService.show();
        this.getSpotifyService.getArtists(form.inputSearch).subscribe((data) => {
          resetSearch();
          if (data.length === 0) {
            this.spinnerService.hide();
            filtroVazio();
          } else {
            console.log(data);
            form.inputSearch = '';
            this.spinnerService.hide();
            this.artists = data;
            this.artistasTableOpen = true;
          }
        }, (error) => {
          this.spinnerService.hide();
          filtroVazio();
        });
      } else if (this.statePickPlaylist === 'artista' && this.enterTopTracks) {
        this.topTracksArtistOpen = false;
        this.enterFilter = true;
        this.spinnerService.show();
        this.getSpotifyService.getTracksFromArtist(form.inputSearch, this.artistPicked).subscribe((data) => {
          resetSearch();
          console.log(data);
          if (data.length === 0) {
            this.spinnerService.hide();
            filtroVazio();
          } else {
            this.musicsFilterArtist = data;
            this.spinnerService.hide();
            this.trackArtistsFilter = true;
          }
        }, (error) => {
          filtroVazio();
          this.spinnerService.hide();
        });
      } else if (this.statePickPlaylist === 'musica') {
        this.spinnerService.show();
        this.getSpotifyService.getTracksWithoutArtists(form.inputSearch).subscribe((data) => {
          resetSearch();
          console.log(data);
          if (data.length === 0) {
            this.spinnerService.hide();
            filtroVazio();
          } else {
            this.spinnerService.hide();
            this.musicsBytrack = data;
            this.tableByTrackOpen = true;
          }
        }, (error) => {
          this.spinnerService.hide();
          filtroVazio();
        });
      }
    }else {
      this.fromFilterTracks = false;
    }
  }

  topTracksArtist(artist){
    this.status = 'Artista Escolhido';
    this.artistaSelecionado =  artist.name;
    this.status2 = 'Pesquise uma música do artista';
    this.artistPicked = artist.name;
    this.artistasTableOpen = false;
    this.enterTopTracks = true;
    this.spinnerService.show();
    this.getSpotifyService.getTopTracksArtist(artist.id).subscribe((data) => {
      console.log(data);
      this.spinnerService.hide();
      this.musicsTopTracks = data;
      this.topTracksArtistOpen = true;
    }, (error) => {
      this.spinnerService.hide();
      console.log(error);
    });
  }

  showCardFinalEscolha(music){
    this.statusBackUp = this.status;
    this.status2BackUp = this.status2;
    this.tableByTrackOpen = false;
    this.status = 'Sua escolha para discotecar é essa?';
    this.status2 = '';
    this.artistaSelecionado = '';
    console.log(this.artistPicked);
    console.log(this.statePickPlaylist);
    this.musicPicked = music;
    this.cardEscolhaOpen = true;

    this.musicEscolhida = music.name;
    if(this.statePickPlaylist === 'musica'){
      this.artistaEscolhido = music.artist;
    }else{
      this.artistaEscolhido = this.artistPicked;
    }
    this.fotoMusicaEscolhida = music.photoUri;

    this.topTracksArtistOpen = false;
    this.trackArtistsFilter = false;
    this.searchOpen = false;
    console.log(this.artistaEscolhido);
  }

  pickSim(){
    this.musicVoted = {
      artist: this.artistaEscolhido,
      music: this.musicPicked.id,
      name: this.musicEscolhida,
      photoUri: this.fotoMusicaEscolhida

    };
    this.spinnerService.show();
    this.getPlaylistService.putMusicOnPlaylist(this.statePlaylist, this.musicVoted).subscribe((data) => {
      this.status2 = '';
      this.artistaEscolhido = '';
      this.musicEscolhida = '';
      this.fotoMusicaEscolhida = '';
      if(data.description === 'JA EXISTENTE'){
        pickErro();
      }else{
        pickSucesso();
      }
      this.topTracksArtistOpen = false;
      this.enterTopTracks = false
      this.cardEscolhaOpen = false;
      this.trackArtistsFilter = false;
      this.artistaSelecionado = '';
      this.spinnerService.hide();
      this.modifyStatePlaylistVote(this.statePickPlaylist);
      // this.musicsTopTracks = data;
      // this.topTracksArtistOpen = true;
    }, (error) => {
      this.topTracksArtistOpen = false;
      this.cardEscolhaOpen = false;
      this.trackArtistsFilter = false;
      this.enterTopTracks = false;
      this.artistaEscolhido = '';
      this.musicEscolhida = '';
      this.fotoMusicaEscolhida = '';
      this.artistaSelecionado = '';
      this.spinnerService.hide();
      console.log(error);
      pickErro();
    });
  }

  pickNao(){
    if(this.enterFilter === true){
      this.status = this.statusBackUp;
      this.artistaSelecionado =  this.artistaEscolhido;
      this.status2 = this.status2BackUp;
      this.searchOpen = true;
      this.trackArtistsFilter = true;
      this.cardEscolhaOpen = false;
    }if (this.enterFilter === false){
      this.searchOpen = true;
      this.status = this.statusBackUp;
      this.artistaSelecionado =  this.artistaEscolhido;
      this.status2 = this.status2BackUp;
      this.trackArtistsFilter = false;
      this.topTracksArtistOpen = true;
      this.cardEscolhaOpen = false;
    }if(this.statePickPlaylist === 'musica'){
      this.artistaSelecionado = '';
      this.cardEscolhaOpen = false;
      this.tableByTrackOpen = true;
    }
  }

  voltar() {
    console.log(this.statePickPlaylist);
    if (this.cardEscolhaOpen === true && this.statePickPlaylist === 'artista' ){
      this.topTracksArtistOpen = true;
      this.cardEscolhaOpen = false;
    }
      if (this.trackArtistsFilter === true && this.statePickPlaylist === 'artista' ){
        console.log('entrou');
        // this.trackArtistsFilter = false;
        // this.artistasTableOpen = true;
        // this.artists = [];
        // this.topTracksArtistOpen = true;
        // this.enterTopTracks = false;
        // this.enterFilter = false;
        // this.topTracksArtist(this.artistaSelecionado);
        // this.status = 'Procure um artista';
        // this.artistaSelecionado = '';
        // this.status2 = '';

        this.searchOpen = true;
        this.status = this.statusBackUp;
        this.status2 = this.status2BackUp;
        this.trackArtistsFilter = false;
        this.topTracksArtistOpen = true;
        this.cardEscolhaOpen = false;
        this.enterTopTracks = true;
        this.teste();
        // const search = {
        //   inputSearch: this.artistaSelecionado
        // }
        // this.search(search);
        this.fromFilterTracks = true;
      } else if (this.topTracksArtistOpen === true && this.statePickPlaylist === 'artista'){
        this.fromFilterTracks = false;
        console.log('ebtrou 2');
        this.topTracksArtistOpen = false;
        this.artistasTableOpen = true;
        this.artists = [];
        this.enterTopTracks = false;
        this.enterFilter = false;
        this.status = 'Procure um artista';
        this.artistaSelecionado = '';
        this.status2 = '';
      }
      if(this.cardEscolhaOpen === true && this.statePickPlaylist === 'musica'){
        this.fromFilterTracks = false;
        this.cardEscolhaOpen = false;
        this.tableByTrackOpen = true;
        this.artistaSelecionado = '';
      }
  }

  teste(){
    this.status = 'Artista Escolhido';
    this.status2 = 'Pesquise uma música do artista';
    console.log(this.status + ' ' + this.status2);
  }

  //Estados views

  //Abertura Search Box
  openSearchInput() {
    if (this.searchOpen) {
      return true;
    } else {
      return false;
    }
  }

  //Abertura Pesquisa pela musica
  openSearchMusic(){
    if (this.tableByTrackOpen) {
      return true;
    } else {
      return false;
    }
  }

  //Abertura Artistas Table

  openArtistasTable() {
    if (this.artistasTableOpen) {
      return true;
    } else {
      return false;
    }
  }


  openHome() {
    if (this.homeOpen) {
      return true;
    } else {
      return false;
    }
  }

  //Abertura Top Tracks Artist Table
  openTracksArtisFilter(){
    if (this.trackArtistsFilter) {
      return true;
    } else {
      return false;
    }
  }

  openTopTracksArtist(){
    if (this.topTracksArtistOpen) {
      return true;
    } else {
      return false;
    }
  }

  openCardEscolha(){
    if (this.cardEscolhaOpen) {
      return true;
    } else {
      return false;
    }
  }

  byMusic(){
    if (this.statePickPlaylist === 'artista' && this.status2 !== '') {
      return true;
    } else {
      return false;
    }
  }





  //****************************** Get Music ******************************* Fim


  modifyStatePlaylistPickView(playlist){
    console.log('Entrou..')
    this.homeOpen = false;
    this.status2 = '';
    this.status = 'Playlist';
    this.artistaSelecionado = '';
    this.artistaSelecionado = playlist.toUpperCase();
    this.topTracksArtistOpen = false;
    this.tableByTrackOpen = false;
    this.artistasTableOpen = false;
    this.enterTopTracks = false;
    this.enterFilter = false;
    this.topTracksArtistOpen = false;
    this.artistasTableOpen = false;
    this.searchOpen = false;
    this.cardEscolhaOpen = false;
    this.trackArtistsFilter = false;
    this.musicPlaylistOpen = false;
    this.musicPicked = null;
    this.voteCardOpen = false;
    this.musicVoted = null;
    this.playlists = [];
    this.artists = [];
    this.musicsTopTracks = [];
    this.musicsFilterArtist = [];
    this.artistaEscolhido = '';
    this.musicEscolhida = '';
    this.fotoMusicaEscolhida = '';
    this.musicPlaylistOpen = true;



    this.statePickPlaylist = playlist;
    this.spinnerService.show();
    this.getPlaylistService.getMusicsOnPlaylist(playlist).subscribe((data) => {
      this.spinnerService.hide();
      if(data.trackSelectedModelList.length === 0){
        playlistSemMusica();
      }
      this.musicsPlaylists = data.trackSelectedModelList;
      // this.topTracksArtistOpen = true;
    }, (error) => {
      this.spinnerService.hide();
      console.log(error);
    });
  }

  votar(music){
    this.status = 'Certeza que quer votar nessa música?'
    this.artistaSelecionado = '';
    console.log(music);
    this.musicVotedArtist = music.artist;
    this.musicVotedId = music.music;
    this.musicVotedName = music.name;
    this.musicVotedPhotoUri = music.photoUri;
    this.musicPlaylistOpen = false;
    this.voteCardOpen = true;
  }

  voteSim(){
    this.spinnerService.show();
    this.getPlaylistService.voteMusicsOnPlaylist(this.statePickPlaylist, localStorage.getItem('email'),  this.musicVotedId).subscribe((data) => {
      console.log(data);
      this.spinnerService.hide();
      votoSucesso();
      this.voteCardOpen = false;
      this.musicPlaylistOpen = true;
      this.modifyStatePlaylistPickView(this.statePickPlaylist);
      // this.topTracksArtistOpen = true;
    }, (error) => {
      console.log(error);
      this.spinnerService.hide();
      votoErro();
    });
  }

  voteNao() {
    this.voteCardOpen = false;
    this.musicPlaylistOpen = true;
    this.modifyStatePlaylistPickView(this.statePickPlaylist);
  }

  openMusicPlaylistOpen(){
    if (this.musicPlaylistOpen) {
      return true;
    } else {
      return false;
    }
  }

  openVoteCard(){
    if (this.voteCardOpen) {
      return true;
    } else {
      return false;
    }
  }

}
