import { Component, OnInit } from '@angular/core';
import { FolderService } from '../../services/folder.service';
import { Folder } from '../../interfaces/folder';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Recipie } from '../../interfaces/recipie';
import { RecipieService } from '../../services/recipie.service';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css'],
})
export class FoldersComponent implements OnInit {
  selectedValue!: string;
  folder: Folder = {
    id: 0,
    folders: [],
    recipies: [],
  };
  id: number = 0;
  parent: Folder = {
    id: 0,
    folders: [],
    recipies: [],
  };
  UnavailableFolders: number[] = [];
  availableFolders: Folder[] = [];
  public static folderId: number;
  term!: string;
  constructor(
    private folderService: FolderService,
    private recipieService: RecipieService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.term = '';
    this.getFolder();
  }

  getFolder(): void {
    this.folderService
      .getFolders()
      .subscribe((folders) => (this.availableFolders = folders));
    this.route.params.subscribe((routeParams) => {
      this.id = routeParams['id'];
    });
    this.folderService.getFolder(this.id).subscribe((folder) => {
      this.folder = folder;
      this.getUnavailableFolders();
      FoldersComponent.folderId = this.folder.id;
      this.folderService.getFolder(this.folder.parent).subscribe((folder) => {
        this.parent = folder;
      });
    });
  }

  goBack(): void {
    this.location.back();
  }

  addRecipie(name: string, ingredients: string, preparation: string): void {
    name = name.trim();
    ingredients = ingredients.trim();
    preparation = preparation.trim();
    if (!name || !ingredients || !preparation) {
      return;
    }
    this.recipieService.getRecipies().subscribe((recipies) => {
      if (recipies.map((recipie) => recipie.name).includes(name)) {
        return;
      }

      this.recipieService
        .addRecipie({
          name: name,
          ingredients: ingredients,
          preparation: preparation,
          parent: this.folder.id,
          favourite: false,
        } as Recipie)
        .subscribe((recipie: Recipie) => {
          this.folder.recipies?.push(recipie);
          this.folderService
            .updateFolder(this.folder)
            .subscribe((folder) => (this.folder = folder));
          this.getFolder();
        });
    });
  }

  addFolder(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.folderService.getFolders().subscribe((folders) => {
      console.log(folders);
      if (folders?.map((folder) => folder.name).includes(name)) {
        return;
      }
      const foldersList: Folder[] = [];
      const recipiesList: Recipie[] = [];
      this.folderService
        .addFolder({
          name: name,
          parent: this.folder.id,
          folders: foldersList,
          recipies: recipiesList,
        } as Folder)
        .subscribe((folder: Folder) => {
          this.folder.folders?.push(folder);
          this.folderService
            .updateFolder(this.folder)
            .subscribe((folder) => (this.folder = folder));
          this.getFolder();
        });
    });
  }

  deleteRecipie(recipie: Recipie, folder: Folder = this.folder): void {
    this.recipieService.deleteRecipie(recipie.id).subscribe(() => {
      folder.recipies = folder.recipies?.filter((r) => r.id !== recipie.id);
      if (folder.id === this.folder.id) {
        this.folderService.updateFolder(folder).subscribe((f) => (folder = f));
      }
      this.getFolder();
    });
  }

  deleteFolder(id: number): void {
    this.folderService.getFolder(id).subscribe((folder) => {
      for (var i = 0; i < folder.recipies.length; i++) {
        this.deleteRecipie(folder.recipies[i], folder);
      }

      for (var i = 0; i < folder.folders.length; i++) {
        this.deleteFolder(folder.folders[i].id);
      }
      this.folderService.deleteFolder(folder.id).subscribe(() => {
        for (var i = 0; i < this.folder.folders.length; i++) {
          if (this.folder.folders[i].id === folder.id) {
            this.folder.folders.splice(i, 1);
            this.folderService
              .updateFolder(this.folder)
              .subscribe((folder) => (this.folder = folder));
            this.getFolder();
          }
        }
      });
    });
  }

  moveToNewFolder(newFolderIdStr: string): void {
    const newFolderId = Number(newFolderIdStr);
    this.folderService.getFolder(newFolderId).subscribe((newFolder) => {
      if (
        newFolder.folders
          .map((folder: { name: any; }) => folder.name)
          .includes(this.folder.name)
      ) {
        return;
      }
      this.folderService.getFolder(this.folder.parent).subscribe((folder) => {
        for (let i = 0; i < folder.folders.length; i++) {
          if (folder.folders[i].id === this.folder.id) {
            folder.folders.splice(i, 1);
          }
        }
        this.folderService.updateFolder(folder).subscribe();
      });
      this.folder.parent = newFolderId;
      this.folderService.getFolder(this.folder.parent).subscribe((folder) => {
        folder.folders.push(this.folder);
        this.folderService.updateFolder(folder).subscribe();
      });
      this.folderService
        .updateFolder(this.folder)
        .subscribe(() => this.getFolder());
    });
  }

  getUnavailableFolders(id = this.folder.id): void {
    for (let j = 0; j < this.availableFolders.length; j++) {
      if (this.availableFolders[j].id === this.folder.id) {
        this.availableFolders.splice(j, 1);
      }
    }
    for (let j = 0; j < this.availableFolders.length; j++) {
      if (this.availableFolders[j].id === this.folder.parent) {
        this.availableFolders.splice(j, 1);
      }
    }
    this.folderService.getFolder(id).subscribe((folder) => {
      for (let i = 0; i < folder.folders.length; i++) {
        for (let j = 0; j < this.availableFolders.length; j++) {
          if (this.availableFolders[j].id === folder.folders[i].id) {
            this.availableFolders.splice(j, 1);
          }
        }
        this.getUnavailableFolders(folder.folders[i].id);
      }
    });
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
