import { Component, OnInit } from '@angular/core';
import { RecipieService } from '../../services/recipie.service';
import { Recipie } from '../../interfaces/recipie';
import { FolderService } from '../../services/folder.service';
import { Folder } from '../../interfaces/folder';

@Component({
  selector: 'app-recipies',
  templateUrl: `./recipies.component.html`,
  styleUrls: ['./recipies.component.css'],
})
export class RecipiesComponent implements OnInit {
  constructor(
    private recipieService: RecipieService,
    private folderService: FolderService
  ) {}
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  term: string = '';
  recipies: Recipie[] = [];

  getRecipies(): void {
    this.recipieService
      .getRecipies()
      .subscribe((recipies) => (this.recipies = recipies));
  }

  ngOnInit(): void {
    this.getRecipies();
    this.term = '';
  }

  deleteRecipie(recipie: Recipie): void {
    this.recipieService.deleteRecipie(recipie.id).subscribe(() => {
      this.recipies = this.recipies?.filter((r) => r.id !== recipie.id);
      this.folderService
        .getFolder(recipie.parent)
        .subscribe((folder: Folder) => {
          folder.recipies = folder.recipies?.filter((r) => r.id !== recipie.id);
          this.folderService.updateFolder(folder).subscribe();
        });
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getRecipies();
  }

  addOrRemoveFromFav(recipie: Recipie): void {
    recipie.favourite = !recipie.favourite;
    this.recipieService.updateRecipie(recipie).subscribe();
    this.folderService.getFolder(recipie.parent).subscribe((folder) => {
      for (let i = 0; i < folder.recipies.length; i++) {
        if (folder.recipies[i].id === recipie.id)
          folder.recipies[i].favourite = recipie.favourite;
      }
      this.folderService.updateFolder(folder).subscribe();
    });
  }
}
