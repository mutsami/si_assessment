import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent {
  user: User | any;
  id1: any;
  id2: any;
  photos: any;
  album: any;
  albumId: any;

  constructor(
    protected auth: AuthService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.auth.user$.subscribe((e) => {
      this.user = e;
    });

    // Retrieving album id parameter
    this.id1 = this.route.snapshot.paramMap.get('userId');

    // Retrieving album id parameter
    this.id2 = this.route.snapshot.paramMap.get('id');

    const stringWithoutSpaces = this.id1.replace(/\s/g, '');

    this.album = this.auth
      .getAlbum(stringWithoutSpaces, this.id2)
      .subscribe((a) => {
        const data = a.payload.data() as any;
        const id = a.payload.id;

        this.album = data;
        this.albumId = id;

        return { id, ...data };
      });

    this.photos = this.auth
      .getAlbumPhotos(stringWithoutSpaces, this.id2)
      .subscribe((e) => {
        this.photos = e;
        console.log('e', e);
      });
  }

  /**
   *  This function scrolls the page to a specified HTMLElement smoothly.
   *  It takes an HTMLElement parameter 'el' representing the target element to scroll to.
   * It uses the scrollIntoView method with the 'smooth' behavior option to achieve smooth scrolling to the target element.

   * @param {HTMLElement} el  target ID to scroll to
   */

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
