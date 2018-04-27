import {Category, Question, AppUser} from '../../../model';
import { categories, categoryDictionary, tags, questions, questionSaveStatus, user, loginRedirectUrl  } from './reducers';
import {combineReducers} from '@ngrx/store';
import {compose} from '@ngrx/core/compose';


export interface AppStore{
    categories: Category[];
    categoryDictionary: {[key: number]: Category};
    tags: string[];
    questions: Question[];
    questionSaveStatus: string;
    user: AppUser;
    loginRedirectUrl:string;
}


export default compose(combineReducers)({
    categories:categories,
    categoryDictionary: categoryDictionary,
    tags: tags,
    questions: questions,
    questionSaveStatus: questionSaveStatus,
    user:user,
    loginRedirectUrl:loginRedirectUrl
});