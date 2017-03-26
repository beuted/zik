import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {

  @Input()
  public list: { path: string, name: string, album: string, artist: string }[];

  constructor() { }

  ngOnInit() {
  }

}
