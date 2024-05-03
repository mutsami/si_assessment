import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { HomeComponent } from './home.component';
import { AuthService } from 'src/app/services/auth.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [AuthService]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
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
});
