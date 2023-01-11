import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { RecipieService } from '../recipie.service';
import {Recipie} from '../recipie'

@Component({
  selector: 'app-recipie-detail',
  templateUrl: './recipie-detail.component.html',
  styleUrls: ['./recipie-detail.component.css']
})
export class RecipieDetailComponent {
  constructor(
  private route: ActivatedRoute,
  private recipieService: RecipieService,
  private location: Location
) {}  
ngOnInit(): void {
  this.getRecipie();
}

goBack():void{
  this.location.back();
}

getRecipie(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.recipieService.getRecipie(id)
    .subscribe(recipie => this.recipie = recipie);
}
@Input() recipie? : Recipie
}
