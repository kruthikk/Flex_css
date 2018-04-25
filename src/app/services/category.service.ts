import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable'
import '../rxjs-extensions';
//import {AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {AngularFireDatabase,FirebaseObjectObservable,FirebaseListObservable  } from 'angularfire2/database-deprecated';

import {Category} from '../model/category';
import { AngularFireModule } from 'angularfire2';

@Injectable()
export class CategoryService{
	//private _serviceUrl = 'http://localhost:3000/categories';

	//constructor(private http:Http){};
	constructor(private af:AngularFireDatabase){};

	getCategories():Observable<Category[]>{
		//let url = this._serviceUrl;
		//return this.http.get(url)
		//		.map(res=>res.json());
		return this.af.list('/categories');
	}
}

