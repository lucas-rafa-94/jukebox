import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { JukeboxHomeComponent } from './jukebox-home/jukebox-home.component';
import {DynamicScriptLoaderService} from './services/dynamicScriptLoader/dynamic-script-loader.service';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent},
  { path: '', component: LoginPageComponent},
  { path: '', component: LoginPageComponent},
  { path: 'jukebox', component: JukeboxHomeComponent}];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    JukeboxHomeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule
  ],
  exports: [RouterModule],
  providers: [DynamicScriptLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
