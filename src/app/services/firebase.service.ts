import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable, from, of } from "rxjs";
import { take, switchMap } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/compat/firestore";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  isLoggedIn: boolean = false;
  user$: Observable<User>;
  user: any;

  constructor(
    public firebaseAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.firebaseAuth.authState.pipe(
      switchMap((user) => {
        if (user) return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        else return of(null);
      })
    );
    this.getUserData()
  }

  async signin(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem("user", JSON.stringify(res.user));
      });
  }

  async signup(email: string, password: string) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.updateUserData(res.user);
        this.isLoggedIn = true;
        localStorage.setItem("user", JSON.stringify(res.user));
      });
  }

  async logout() {
    console.log("Log out");
    await this.firebaseAuth.signOut();
    this.isLoggedIn = false;
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

  canActivates(): boolean {
    if (!this.isLoggedIn) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      roles: ["student"],
      displayName: user.displayName,
      email: user.email,
    };
    return userRef.set(data);
  }

  checkAuthorization(user: any, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles)
      if (user.roles.includes(role)) {
        return true;
      }
    return false;
  }

  isStudent(user: User, strict = false): boolean {
    const allowed = ["student"];
    if(strict)
    return (this.checkAuthorization(user, allowed) && !this.checkAuthorization(user, ["profesor","secretariat"]));
    else
    return this.checkAuthorization(user, allowed);
  }

  isAdmin(user: User): boolean {
    const allowed = ["profesor", "secretariat"];
    return this.checkAuthorization(user, allowed);
  }

  getUserData() {
    this.user$.pipe(take(1)).subscribe( (user)=> {
      this.user = user;
    })
  }

}
