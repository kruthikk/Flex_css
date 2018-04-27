import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import { AppUser } from '../../../../model/';

@Injectable()
export class UserActions{
    static LOGOFF = 'LOGOFF';
    logoff():Action{
            return {type:UserActions.LOGOFF,
                payload:null
        };
    }

    static LOGIN_SUCCESS = 'LOGIN_SUCCESS';
    loginSuccess(user:AppUser):Action{
         return {type:UserActions.LOGIN_SUCCESS,
                    payload:user
        };
    }

}
