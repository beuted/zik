import { Component, OnInit, Input } from '@angular/core';
import { AudioPlayerService } from '../audio-player.service';

@Component({
  selector: 'song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
  providers: [AudioPlayerService] 
})
export class SongComponent implements OnInit {

  public isPause: boolean = true;

  @Input()
  public song: { path: string, name: string, album: string, artist: string };

  constructor(private audioPlayerService: AudioPlayerService) { }

  ngOnInit() {
  }

  public playOrPause() {
    if (this.isPause) {
      this.audioPlayerService.play(this.song.path);
    } else {
      this.audioPlayerService.pause();
    }

    this.isPause = !this.isPause;
  }
}
