import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }  from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewWordComponent } from './components/new-word/new-word.component';
import { EditWordComponent } from './components/edit-word/edit-word.component';
import { ListWordsComponent } from './components/list-words/list-words.component';

import { environment } from '../environments/environment';

import { AngularFireModule }  from '@angular/fire';
import { AngularFireDatabaseModule  } from '@angular/fire/database';


@NgModule({
  declarations: [
    AppComponent,
    NewWordComponent,
    EditWordComponent,
    ListWordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
