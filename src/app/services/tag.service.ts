import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import '../rxjs-extensions';
//import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AngularFireDatabase,FirebaseObjectObservable,FirebaseListObservable  } from 'angularfire2/database-deprecated';

@Injectable()
export class TagService{
	
	constructor(private af: AngularFireDatabase){}

	getTags(): Observable<string[]>{
		//let url = this._serviceUrl;
		//return this.http.get(url).map(res=> res.json());
		//return this.af.list('/taglist').map(t => t["$value"] );
		return this.af.list('/taglist').map(TagService.fromJsonList);
		
	}

	static fromJsonList(array): string[] {
		
		//return array.map(TagService.fromJson);
		return array.map(t=> t.$value);
	  }

	  static fromJson({id, name}): string {
		console.log(id);
		console.log(name);
		return name;
	  }
}