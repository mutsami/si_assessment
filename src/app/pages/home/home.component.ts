import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: User | any;
  constructor(protected auth: AuthService) {}
  ngOnInit() {
    this.auth.user$.subscribe((e) => {
      this.user = e;
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
