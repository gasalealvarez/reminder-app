import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Iword  } from '../../model/word';
import { WordService } from '../../service/word.service';

declare var M: any;
@Component({
  selector: 'app-list-words',
  templateUrl: './list-words.component.html',
  styleUrls: ['./list-words.component.css']
})
export class ListWordsComponent implements OnInit {

  constructor(public wordService: WordService) { }

  ngOnInit(): void {
  }

  addWord(form: NgForm){
    console.log(form.value)
    M.toast({html: 'palabra agregada'})
  }
  resetForm(form? : NgForm) {
    if (form) {
      form.reset();
      this.wordService.selectedWord = {};
    }
  }
  editWord() {

  }
  deleteWord() {
    
  }
}
