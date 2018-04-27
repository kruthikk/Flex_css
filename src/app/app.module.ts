import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule  } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'hammerjs';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { routes }   from './app.route';
import { AppComponent, CategoriesComponent, TagsComponent, QuestionsComponent, QuestionAddUpdateComponent, LoginComponent, PasswordAuthComponent } from './components';
import { CategoryService, TagService, QuestionService, AuthenticationService } from './services';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CategoryEffects, TagEffects, QuestionEffects } from './components/app/store/effects';
import { CategoryActions, TagActions, QuestionActions, UserActions, UIStateActions } from './components/app/store/actions';
import {default as reducer } from './components/app/store/app-store';
import {AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from "angularfire2/database-deprecated"
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyCGbTtH0O_u-ZdjEXRgs91_RjXTw1KiwBk",
    authDomain: "rwa-trivia-b7662.firebaseapp.com",
    databaseURL: "https://rwa-trivia-b7662.firebaseio.com",
    storageBucket: "rwa-trivia-b7662.appspot.com",
    messagingSenderId: "1046052195149"
}

@NgModule({
  declarations: [
    AppComponent, CategoriesComponent, TagsComponent, QuestionsComponent, QuestionAddUpdateComponent, LoginComponent, PasswordAuthComponent
  ],
  entryComponents: [
    LoginComponent,
    PasswordAuthComponent
  ],
  imports: [
    BrowserModule,
    // Router
    RouterModule.forRoot(routes), 
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    //Material
    MaterialModule.forRoot(),
    //Flex
    FlexLayoutModule.forRoot(),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 20
    }),
    EffectsModule.run(CategoryEffects),
    EffectsModule.run(TagEffects),
    EffectsModule.run(QuestionEffects),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [ 
    AngularFireDatabaseModule, CategoryService, TagService, QuestionService, CategoryActions, TagActions, QuestionActions, AuthenticationService, UserActions, UIStateActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }