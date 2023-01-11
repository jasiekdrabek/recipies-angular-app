import { Injectable } from '@angular/core';
import { RECIPIES } from './Mock-recipies';
import { Recipie } from './recipie';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class RecipieService {

  constructor(private messageService: MessageService) { }
  getRecipies() : Observable< Recipie[]>{
    const recipies =of(RECIPIES);
    this.messageService.add('RecipieService: fetched reicipes');
    return recipies;
  }
  getRecipie(id:number) : Observable<Recipie>{
    const recipie = RECIPIES.find(r => r.id === id)!;
    this.messageService.add(`RecipieService: fetched reicipe ${recipie.name}`);
    return of(recipie);
  }
}
