import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './../services/login/login.service';
import {AuthService} from 'angularx-social-login';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';


declare const cadastro: any;
declare const cadastroErro: any;
declare const loginSucesso: any;
declare const loginErro: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})



export class LoginPageComponent implements OnInit {



  private user: SocialUser;
  private loggedIn: boolean;
  getLoginService;

  loginState = true;
  cadastroState = false;

  constructor(private router: Router, private authService: AuthService, private loginService: LoginService) {
    this.getLoginService = loginService;
    this.getTokenSession();
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  getTokenSession() {
    console.log(localStorage.getItem('email'));
    if (localStorage.getItem('email') &&  localStorage.getItem('email') !== '') {
      this.router.navigate(['/jukebox']);
    }
  }

  login(form) {
      console.log(form);
      // Login Usuario por email & Senha
      this.getLoginService.submitForm(form).subscribe((data) => {
        console.log(data);
        if (data == null) {
          console.log('nulll');
          loginErro();
        } else {
          // Se login com sucesso adiciona evento ao usuario **** atualmente fixado 'jukebox'
          this.getLoginService.addEventUser(form.email).subscribe((data2) => {
            localStorage.setItem('email', form.email);
            console.log(data2);
            this.router.navigate(['jukebox']);
            loginSucesso();
          }, (error2) => {
            loginErro();
          });
        }
      }, (error) => {
        loginErro();
      });
  }

  cadastroForm(form2) {

      this.getLoginService.createUser(form2).subscribe((data) => {
        console.log(data);
        cadastro();
        this.loginState = true;
        this.cadastroState = false;

      }, (error2) => {
        cadastroErro();
      });

  }


  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    console.log(this.user.email);
    console.log(this.user.name);
    this.router.navigate(['jukebox']);
  }

  loginOpen(){
    if(this.loginState){
      return true;
    }else{
      return false;
    }
  }

  openCadastro(form){
    form = '';
    this.cadastroState = true;
    this.loginState = false;
  }

  cadastorOpen(){
    if(this.cadastroState){
      return true;
    }else{
      return false;
    }
  }


}
