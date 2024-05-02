import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { PhotoComponent } from './photo.component';
import { ActivatedRoute } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['getPhoto']);
    await TestBed.configureTestingModule({
      declarations: [PhotoComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map() } } },
        { provide: AuthService, useValue: authService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should subscribe to auth.user$ observable', () => {
      const userSubject = new BehaviorSubject<any>({});
      authService.user$ = userSubject.asObservable();
      component.ngOnInit();
      expect(component.user).toBeDefined();
    });

    it('should retrieve route parameters', () => {
      const paramMap = new Map<string, string>();
      paramMap.set('userId', '1');
      paramMap.set('id', '2');
      paramMap.set('photoId', '3');
      (route.snapshot.paramMap as any) = paramMap;
      component.ngOnInit();
      expect(component.id1).toBe('1');
      expect(component.id2).toBe('2');
      expect(component.id3).toBe('3');
    });

    it('should call getPhoto method of AuthService', fakeAsync(() => {
      const photoData = { /* mock photo data */ };
      authService.getPhoto.and.returnValue(of(photoData));
      const stringWithoutSpaces = 'test';
      component.id1 = '1';
      component.id2 = '2';
      component.id3 = '3';
      component.ngOnInit();
      tick();
      expect(authService.getPhoto).toHaveBeenCalledWith('test', '1', '2');
      expect(component.photo).toEqual(photoData);
    }));
  });

  describe('scroll', () => {
    it('should scroll to the specified element', () => {
      const el = document.createElement('div');
      spyOn(el, 'scrollIntoView');
      component.scroll(el);
      expect(el.scrollIntoView).toHaveBeenCalled();
    });
  });
});
