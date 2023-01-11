import { Component, OnInit } from '@angular/core';
import { Recipie } from '../recipie';
import { RecipieService } from '../recipie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  recipies: Recipie[] = [];
  constructor(private recipieService: RecipieService) {}
  ngOnInit(): void {
    this.getRecipies();
  }
  getRecipies(): void {
    this.recipieService
      .getRecipies()
      .subscribe(recipies => this.recipies = recipies.slice(0, 3));
  }
}
