import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Iword  } from '../../model/word';
import { WordService } from '../../service/word.service';
import * as moment from 'moment';


declare var M: any;
@Component({
  selector: 'app-list-words',
  templateUrl: './list-words.component.html',
  styleUrls: ['./list-words.component.css']
})
export class ListWordsComponent implements OnInit {

  private now = moment();
  private unixtimestamp: any;
  private word: Iword={};

  constructor(public wordService: WordService) { 
   
  }
  public words!: Iword[];

  ngOnInit(): void {
    this.addDays();
    this.listQuarantine(); 
  }

  listQuarantine() {
      this.wordService.getAllQuarantine().subscribe(words => {
        this.words = words;
      })
  }
  
  addWord(form: NgForm){
    let id=  form.value.id;
    this.word = {
      word: form.value.word,
      meaning: form.value.meaning,
      date: this.unixtimestamp
    }

    if  (id !=  null) {
      this.wordService.updateWord(this.word);
      M.toast({html: 'Palabra Editada'});
    }  else {
      this.wordService.addWord(this.word);
      M.toast({html: 'Palabra agregada'});
    }
   
    form.reset();
    this.wordService.selectedWord = {};
  }

  resetForm(form? : NgForm) {

    if (form) {
      form.reset();
      this.wordService.selectedWord = {};
    }
  }
  editWord(word : Iword) {
    this.wordService.selectedWord = word;
    this.wordService.updateWord(word);
    this.resetForm();
   }

  deleteWord(word : Iword) {
    if (confirm('Estas seguro de querer eliminarlo ??')) {
      this.wordService.deleteWord(word);
      this.resetForm();
      M.toast({html: 'Palabra Eliminada'});
    }
  }

  addDays(): void {
    
     var newDate = this.now.add(14, 'days').format();
         
     this.unixtimestamp = (new Date(newDate)).getTime() / 1000;
  }
  
}
