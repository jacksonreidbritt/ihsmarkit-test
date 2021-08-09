import { Component, OnInit } from '@angular/core';
import { ArtServiceService } from './art-service.service';

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.scss']
})
export class ArtListComponent implements OnInit {

  artworks = []
  refArts = []
  search = ''
  page = 1
  limit = 10
  currentImg : any;
  imgLoading = true;
  artLoading = true;
  
  constructor(
    private _artService: ArtServiceService
  ) { }

  ngOnInit() {
    this.getArtwork()
  }

  searchArt() {
    this.page = 1
    this.getArtwork()
  }

  getArtwork() {
    this.artLoading = true;
    this.artworks = []
    this.refArts = []
    this._artService.getArtworks(this.search, this.page, this.limit).subscribe(
      (res) => {
        this.artworks = res.data
        this.artLoading = false;
      },
      (err) => {
        console.error(err)
        this.artLoading = false;
      },
      () => {
        this.artworks.forEach(art => {
          this._artService.getArtwork(art.api_link).subscribe(
            (res) => {
              this.refArts.push(res.data)
            }
          )
        });
      }
    )
  }

  selectArt(art) {
    this.imgLoading = true
    this._artService.getImage(art.image_id).subscribe(
      (res) => {
        this.createImageFromBlob(res)
        this.imgLoading = false
      },
      (err) => {

        this.imgLoading = false
        console.error(err)
      }
    )
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.currentImg = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
