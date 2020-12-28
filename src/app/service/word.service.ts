import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Iword  } from '../model/word';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private wordCollection: AngularFirestoreCollection<Iword>;
  private words: Observable<Iword[]>;
  private wordDoc!: AngularFirestoreDocument<Iword>;
  word: Observable<Iword> | undefined;

  public selectedWord : Iword ={};
  
  constructor(private afs: AngularFirestore) {
    this.wordCollection = this.afs.collection<Iword>('words');
    this.words = this.wordCollection.valueChanges();
   }

   getAllWords() {
    return this.words = this.wordCollection.snapshotChanges()
    .pipe(map(changes => { 
        return changes.map(a => {
        const data = a.payload.doc.data() as Iword;
        const id = a.payload.doc.id;
        return { id, ...data };
        });
      }));
 
   }

   getAllQuarantine() {
    const fechaActual =  (new Date()).getTime() / 1000;
    this.wordCollection = this.afs.collection('words', ref => ref.where('date', '<=',  fechaActual));
    return this.words = this.wordCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Iword;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

   addWord (word : Iword):void {
    this.wordCollection.add(word);
   }

   updateWord(word : Iword, id: string | undefined) : void {
    this.afs.collection('words').doc(id).update(word);
  
   }

   

   deleteWord (word : Iword):void {
    let idWord = word.id; 
    this.wordDoc = this.afs.doc<Iword>(`words/${idWord}`)
    this.wordDoc.delete();
   }
 
}
