import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AlbumComponent } from './album.component';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  let authService: AuthService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumComponent]
    });
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should subscribe to user$ and set user', fakeAsync(() => {
    // Arrange
    const testUser: any = { user: 'Test User' };
    const userSubject = new BehaviorSubject<User>(testUser);
    Object.defineProperty(authService, 'user$', { get: () => userSubject as Observable<any> });

    // Act
    component.ngOnInit();
    tick();

    // Assert
    expect(component.user).toEqual(testUser);
  }));

  it('should set album data after getting it from AuthService', fakeAsync(() => {
    // Arrange
    const expectedAlbumData = [{ id: '1', name: 'Album Name', /* other properties */ }];
    spyOn(authService, 'getAlbum').and.returnValue(of({ payload: { data: () => expectedAlbumData, id: '1' } }));

    // Act
    component.ngOnInit();
    tick(); // Simulate async behavior

    // Assert
    expect(component.album).toEqual(expectedAlbumData);
    expect(component.albumId).toEqual('1');
  }));

});
