import {Injectable} from '@angular/core';
import {Headers,Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import '../rxjs-extensions';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {AngularFireDatabase,FirebaseObjectObservable,FirebaseListObservable  } from 'angularfire2/database-deprecated';
import {Question} from '../model'
import { Store } from '@ngrx/store';
import { AppStore } from '../components/app/store/app-store';
import { QuestionActions } from '../components/app/store/actions';

@Injectable()
export class QuestionService {
  //private _serviceUrl = 'http://localhost:3000/questions';  // URL to web api
  constructor(private af: AngularFireDatabase,
    private store: Store<AppStore>,
    private questionActions: QuestionActions) { 
  }

  getQuestions(): Observable<Question[]> {
      return this.af.list('/questions');
  }

  saveQuestion(question: Question) {
    this.af.list('/questions').push(question).then(
      (ret) => {  //success
        this.store.dispatch(this.questionActions.addQuestionSuccess());
      },
      (error: Error) => {//error
        console.error(error);
      }
    );
  }


}