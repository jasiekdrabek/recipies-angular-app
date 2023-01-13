import { Component, OnInit } from '@angular/core';
import { RecipieService } from '../recipie.service';
import { Recipie } from '../recipie';
import { FolderService } from '../folder.service';
import { Folder } from '../folder';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css'],
})
export class RecipiesComponent implements OnInit {
  constructor(
    private recipieService: RecipieService,
    private folderService: FolderService
  ) {}
  getRecipies(): void {
    this.recipieService
      .getRecipies()
      .subscribe((recipies) => (this.recipies = recipies));
  }
  ngOnInit(): void {
    this.getRecipies();
  }
  recipies: Recipie[] = [];
  deleteRecipie(recipie: Recipie): void {
    this.recipieService.deleteRecipie(recipie.id).subscribe(() => {
      this.recipies = this.recipies?.filter((r) => r.id !== recipie.id);
      this.folderService
        .getFolder(recipie.parent)
        .subscribe((folder: Folder) => {
          folder.recipies = folder.recipies?.filter(
            (r) => r.id!== recipie.id
          );
          this.folderService.updateFolder(folder).subscribe();
        });
    });
  }
}
