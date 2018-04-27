import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from '@firebase/util';
import { FirebaseApp } from 'angularfire2';
import { FirebaseAuth, User } from '@firebase/auth-types';

export class AppUser{
    userId:string
    displayName: string;
    email:string;
    afauth: AngularFireAuth;

    constructor(afAuth: AngularFireAuth)
    {
        if (afAuth){
            this.afauth = afAuth;
            this.userId = afAuth.auth.currentUser.uid;
            this.displayName = afAuth.auth.currentUser.displayName;
            this.email = this.afauth.auth.currentUser.email;
        }
    }
}