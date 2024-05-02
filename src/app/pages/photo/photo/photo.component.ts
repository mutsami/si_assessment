import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent {
  user: User | any;
  id1: any;
  id2: any;
  id3: any;

  photo: any;
  album: any;
  photos: any;

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
    this.id3 = this.route.snapshot.paramMap.get('photoId');

    console.log('param', this.route.snapshot.paramMap);

    const stringWithoutSpaces = this.id1.replace(/\s/g, '');

    this.photo = this.auth
      .getPhoto(stringWithoutSpaces, this.id2, this.id3)
      .subscribe((e) => {
        this.photo = e;
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
