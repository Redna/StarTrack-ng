import { Component, OnInit } from '@angular/core';
import { Platform, Events } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public favorites = [];
  constructor(
    plt: Platform,
    statusBar: StatusBar,
    splash: SplashScreen,
    private storage: Storage,
    private event: Events
  ) {
    plt.ready().then(() => {
      statusBar.styleLightContent();
      splash.hide();
    });
  }
  async ngOnInit() {
    this.getKeys();
    this.event.subscribe(
      'songAdded',
      e => (this.favorites = [...this.favorites, e])
    );
    this.event.subscribe('songRemoved', e => {
      console.log(e);
      return (this.favorites = this.favorites.filter(
        entry => entry.trackId !== e.trackId
      ));
    });
  }
  getKeys() {
    this.storage
      .forEach(entry => {
        if (typeof entry !== 'boolean') {
          this.favorites.push(entry);
        }
      })
      .then(() => console.log('for each is done'));
  }

  async clearStorage() {
    await this.storage.clear();
  }
}
