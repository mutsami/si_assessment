import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, switchMap, of, map, merge } from 'rxjs';
import { GoogleAuthProvider } from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { User } from '../models/user';
import firebase from 'firebase/compat/app';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  user$: Observable<any>;
  /**
   * User log in status
   */
  status!: boolean;
  ts: any;

  userCollection!: AngularFirestoreCollection<any>;
  users!: Observable<any[]>;
  userDoc?: AngularFirestoreDocument<any>;

  albumsCollection!: AngularFirestoreCollection<any>;
  albums!: Observable<any[]>;
  albumDoc?: AngularFirestoreDocument<any>;

  isAuthenticated!: Observable<boolean>;

  isVerified!: any;

  /**
   * Inject Firebase auth service
   * @param {AngularFireAuth} afAuth
   */
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    /**
     * Assigns the current timestamp using the Firebase Firestore library.
     */
    this.ts = firebase.firestore.Timestamp.now();

    /**
     * this line of code sets up an observable stream that emits true if the user is logged in
     * and false if the user is logged out, based on the authentication state provided by
     * AngularFire's authState observable. This is then consumed by the AuthGuard
     */

    this.isAuthenticated = this.afAuth.authState.pipe(
      map((user) => !!user), // Convert user object to boolean (true if user is logged in, false otherwise)
    );

    this.isVerified = this.afAuth.authState.pipe(
      map((user) => user?.emailVerified), // Convert user object to boolean (true if user is logged in, false otherwise)
    );

    /**
     * An observable provided by AngularFire that emits the authentication state of the Firebase user.
     */
    this.user$ = this.afAuth.authState.pipe(
      /**
       *  This operator switches to a new observable every time the source observable emits a new value. It takes a callback function that receives the current user authentication state.
       */
      switchMap((user) => {
        // Logged in
        if (user) {
          this.afs
            .doc<User>(`users/${user.uid}`)
            .snapshotChanges()
            .subscribe((e) => {});

          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          this.status = false;
          console.log('user logged out');
          return of(null);
        }
      }),
    );
  }

  /**
   *
   *  Facilitates user registration by creating a new user account with
   *  the provided email and password using Firebase authentication API .
   *
   * @param {string} email User email
   * @param {string} password Preferred user password
   * @returns implicitly returns a Promise.
   */
  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('You have been successfully registered!', result);

        console.log(result.user);

        result.user?.sendEmailVerification().then(() => {
          console.log('email sent');
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  /**
   *
   *  Facilitates user registration by creating a new user account with
   *  the provided email and password using Firebase Authentication API.
   *
   * @param email User email
   * @param password Preferred user password
   * @returns implicitly returns a Promise.
   */

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        return this.updateUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign in with Google
  async googleSignin() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider: firebase.auth.GoogleAuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        return this.updateUserData(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`,
    );
    console.log(user);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      verified: user.emailVerified,
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  getUsers() {
    this.userCollection = this.afs.collection('users', ref => ref.where('uid', '==', 'T8SbSxPiMzZBFjljvkAEWaZDTn52'));
    return this.userCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
    );
  }

  isAuthenticatedUser(): any {
    // Initialize isAuthenticated Observable with the authentication state
    this.isAuthenticated = this.afAuth.authState.pipe(
      map((user) => !!user), // Convert user object to boolean (true if user is logged in, false otherwise)
    );
    console.log('this.isAuthenticated test', this.isAuthenticated);

    // Example usage: subscribing to isAuthenticated$
    this.isAuthenticated.subscribe((isAuthenticated) => {
      console.log('Authentication state:', isAuthenticated);

      return this.isAuthenticated;
    });
  }

  getUser(id: any) {
    return this.afs.doc(`users/${id}`).valueChanges();
  }

  getAlbum(uid: any, id: any) {
    return this.afs.doc(`users/${uid}/albums/${id}`).snapshotChanges();
  }

  getUserAlbums(id: any) {
    this.albumsCollection = this.afs.collection(`users/${id}/albums`);
    return this.albumsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
    );
  }

  getFeaturedUserAlbums(id: any) {
    this.albumsCollection = this.afs.collection(`users/${id}/albums`, (ref) =>
      ref.orderBy('created_on', 'desc').limit(2),
    );
    return this.albumsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
    );
  }

  getAlbumPhotos(uid: any, id: any) {
    this.albumsCollection = this.afs.collection(
      `users/${uid}/albums/${id}/photos`,
    );

    return this.albumsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
    );
  }

  getPhoto(uid: any, albumId: any, id: any) {
    return this.afs
      .doc(`users/${uid}/albums/${albumId}/photos/${id}`)
      .valueChanges();
  }
}
