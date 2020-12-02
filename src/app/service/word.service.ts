import { Injectable } from '@angular/core';
import { Iword  } from '../model/word';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  public selectedWord : Iword ={};
  
  constructor() {
   
   }
}
