import { Injectable } from "@angular/core";
import {Effect, Actions} from '@ngrx/effects';
import { CategoryActions } from "../actions/category.actions";
import { CategoryService } from "../../../../services/category.service";
import { Category } from "app/model/category";


@Injectable()
export class CategoryEffects {
    constructor (
        private actions$: Actions,
        private categoryActions: CategoryActions,
        private svc: CategoryService
    ) {}

    @Effect() 
    loadCategories$ = this.actions$
        .ofType(CategoryActions.LOAD_CATEGORIES)
        .switchMap(() => this.svc.getCategories())
        .map((categories: Category[]) => this.categoryActions.loadCategoriesSuccess(categories));
}