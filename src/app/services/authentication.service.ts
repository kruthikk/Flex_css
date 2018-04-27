import {Injectable} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import {Store} from '@ngrx/store';
import '../rxjs-extensions';
import {LoginComponent} from '../components/';
import {AppUser} from 'app/model';
import { AppStore } from '../components/app/store/app-store';
import { UserActions, UIStateActions } from '../components/app/store/actions';

@Injectable()
export class AuthenticationService{
    constructor(private store: Store<AppStore>,
                private userActions:UserActions,
                private uiStateActions: UIStateActions,
                public af:AngularFireAuth,
                public dialog:MdDialog){
                    this.af.authState.subscribe(user =>{
                        if (user){
                            console.log(user);
                            console.log(user.displayName + ":" + user.email);
                            this.store.dispatch(this.userActions.loginSuccess(new AppUser(af)));
                        }
                        else
                        {
                            this.store.dispatch(this.userActions.logoff());
                        }
                    });
                }
    
    get isAuthenticated(): boolean{
        let user:AppUser;
        this.store.take(1).subscribe(s=> user = s.user);
        if (user) return true;
        return false;
    }
    showLogin=function(url?: string){
        this.store.dispatch(this.uiStateActions.setLoginRedirectUrl(url));
        this.dialogRef = this.dialog.open(LoginComponent, {disableClose:false});
    }

    ensureLogin=function(){
        if (!this.isAuthenticated)
            this.showLogin();
    }

    logout = function(){
        this.af.auth.signOut();
    }

    get user():AppUser{
        let user:AppUser;
        this.store.take(1).subscribe(s=> user=s.user);
        return user;
    }

}

