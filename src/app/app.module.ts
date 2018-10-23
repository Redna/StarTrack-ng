import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ShellPage } from './pages/shell/shell.page';
import { TrackDetailPage } from './pages/track-detail/track-detail.page';
import { SearchPage } from './pages/search/search.page';
import { MenulistComponent } from './components/menulist/menulist.component';
import { MusicCardPlaceholderComponent } from './components/music-card-placeholder/music-card-placeholder.component';
import { MusicCardComponent } from './components/music-card/music-card.component';
import { TimePipeModule } from './pipes/ms-to-mins/ms-to-mins.module';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from './directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorThiefService } from './providers/color-thief/color-thief.service';

@NgModule({
  declarations: [
    AppComponent,
    ShellPage,
    SearchPage,
    TrackDetailPage,
    MenulistComponent,
    MusicCardPlaceholderComponent,
    MusicCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: ShellPage },
      {
        path: 'search',
        component: SearchPage
      },
      {
        path: 'detail/:id',
        component: TrackDetailPage
      },
      { path: '**', redirectTo: '/detail/299608205', pathMatch: 'full' }
    ]),
    IonicModule.forRoot(),
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__startTrack'
    }),
    TimePipeModule,
    CommonModule,
    DirectivesModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StatusBar,
    SplashScreen,
    ColorThiefService
  ],
  entryComponents: [
    MenulistComponent,
    MusicCardPlaceholderComponent,
    MusicCardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
