import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {SocialLoginModule, AuthServiceConfig} from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
import {LoginPageComponent} from './login-page/login-page.component';
import {JukeboxHomeComponent} from './jukebox-home/jukebox-home.component';
import {DynamicScriptLoaderService} from './services/dynamicScriptLoader/dynamic-script-loader.service';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: '', component: LoginPageComponent},
  {path: '', component: LoginPageComponent},
  {path: 'jukebox', component: JukeboxHomeComponent}];

const config = new AuthServiceConfig([
  // {
  //   id: GoogleLoginProvider.PROVIDER_ID,
  //   provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
  // },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1030532580488866')
  }
]);


export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    JukeboxHomeComponent
  ],
  imports: [
    SocialLoginModule,
    RouterModule.forRoot(routes),
    BrowserModule
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    DynamicScriptLoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
