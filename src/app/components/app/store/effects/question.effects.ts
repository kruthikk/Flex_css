import { Injectable } from "@angular/core";
import {Effect, Actions} from '@ngrx/effects';
import { QuestionActions } from "../actions/question.actions";
import { QuestionService } from "../../../../services/question.service";
import { Question } from "app/model/question";
import {AppStore} from '../app-store'

@Injectable()
export class QuestionEffects {
    constructor (
        private actions$: Actions,
        private questionActions: QuestionActions,
        private svc: QuestionService
    ) {}

    @Effect() 
    loadQuestions$ = this.actions$
        .ofType(QuestionActions.LOAD_QUESTIONS)
        .switchMap(() => this.svc.getQuestions())
        .map((questions: Question[]) => this.questionActions.loadQuestionsSuccess(questions));
    
    @Effect()
    addQuestion$ = this.actions$
                    .ofType(QuestionActions.ADD_QUESTION)
                    .do((action) => this.svc.saveQuestion(action.payload))
                    .filter(()=>false);
}