import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Category,Question} from '../../model';
import {CategoryService} from '../../services';

@Component({
	templateUrl: './question-add-update.component.html',
	styleUrls: ['./question-add-update.component.scss']
})

export class QuestionAddUpdateComponent implements OnInit, OnDestroy {
	categories: Category[];
	sub: any;

	constructor(private categoryService: CategoryService){}

	ngOnInit(){
		this.sub = this.categoryService.getCategories()
					.subscribe(categories => this.categories = categories);
	}

	ngOnDestroy(){
		if (this.sub)
			this.sub.unsubscribe();
	}
}