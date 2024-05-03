import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { AuthService } from '../services/auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth, private auth:AuthService, private router: Router
  ) {}
  canActivate(  ): boolean {
 
     
    const isLoggedIn = !!this.auth.isAuthenticated;
    
    const isVerified = !!this.auth.isVerified;
    if (!isLoggedIn) {
      console.log('not', isLoggedIn)
      console.log('isVerified 1',isVerified);
      
    }else {
      console.log('is', isLoggedIn)


      if (!isVerified) {
        this.router.navigate(['/verification'])
      }
       

    }
    return isLoggedIn;
  }
    
  }
