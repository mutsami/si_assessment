import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { ActivatedRoute } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['getUser', 'getUserAlbums', 'getFeaturedUserAlbums']);
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map() } } },
        { provide: AuthService, useValue: authService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should retrieve route parameter', () => {
      const paramMap = new Map<string, string>();
      paramMap.set('id', '1');
      (route.snapshot.paramMap as any) = paramMap;
      component.ngOnInit();
      expect(component.id).toBe('1');
    });

    it('should subscribe to auth observables and set loaded flags', fakeAsync(() => {
      const userData = [{ name: 'User 1' }]
      const albumsData = [{ name: 'Album 1' },        { name: 'Album 2' } ];
      const featuredAlbumsData = [        { name: 'Album 1' },        { name: 'Album 2' } ]

      authService.getUser.and.returnValue(of(userData));
      authService.getUserAlbums.and.returnValue(of(albumsData));
      authService.getFeaturedUserAlbums.and.returnValue(of(featuredAlbumsData));

      component.id = '1';
      component.ngOnInit();
      tick();

      expect(component.user).toEqual(userData);
      expect(component.albums).toEqual(albumsData);
      expect(component.featuredAlbums).toEqual(featuredAlbumsData);
      expect(component.loaded).toBeTrue();
      expect(component.albumsLoaded).toBeTrue();
      expect(component.featuredAlbumsLoaded).toBeTrue();
    }));
  });
});
