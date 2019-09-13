import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jukebox';

  constructor(private router: Router) { this.getToken(); }

  getToken() {
    if (localStorage.getItem('currentToken') !== '') {
      console.log('entrou ++++');
      this.router.navigate(['index.html']);
    }else{
      this.router.navigate(['']);
    }
  }
}
