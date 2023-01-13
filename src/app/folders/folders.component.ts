import { Component, OnInit, Input } from '@angular/core';
import { FolderService } from '../folder.service';
import { Folder } from '../folder';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Recipie } from '../recipie';
import { RecipieService } from '../recipie.service';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css'],
})
export class FoldersComponent implements OnInit {
  folder: Folder = {
    id: 0,
    folders: [],
    recipies:[]
  };
  @Input() id: number = 0;
  @Input() parent: Folder = {
    id: 0,
    folders: [],
    recipies:[]
  };
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
    this.getFolder();
  }

  getFolder(): void {
    this.route.params.subscribe((routeParams) => {
      this.id = routeParams['id'];
    });
    this.folderService.getFolder(this.id).subscribe((folder) => {
      this.folder = folder;
      this.folderService
        .getFolder(this.folder.parent)
        .subscribe((folder) => (this.parent = folder));
        console.log(folder)
    });
  }

  goBack(): void {
    this.location.back();
  }
  addRecipie(name: string, ingredients: string): void {
    name = name.trim();
    ingredients = ingredients.trim();
    if (!name || !ingredients) {
      return;
    }
    if (this.folder.recipies?.map((recipie) => recipie.name).includes(name)) {
      return;
    }
    this.recipieService
      .addRecipie({ name: name, ingredients: ingredients } as Recipie)
      .subscribe((recipie: Recipie) => {
        this.folder.recipies?.push(recipie);
        this.folderService
          .updateFolder(this.folder)
          .subscribe((folder) => (this.folder = folder));
          console.log(this.folder)
          console.log(this.parent.folders)
        this.getFolder();
      });
  }
  addFolder(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    if (this.folder.folders?.map((folder) => folder.name).includes(name)) {
      return;
    }
    const folders: Folder[] = [];
    const recipies: Recipie[] = [];
    this.folderService
      .addFolder({
        name: name,
        parent: this.folder.id,
        folders: folders,
        recipies: recipies,
      } as Folder)
      .subscribe((folder: Folder) => {
        this.folder.folders?.push(folder);
        console.log(folder)
        this.folderService
          .updateFolder(this.folder)
          .subscribe((folder) => (this.folder = folder));
        this.getFolder();
        console.log(this.folder)
      });
  }
  deleteRecipie(recipie: Recipie): void {
    this.recipieService.deleteRecipie(recipie.id).subscribe(() => {
      this.folder.recipies = this.folder.recipies?.filter(
        (r) => r.name !== recipie.name
      );
      this.folderService
        .updateFolder(this.folder)
        .subscribe((folder) => (this.folder = folder));
      this.getFolder();
    });
  }
  deleteFolder(folder: Folder): void {
    for (var i=0; i< folder.recipies.length; i++){
      this.deleteRecipie(folder.recipies[i])
    }
    console.log(this.folder.folders)
    console.log(folder)
    for(var i=0;i< folder.folders.length;i++){
      this.deleteFolder(folder.folders[i])
    }
    this.folderService.deleteFolder(folder.id).subscribe(() => {
      for (var i = 0; i < this.folder.folders.length; i++) {
        if (this.folder.folders[i].id === folder.id) {
          this.folder.folders.splice(i, 1);
        }
      }
      this.folderService
        .updateFolder(this.folder)
        .subscribe((folder) => (this.folder = folder));
      this.getFolder();
    });
  }
}
