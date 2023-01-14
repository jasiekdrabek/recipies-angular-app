import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { Recipie } from '../recipie';
import { RecipieService } from '../recipie.service';
import { RecipiesComponent } from '../recipies/recipies.component';

@Component ({
  selector: 'app-recipie-search',
  templateUrl: './recipie-search.component.html',
  styleUrls: ['./recipie-search.component.css']
})
export class RecipieSearchComponent implements OnInit{
  recipies$!: Observable<Recipie[]>;
  private searchTerms = new Subject<string>();
  constructor(private recipieService: RecipieService) {}
  search(term: string): void {
    this.searchTerms.next(term);
    console.log(term)
    RecipiesComponent.term =term;
  }
  ngOnInit(): void {
    this.recipies$ = this.searchTerms.pipe(      
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.recipieService.searchRecipies(term)),
    );
  }
}
