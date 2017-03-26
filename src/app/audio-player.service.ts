import { Injectable } from '@angular/core';

@Injectable()
export class AudioPlayerService {

  public source: string;
  public volume: number = 50;
  public loop: boolean;
  public static audioElt: any;

  constructor() {
    if (AudioPlayerService.audioElt)
      return;

    AudioPlayerService.audioElt = document.createElement("audio");
    AudioPlayerService.audioElt.id = 'audio-player';
    AudioPlayerService.audioElt.controls = 'controls';
    AudioPlayerService.audioElt.type = 'audio/mpeg';

    document.body.appendChild(AudioPlayerService.audioElt);
  }

  public load(source: string) {
    this.source = source;
    AudioPlayerService.audioElt.src = this.getSongUrl(source);
    AudioPlayerService.audioElt.load();
  }

  public play(newSource: string) {
    if (newSource != this.source) {
      this.load(newSource);
    }

    AudioPlayerService.audioElt.play();   
  }

  public pause() {
    AudioPlayerService.audioElt.pause()
  }

  public remove()
  {
    if (AudioPlayerService.audioElt) {
      AudioPlayerService.audioElt.pause();
      document.body.removeChild(AudioPlayerService.audioElt);
      delete AudioPlayerService.audioElt;
    }
  }
  private getSongUrl(url: string) {
    return `api/music?id=${url}`;
  }

}
