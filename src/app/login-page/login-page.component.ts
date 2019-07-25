import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './../services/login/login.service';
import {AuthService} from 'angularx-social-login';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;
  getLoginService;

  constructor(private router: Router, private authService: AuthService, private loginService: LoginService) {
    this.getLoginService = loginService;
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  login(form) {
    console.log(form);
    // Login Usuario por email & Senha
    this.getLoginService.submitForm(form).subscribe((data) => {
      console.log(data);
      if (data == null) {
        console.log('nulll');
      } else {
        // Se login com sucesso adiciona evento ao usuario **** atualmente fixado 'jukebox'
        this.getLoginService.addEventUser(form.email).subscribe((data2) => {
          localStorage.setItem('email', form.email);
          console.log(data2);
          this.router.navigate(['jukebox']);
        }, (error2) => {

        });
      }
    }, (error) => {

    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    console.log(this.user.email);
    console.log(this.user.name);
    this.router.navigate(['jukebox']);
  }


}
