import {Observable} from 'rxjs/Observable';
import '../../../../rxjs-extensions';
import {Action} from '@ngrx/store';

import {UserActions} from '../actions/';
import {AppUser} from '../../../../model';
import { stat } from 'fs';

export const user = (state:any = null, action:Action):AppUser=>{
    switch (action.type){
        case UserActions.LOGIN_SUCCESS:
            return action.payload;
        case UserActions.LOGOFF:
            return null;
        default:
            return state;
    }
}