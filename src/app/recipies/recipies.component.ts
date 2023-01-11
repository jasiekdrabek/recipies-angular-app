import { Component, OnInit } from '@angular/core';
import { RecipieService } from '../recipie.service';
import { Recipie } from '../recipie';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css'],
})
export class RecipiesComponent implements OnInit{
  constructor(private recipieService: RecipieService, private  messageService: MessageService){}
  getRecipies():void{
    this.recipieService.getRecipies().subscribe(recipies => this.recipies = recipies);
  } 
  ngOnInit(): void {
    this.getRecipies();
  }
  recipies : Recipie[] = [];
  
}
