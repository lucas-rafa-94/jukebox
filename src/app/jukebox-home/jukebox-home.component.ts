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
declare const sugestaoEnviada: any;
declare const resetSearch: any;
declare const resetSugestao: any;

@Component({
  selector: 'app-jukebox-home',
  templateUrl: './jukebox-home.component.html',
  styleUrls: ['./jukebox-home.component.css']
})
export class JukeboxHomeComponent implements OnInit {

  statusBackUp = '';
  status2BackUp = '';

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
  naoEncontrou = false;
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
    // this.getPlaylistsFromEvent();
    this.getHomeOpen();
  }

  getHomeOpen(){
    this.limpar();
    this.artistaSelecionado = 'Top 10';
    this.status2 = 'As 10 mais votadas até o momento';
    this.homeOpen = true;
    this.top10();
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
      this.spinnerService.show();
      this.getSpotifyService.getArtistPostgree('' , 'pop').subscribe((data) => {
        this.spinnerService.hide();
        console.log(data);
        this.artists = data;
        this.artistasTableOpen = true;
      }, (error) => {
        this.spinnerService.hide();
        console.log(error);
      });
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

  statePlaylistEnum(playlist){
   if (playlist === 'rock'){
      return '40PNoxzLwSYluVPMBMZ5qv';
    }else if (playlist === 'pop'){
      return '5jn5kVe5F7jb8aCxLFfYIN';
    }else if (playlist === 'funk'){
      return '6QpDM66HkqUVO44j7dXbFl';
    }else if (playlist === 'hip-hop'){
      return '3tdS0tKGr1tB2J10riEDYF';
    }
  }

  getArtistsFromPlaylistPostgre(){
    console.log(this.statePlaylist)
    console.log('pop')
    this.spinnerService.show();
    this.getSpotifyService.getArtistsByPlaylist('pop').subscribe((data) => {
      resetSearch();
      this.spinnerService.hide();
      console.log(data);
      this.artists = data;
      this.artistasTableOpen = true;
    }, (error) => {
      resetSearch();
      this.spinnerService.hide();
      console.log(error);
    });
  }

  // Search por Musica ou Artista

  search(form) {
    this.searchOpen = true;
    console.log(this.enterTopTracks);
    if (this.statePickPlaylist === 'artista' && !this.enterTopTracks) {
      console.log('Busca por artista....');
      console.log(form);
      if(form.inputSearch !== '' || form.inputSearch !== null || form.inputSearch !== undefined ){
        this.spinnerService.show();
        this.getSpotifyService.getArtistPostgree(form.inputSearch , 'pop').subscribe((data) => {
          resetSearch();
          this.spinnerService.hide();
          console.log(data);
          if(data.length === 0){
            filtroVazio();
          }
          this.artists = data;
          this.artistasTableOpen = true;
        }, (error) => {
          resetSearch();
          this.spinnerService.hide();
          console.log(error);
        });
      }else {
        this.getArtistsFromPlaylistPostgre();
      }
    } else if (this.statePickPlaylist === 'artista' && this.enterTopTracks) {
      this.topTracksArtistOpen = false;
      this.enterFilter = true;
      this.spinnerService.show();
      this.getSpotifyService.getTracksFilterByArtist( this.artistPicked, form.inputSearch, 'pop').subscribe((data) => {
        resetSearch();
        this.spinnerService.hide();
        console.log(data);
        if(data.length === 0){
          filtroVazio();
          this.musicsFilterArtist = data;
          this.trackArtistsFilter = true;
        }else {
          resetSearch();
          this.musicsFilterArtist = data;
          this.trackArtistsFilter = true;
        }
      }, (error) => {
        resetSearch();
        this.spinnerService.hide();
        console.log(error);
      });
    } else if (this.statePickPlaylist === 'musica'){
      this.spinnerService.show();
      this.getSpotifyService.getMusics(form.inputSearch, 'pop').subscribe((data) => {
        this.spinnerService.hide();
        console.log(data);
        if(data.length === 0){
          filtroVazio();
          this.musicsBytrack = data;
          this.tableByTrackOpen = true;
        }else {
          this.musicsBytrack = data;
          this.tableByTrackOpen = true;
        }

      }, (error) => {
        this.spinnerService.hide();
        console.log(error);
      });
    }
  }

  topTracksArtist(artist){
    this.status = 'Artista Escolhido' ;
    this.artistaSelecionado =  artist.name;
    this.status2 = 'Pesquise uma música do artista';
    this.artistPicked = artist.name;
    this.artistasTableOpen = false;
    this.enterTopTracks = true;
    this.spinnerService.show();
    this.getSpotifyService.getTracksByArtist(artist.name, 'pop').subscribe((data) => {
      this.spinnerService.hide();
      console.log(data);
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
    this.status = 'Sua escolha para discotecar é essa?';
    this.status2 = '';
    this.artistaSelecionado = '';
    this.tableByTrackOpen = false;
    console.log(this.artistPicked);
    console.log(this.statePickPlaylist);
    this.musicPicked = music;
    this.cardEscolhaOpen = true;

    this.musicEscolhida = music.music;
    if(this.statePickPlaylist === 'musica'){
      this.artistaEscolhido = music.artist;
    }else{
      this.artistaEscolhido = this.artistPicked;
    }
    this.fotoMusicaEscolhida = music.uriImage;

    this.topTracksArtistOpen = false;
    this.trackArtistsFilter = false;
    this.searchOpen = false;
    console.log(this.artistaEscolhido);
  }


  pickSim(){
    console.log("ooooook");
    this.musicVoted = {
      artist: this.artistaEscolhido,
      music: this.musicPicked.id,
      name: this.musicEscolhida,
      photoUri: this.fotoMusicaEscolhida

    };
    this.spinnerService.show();
    this.getPlaylistService.putMusicOnPlaylist('pop', this.musicVoted).subscribe((data) => {
      this.spinnerService.hide();
      console.log(data);
      if(data.description === 'JA EXISTENTE'){
        pickErro();
      }else{
        pickSucesso();
      }
      this.modifyStatePlaylistVote(this.statePickPlaylist);
      // this.musicsTopTracks = data;
      // this.topTracksArtistOpen = true;
      // pickSucesso();
    }, (error) => {
      this.spinnerService.hide();
      console.log(error);
      pickErro();
    });
  }

  pickNao(){
    if(this.enterFilter === true){
      console.log('1');
      this.searchOpen = true;
      this.status = this.statusBackUp;
      this.artistaSelecionado =  this.artistaEscolhido;
      this.status2 = this.status2BackUp;
      this.trackArtistsFilter = true;
      this.cardEscolhaOpen = false;
    }if (this.enterFilter === false){
      this.status = this.statusBackUp;
      this.artistaSelecionado =  this.artistaEscolhido;
      this.status2 = this.status2BackUp;
      console.log('2');
      this.searchOpen = true;
      this.trackArtistsFilter = false;
      this.topTracksArtistOpen = true;
      this.cardEscolhaOpen = false;
    }if(this.statePickPlaylist === 'musica'){
      this.artistaSelecionado =  '';
      this.cardEscolhaOpen = false;
      this.tableByTrackOpen = true;
    }
  }

  voltar() {
    console.log(this.statePickPlaylist);
    if (this.cardEscolhaOpen === true && this.statePickPlaylist === 'artista' ){
      this.topTracksArtistOpen = true;
      this.cardEscolhaOpen = false;
      console.log('aqui 1');
    }
    if (this.trackArtistsFilter === true && this.statePickPlaylist === 'artista' ){
      this.trackArtistsFilter = false;
      this.topTracksArtistOpen = true;
      this.artists = [];
      this.enterTopTracks = true;
      this.enterFilter = false;
      this.status = 'Procure um artista';
      this.status2 = '';
      this.artistaSelecionado = '';
      console.log('aqui 2');
      this.spinnerService.show();
      this.getSpotifyService.getArtistPostgree('' , 'pop').subscribe((data) => {
        this.spinnerService.hide();
        console.log(data);
        this.artists = data;
        this.artistasTableOpen = true;
      }, (error) => {
        this.spinnerService.hide();
        console.log(error);
      });
      this.enterTopTracks = true;
      // this.getArtistsFromPlaylistPostgre();
      // this.topTracksArtistOpen = false;
      // this.artistasTableOpen = true;
      // this.artists = [];
      // this.enterTopTracks = false;
      // this.enterFilter = false;
      // this.status = 'Procure um artista';
      // this.status2 = '';
    }
    if (this.topTracksArtistOpen === true && this.statePickPlaylist === 'artista'){
      // this.getArtistsFromPlaylistPostgre();
      this.topTracksArtistOpen = false;
      this.artistasTableOpen = true;
      this.artists = [];
      this.enterTopTracks = false;
      this.enterFilter = false;
      this.status = 'Procure um artista';
      this.artistaSelecionado = '';
      this.status2 = '';
      console.log('aqui 3');
      this.spinnerService.show();
      this.getSpotifyService.getArtistPostgree('' , 'pop').subscribe((data) => {
        this.spinnerService.hide();
        resetSearch();
        console.log(data);
        this.artists = data;
        this.artistasTableOpen = true;
      }, (error) => {
        this.spinnerService.hide();
        resetSearch();
        console.log(error);
      });
    }
    if(this.cardEscolhaOpen === true && this.statePickPlaylist === 'musica'){
      this.artistaSelecionado = '';
      this.cardEscolhaOpen = false;
      this.tableByTrackOpen = true;
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


  modifyStatePlaylistPickView(){
    this.naoEncontrou = false;
    this.homeOpen = false;
    this.status2 = '';
    this.status = '';
    this.artistaSelecionado = 'Vote em uma música para ser tocada';
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



    // this.statePickPlaylist = playlist;
    this.spinnerService.show();
    this.getPlaylistService.getMusicsOnPlaylist('pop').subscribe((data) => {
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


  top10(){
    this.spinnerService.show();
    this.getPlaylistService.getMusicsOnPlaylistTop10().subscribe((data) => {
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

  openNaoEncontrou(){
    if (this.naoEncontrou) {
      return true;
    } else {
      return false;
    }
  }
  limpar(){
    this.status = '';
    this.status2 = '';
    this.naoEncontrou = false;
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
    this.musicPlaylistOpen = false;

  }


  abrirNaoEncontrou(){
    this.status = '';
    this.status2 = '';
    this.status = 'Dê sua sugestão de música para a próxima festa :)';
    this.artistaSelecionado = '';
    this.naoEncontrou = true;
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
    this.homeOpen = false;
    this.artists = [];
    this.musicsTopTracks = [];
    this.musicsFilterArtist = [];
    this.artistaEscolhido = '';
    this.musicEscolhida = '';
    this.fotoMusicaEscolhida = '';
    this.musicPlaylistOpen = false;
  }

  postSugestao(form){
    let sugestao = {
      description: '',
      email: ''
    };
    console.log(form);
    sugestao.description = form.inputText;
    sugestao.email = localStorage.getItem('email')
    console.log(sugestao);
    this.spinnerService.show();
    this.getSpotifyService.postSugestao(sugestao).subscribe((data) => {
      this.spinnerService.hide();
      console.log(data);
      sugestao.description = '';
      sugestao.email = '';
      sugestaoEnviada(true);
      resetSugestao();
    }, (error) => {
      this.spinnerService.hide();
      console.log(error);
      sugestao.description = '';
      sugestao.email = '';
      sugestaoEnviada(false);
      resetSugestao();
    });
  }


}
