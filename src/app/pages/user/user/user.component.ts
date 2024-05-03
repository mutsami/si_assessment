import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit{
  id: any;
  user: any;

  albums: any;
  featuredAlbums: any;

  loaded: boolean = false;
  albumsLoaded: boolean = false;
  featuredAlbumsLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    protected auth: AuthService,
  ) {
    
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.auth.getUser(this.id).subscribe((e) => {
        this.user = e;

        this.loaded = true;
      });

      this.auth.getUserAlbums(this.id).subscribe((e) => {
        this.albums = e;

        this.albumsLoaded = true;
      });

      this.auth.getFeaturedUserAlbums(this.id).subscribe((e) => {
        console.log('Featured Users Albums', e);

        this.featuredAlbums = e;

        this.featuredAlbumsLoaded = true;
      });
    }
  }
}
