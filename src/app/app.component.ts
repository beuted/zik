import { Component } from '@angular/core';
import { MusicService } from './music.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MusicService] 
})
export class AppComponent {
  public musiclist = [
    { path: 'path', name: 'name', album: 'album', artist: 'artist' },
    { path: 'path', name: 'name', album: 'album', artist: 'artist' }
  ];

  constructor(private musicService: MusicService) {
      this.musicService.getMusics()
        .then(list => {
          this.musiclist = list;
        });
  }
}