import { Component, OnInit } from '@angular/core';
import { ArtServiceService } from './art-service.service';

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.scss']
})
export class ArtListComponent implements OnInit {

  constructor(
    private _artService: ArtServiceService
  ) { }

  ngOnInit() {
    this._artService.getArtworks().subscribe(
      (res) => {
        console.log(res)
      }
    )
  }

}
