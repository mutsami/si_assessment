import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent, StrongPasswordRegx } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  
  let router: Router;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['signIn', 'signUp', 'user$']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule.withRoutes([])],
      providers: [{ provide: AuthService, useValue: authService }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('signinEmailField', () => {
    it('should mark email field as valid if valid email is entered', () => {
      component.signinForm.controls['signin_email'].setValue('test@example.com');
      expect(component.signinEmailField.valid).toBeTrue();
    });

    it('should mark email field as invalid if invalid email is entered', () => {
      component.signinForm.controls['signin_email'].setValue('invalidemail');
      expect(component.signinEmailField.invalid).toBeTrue();
    });
  });

  describe('registrationEmailField', () => {
    it('should mark registration email field as valid if valid email is entered', () => {
      component.registrationForm.controls['registration_email'].setValue('test@example.com');
      expect(component.registrationEmailField.valid).toBeTrue();
    });

    it('should mark registration email field as invalid if invalid email is entered', () => {
      component.registrationForm.controls['registration_email'].setValue('invalidemail');
      expect(component.registrationEmailField.invalid).toBeTrue();
    });
  });

  describe('passwordFormField', () => {
    it('should validate password strength', () => {
      // Weak password
      component.registrationForm.controls['new_password'].setValue('weak');
      expect(component.passwordFormField.invalid).toBeTrue();

      // Strong password
      component.registrationForm.controls['new_password'].setValue('Strong1Password');
      expect(component.passwordFormField.valid).toBeTrue();
    });

    it('should validate password matching', () => {
      component.registrationForm.controls['new_password'].setValue('password');
      component.registrationForm.controls['confirmPassword'].setValue('password');
      expect(component.passwordsMatch()).toBeTrue();

      component.registrationForm.controls['new_password'].setValue('password');
      component.registrationForm.controls['confirmPassword'].setValue('differentpassword');
      expect(component.passwordsMatch()).toBeFalse();
    });
  });

  describe('submitSigninForm', () => {
    it('should submit signin form if valid', () => {
      const signInSpy = authService.signIn.and.returnValue(Promise.resolve());
      component.signinForm.setValue({ signin_email: 'test@example.com', password: 'password' });
      component.submitSigninForm();
      expect(signInSpy).toHaveBeenCalledWith('test@example.com', 'password');
    });

    it('should not submit signin form if invalid', () => {
      const signInSpy = authService.signIn.and.returnValue(Promise.resolve());
      component.submitSigninForm();
      expect(signInSpy).not.toHaveBeenCalled();
    });
  });

  describe('submitRegForm', () => {
    it('should submit registration form if valid', () => {
      const signUpSpy = authService.signUp.and.returnValue(Promise.resolve());
      component.registrationForm.setValue({
        fullName: 'Test User',
        registration_email: 'test@example.com',
        new_password: 'Strong1Password',
        confirmPassword: 'Strong1Password'
      });
      component.submitRegForm();
      expect(signUpSpy).toHaveBeenCalledWith('test@example.com', 'Strong1Password');
    });

    it('should not submit registration form if invalid', () => {
      const signUpSpy = authService.signUp.and.returnValue(Promise.resolve());
      component.submitRegForm();
      expect(signUpSpy).not.toHaveBeenCalled();
    });

    
    
  });

  describe('scroll', () => {
    it('should scroll to the specified element', () => {
      const el = document.createElement('div');
      spyOn(el, 'scrollIntoView');
      component.scroll(el);
      expect(el.scrollIntoView).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('should subscribe to user$ observable', () => {
      const userSubject = new BehaviorSubject<any>({});
      authService.user$ = userSubject.asObservable();
      component.ngOnInit();
      expect(component.user).toBeDefined();
    });
  });

  describe('add', () => {
    it('should add two numbers', () => {
      expect(component.add(2, 3)).toBe(5);
    });
  });
});
