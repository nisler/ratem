import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((newUserCredential: firebase.auth.UserCredential) => {
          firebase
              .firestore()
              .doc(`/userList/${newUserCredential.user.uid}`)
              .set({email});
        }).catch(error => {
          console.error(error);
          throw new Error(error);
        });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  isLoggedIn() {
    // return firebase.authState.pipe(first()).toPromise();
    // console.log(firebase.auth().currentUser);
    return firebase.auth().currentUser.uid;
  }
}
