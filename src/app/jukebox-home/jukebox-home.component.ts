import { Component, OnInit } from '@angular/core';
import {DynamicScriptLoaderService} from '../services/dynamicScriptLoader/dynamic-script-loader.service';
import {Router} from '@angular/router';

declare const run: any;

@Component({
  selector: 'app-jukebox-home',
  templateUrl: './jukebox-home.component.html',
  styleUrls: ['./jukebox-home.component.css']
})
export class JukeboxHomeComponent implements OnInit {
  getscriptLoaderService;

  constructor(private router: Router, scriptLoaderService: DynamicScriptLoaderService) {
    this.getscriptLoaderService = scriptLoaderService;
  }

  ngOnInit() {
    run();
  }

  // private loadScripts() {
  //   // You can load multiple scripts by just providing the key as argument into load method of the service
  //   this.getscriptLoaderService.load('classie', 'main', 'modernizr-custom' ).then(data => {
  //     console.log('Entrou');
  //   }).catch(error => console.log(error));
  // }

}
