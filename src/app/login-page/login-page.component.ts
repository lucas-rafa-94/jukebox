import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './../services/login/login.service';
import {AuthService} from 'angularx-social-login';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {NgxSpinnerService} from 'ngx-spinner';


declare const cadastro: any;
declare const cadastroErro: any;
declare const loginSucesso: any;
declare const loginErro: any;
declare const emailEncontrado: any;
declare const resetPassErro: any;
declare const resetPassSucesso: any;
declare const emailInvalido: any;
declare const senhaInvalida: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})




export class LoginPageComponent implements OnInit {



  private user: SocialUser;
  private loggedIn: boolean;
  getLoginService;
  emailNovaSenha = '';
  loginState = true;
  cadastroState = false;
  esqueceuSenhaEmailState = false;
  redigiteSenhaState = false;

  constructor(private router: Router, private spinnerService: NgxSpinnerService, private authService: AuthService, private loginService: LoginService) {
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
      this.router.navigate(['index.html']);
    }
  }

  login(form) {
    console.log(form);
    // Login Usuario por email & Senha
    this.spinnerService.show();
    this.getLoginService.submitForm(form).subscribe((data) => {
      console.log(data);
      if (data == null) {
        console.log('nulll');
        loginErro();
      } else {
        // Se login com sucesso adiciona evento ao usuario **** atualmente fixado 'jukebox'
        this.getLoginService.addEventUser(form.email).subscribe((data2) => {
          this.spinnerService.hide();
          localStorage.setItem('email', form.email);
          console.log(data2);
          this.router.navigate(['jukebox']);
          loginSucesso();
        }, (error2) => {
          this.spinnerService.hide();
          loginErro();
        });
      }
    }, (error) => {
      this.spinnerService.hide();
      loginErro();
    });
    this.spinnerService.hide();
  }

  cadastroForm(form2) {
    this.spinnerService.show();
    let bool = true;
    if(!form2.email.includes('@')){
      emailInvalido();
      bool = false;
    }else if(form2.password.length <= 5){
      bool = false;
      senhaInvalida();
    }
    if(bool) {
      this.getLoginService.createUser(form2).subscribe((data) => {
        this.spinnerService.hide();
        console.log(data);
        cadastro();
        this.loginState = true;
        this.cadastroState = false;

      }, (error2) => {
        this.spinnerService.hide();
        cadastroErro();
      });
    }else{
      this.spinnerService.hide();
    }

  }


  esqueceuSenhaEmailForm(form) {
    console.log(form.email);
    this.spinnerService.show();
    this.getLoginService.getUserByEmail(form.email).subscribe((data) => {
      this.spinnerService.hide();
      console.log(data);
      // cadastro();
      this.loginState = false;
      this.cadastroState = false;
      if(data != null){
        this.openRedigiteSenha();
        this.emailNovaSenha = form.email;
        emailEncontrado(true);
      }else{
        emailEncontrado(false);
      }
    }, (error2) => {
      this.spinnerService.hide();
      emailEncontrado(false);
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
    this.redigiteSenhaState = false;
    this.esqueceuSenhaEmailState = false;
  }

  openRedigiteSenha(){
    this.cadastroState = false;
    this.loginState = false;
    this.esqueceuSenhaEmailState = false;
    this.redigiteSenhaState = true;
  }

  cadastorOpen(){
    if(this.cadastroState){
      return true;
    }else{
      return false;
    }
  }

  esqueceuSenhaEmailOpen(){
    if(this.esqueceuSenhaEmailState){
      return true;
    }else{
      return false;
    }
  }
  openEsqueceuSenhaEmail(){
    this.esqueceuSenhaEmailState = true;
    this.loginState = false;
    this.redigiteSenhaState = false;
    this.cadastroState = false;
  }


  redigiteNovaSenhaOpen(){
    if(this.redigiteSenhaState){
      return true;
    }else{
      return false;
    }
  }

  closeRedigiteNovaSenha(form){
    form = '';
    this.emailNovaSenha = '';
    this.cadastroState = false;
    this.loginState = false;
    this.redigiteSenhaState = false;
    this.esqueceuSenhaEmailState = true;
  }

  closeEsqueceuSenhaEmail(form){
    form = '';
    this.emailNovaSenha = '';
    this.cadastroState = false;
    this.loginState = true;
    this.redigiteSenhaState = false;
    this.esqueceuSenhaEmailState = false;
  }

  closeCadastro(form){
    form = '';
    this.emailNovaSenha = '';
    this.cadastroState = false;
    this.loginState = true;
    this.redigiteSenhaState = false;
    this.esqueceuSenhaEmailState = false;
  }

  redigiteSenhaForm(form){
    let bool = false;
    if(form.newPass !== form.reNewPass){
      resetPassErro('Senhas não batem! Tente novamente');
    }
    if(form.newPass === '' || form.reNewPass === ''){
      resetPassErro('Senhas não preenchidas! Tente novamente');
    }

    if(form.newPass === form.reNewPass && form.newPass.length <= 5){
      senhaInvalida();
    }

    if((form.newPass === form.reNewPass && form.newPass !== '' || form.reNewPass !== '') &&  form.newPass.length > 5){
      bool = true;
    }
    if(bool){
      const user = {
        password: form.newPass,
        email: this.emailNovaSenha
      };
      this.spinnerService.show();
      this.getLoginService.updatePasswordUser(user).subscribe((data) => {
        this.spinnerService.hide();
        console.log(data);
        resetPassSucesso('Senha trocada com sucesso!');
        this.loginState = true;
        this.cadastroState = false;
        this.esqueceuSenhaEmailState = false;
        this.redigiteSenhaState = false;
        this.emailNovaSenha = '';

      }, (error2) => {
        this.spinnerService.hide();
        resetPassErro('Erro ao trocar senha :( Tente mais tarde');
      });
    }
  }
}
