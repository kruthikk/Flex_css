import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryActions, TagActions, QuestionActions } from './store/actions';
import { MdSnackBar } from '@angular/material';
import { AppStore } from './store/app-store';
import { Store } from '@ngrx/store';
import { AppUser } from '../../model';
import { AuthenticationService } from '../../services/authentication.service';
import { checkAndUpdatePureExpressionInline } from '@angular/core/typings/src/view/pure_expression';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  
  title = 'trivia!';
  sub:any;
  user:AppUser;
  sub2:any;

  constructor(private categoryActions: CategoryActions, private store: Store<AppStore>, 
     private tagActions: TagActions,
    private questionActions: QuestionActions,
    private router: Router,
    public snackBar: MdSnackBar,
    private authService:AuthenticationService){
      this.sub = store.select(s => s.questionSaveStatus).subscribe((status) => {
        if (status == "SUCCESS")
          this.snackBar.open("Question saved!", "", {duration: 2000});
        if (status == "IN PROGRESS")
          this.router.navigate(['/questions']);
        })
      this.sub2 = store.select(s=>s.user).subscribe(user=> {
              this.user= user;
              if (user)  {
                console.log(user);
                let url:string;
                this.store.take(1).subscribe(s=>url = s.loginRedirectUrl);
                if(url)
                  this.router.navigate([url]);
              }
              else{
                this.router.navigate(['/']);
              }
            });
      }
    
  ngOnInit() {
    this.store.dispatch(this.categoryActions.loadCategories());
    this.store.dispatch(this.tagActions.loadTags());
    this.store.dispatch(this.questionActions.loadQuestions());
  }

  ngOnDestroy() {
    if (this.sub)
      this.sub.unsubscribe();
    if (this.sub2)
      this.sub2.unsubscribe();
  }

  login(){
    this.authService.ensureLogin();
  }
  logout(){
    this.authService.logout();
  }
  
}
