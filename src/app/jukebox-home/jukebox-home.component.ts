import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventsService} from './../services/events/events.service';
import {SpotifyService} from './../services/spotify/spotify.service';
import {PlaylistService} from './../services/playlist/playlist.service';

declare const run: any;
declare const pickSucesso: any;
declare const pickErro: any;
declare const votoSucesso: any;
declare const votoErro: any;

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

  // estado playlists e situacao de escolha
  artistPicked;
  musicPicked;
  musicVoted;
  enterTopTracks = false;
  enterFilter = false;
  statePlaylist = '';
  statePickPlaylist = '';
  status = '';
  status2 = '';

  //estado views
  voteCardOpen = false;
  musicPlaylistOpen = false;

  tableByTrackOpen = false;
  topTracksArtistOpen = false;
  artistasTableOpen = false;
  searchOpen = false;
  cardEscolhaOpen = false;
  trackArtistsFilter = false;

  constructor(private router: Router, private eventService: EventsService, private spotifyService: SpotifyService, private playlistService: PlaylistService) {
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
    this.getEventService.getPlaylistFromEventByName().subscribe((data) => {
      console.log(data);
      console.log(data.playlists);
      this.playlists = data.playlists;
    }, (error) => {
      console.log(error);
    });
  }

  //********** chamadas service  Fim *****************


  //Controla o estado das playlists escolhidas

  modifyStatePlaylistPick(playlist) {
    this.statePlaylist = playlist;
    console.log(this.statePlaylist);
  }

  //Controla o estado do metodo de escolha | por musica ou por artista

  modifyStatePlaylistVote(pick) {
    this.musicPlaylistOpen = false;
    this.voteCardOpen = false;
    this.musicsPlaylists = [];
    this.statePickPlaylist = pick;
    this.searchOpen = true;
    if(pick === 'artista'){
      this.getArtistsFromPlaylistPostgre();
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


  // Search por Musica ou Artista no Spotify

  // search(form) {
  //   this.searchOpen = true;
  //   console.log(this.enterTopTracks);
  //   if (this.statePickPlaylist === 'artista' && !this.enterTopTracks) {
  //     console.log('Busca por artista....');
  //     console.log(form);
  //     this.getSpotifyService.getArtists(form.inputSearch).subscribe((data) => {
  //       console.log(data);
  //       this.artists = data;
  //       this.artistasTableOpen = true;
  //     }, (error) => {
  //       console.log(error);
  //     });
  //   } else if (this.statePickPlaylist === 'artista' && this.enterTopTracks) {
  //     this.topTracksArtistOpen = false;
  //     this.enterFilter = true;
  //     this.getSpotifyService.getTracksFromArtist(form.inputSearch, this.artistPicked).subscribe((data) => {
  //       console.log(data);
  //       this.musicsFilterArtist = data;
  //       this.trackArtistsFilter = true;
  //     }, (error) => {
  //       console.log(error);
  //     });
  //   } else if (this.statePickPlaylist === 'musica'){
  //     this.getSpotifyService.getTracksWithoutArtists(form.inputSearch).subscribe((data) => {
  //       console.log(data);
  //       this.musicsBytrack = data;
  //       this.tableByTrackOpen = true;
  //     }, (error) => {
  //       console.log(error);
  //     });
  //   }
  // }

  getArtistsFromPlaylistPostgre(){
    console.log(this.statePlaylist)
    this.getSpotifyService.getArtistsByPlaylist('0ko1DVT9Z0zoWgSxPfzaly').subscribe((data) => {
      console.log(data);
      this.artists = data;
      this.artistasTableOpen = true;
    }, (error) => {
      console.log(error);
    });
  }


  search(form) {
    this.searchOpen = true;
    console.log(this.enterTopTracks);
    if (this.statePickPlaylist === 'artista' && !this.enterTopTracks) {
      console.log('Busca por artista....');
      console.log(form);
      if(form.inputSearch !== '' || form.inputSearch !== null || form.inputSearch !== undefined ){
        this.getSpotifyService.getArtistPostgree(form.inputSearch , '0ko1DVT9Z0zoWgSxPfzaly').subscribe((data) => {
          console.log(data);
          this.artists = data;
          this.artistasTableOpen = true;
        }, (error) => {
          console.log(error);
        });
      }else {
        this.getArtistsFromPlaylistPostgre();
      }
    } else if (this.statePickPlaylist === 'artista' && this.enterTopTracks) {
      this.topTracksArtistOpen = false;
      this.enterFilter = true;
      this.getSpotifyService.getTracksFilterByArtist( this.artistPicked, form.inputSearch, '0ko1DVT9Z0zoWgSxPfzaly').subscribe((data) => {
        console.log(data);
        this.musicsFilterArtist = data;
        this.trackArtistsFilter = true;
      }, (error) => {
        console.log(error);
      });
    } else if (this.statePickPlaylist === 'musica'){
      this.getSpotifyService.getMusics(form.inputSearch, '0ko1DVT9Z0zoWgSxPfzaly').subscribe((data) => {
        console.log(data);
        this.musicsBytrack = data;
        this.tableByTrackOpen = true;
      }, (error) => {
        console.log(error);
      });
    }
  }

  topTracksArtist(artist){
    this.status = 'Artista Escolhido: ' + artist.name;
    this.status2 = 'Pesquise uma música do artista';
    this.artistPicked = artist.name;
    this.artistasTableOpen = false;
    this.enterTopTracks = true;
    this.getSpotifyService.getTracksByArtist(artist.name, '0ko1DVT9Z0zoWgSxPfzaly').subscribe((data) => {
      console.log(data);
      this.musicsTopTracks = data;
      this.topTracksArtistOpen = true;
    }, (error) => {
      console.log(error);
    });

  }

  showCardFinalEscolha(music){
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
    this.getPlaylistService.putMusicOnPlaylist(this.statePlaylist, this.musicVoted).subscribe((data) => {
      console.log(data);
      this.modifyStatePlaylistVote(this.statePickPlaylist);
      // this.musicsTopTracks = data;
      // this.topTracksArtistOpen = true;
      pickSucesso();
    }, (error) => {
      console.log(error);
      pickErro();
    });
  }

  pickNao(){
    if(this.enterFilter === true){
      this.searchOpen = true;
      this.trackArtistsFilter = true;
      this.cardEscolhaOpen = false;
    }if (this.enterFilter === false){
      this.searchOpen = true;
      this.trackArtistsFilter = false;
      this.topTracksArtistOpen = true;
      this.cardEscolhaOpen = false;
    }if(this.statePickPlaylist === 'musica'){
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
        console.log('aqui 2');
        this.getSpotifyService.getArtistPostgree(this.artistPicked , '0ko1DVT9Z0zoWgSxPfzaly').subscribe((data) => {
          console.log(data);
          this.artists = data;
          this.artistasTableOpen = true;
        }, (error) => {
          console.log(error);
        });
        this.enterTopTracks = true;
      }
      if (this.topTracksArtistOpen === true && this.statePickPlaylist === 'artista'){
        this.getArtistsFromPlaylistPostgre();
        this.topTracksArtistOpen = false;
        this.artistasTableOpen = true;
        this.artists = [];
        this.enterTopTracks = false;
        this.enterFilter = false;
        this.status = 'Procure um artista';
        this.status2 = '';
        console.log('aqui 3');
      }
      if(this.cardEscolhaOpen === true && this.statePickPlaylist === 'musica'){
        this.cardEscolhaOpen = false;
        this.tableByTrackOpen = true;
      }
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
    this.status2 = '';
    this.status = 'Playlist: ' + playlist;
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

    this.getPlaylistService.getMusicsOnPlaylist(playlist).subscribe((data) => {
      console.log(data.trackSelectedModelList);
      this.musicsPlaylists = data.trackSelectedModelList;
      // this.topTracksArtistOpen = true;
    }, (error) => {
      console.log(error);
    });
  }

  votar(music){
    console.log(music);
    this.musicVotedArtist = music.artist;
    this.musicVotedId = music.music;
    this.musicVotedName = music.name;
    this.musicVotedPhotoUri = music.photoUri;
    this.musicPlaylistOpen = false;
    this.voteCardOpen = true;
  }

  voteSim(){
    this.getPlaylistService.voteMusicsOnPlaylist(this.statePickPlaylist, localStorage.getItem('email'),  this.musicVotedId).subscribe((data) => {
      console.log(data);
      votoSucesso();
      this.voteCardOpen = false;
      this.musicPlaylistOpen = true;
      this.modifyStatePlaylistPickView(this.statePickPlaylist);
      // this.topTracksArtistOpen = true;
    }, (error) => {
      console.log(error);
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
