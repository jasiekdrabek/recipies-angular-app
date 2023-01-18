import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { RecipieService } from '../../services/recipie.service';
import { Recipie } from '../../interfaces/recipie';
import { FolderService } from '../../services/folder.service';
import { Folder } from '../../interfaces/folder';

@Component({
  selector: 'app-recipie-detail',
  templateUrl: './recipie-detail.component.html',
  styleUrls: ['./recipie-detail.component.css'],
})
export class RecipieDetailComponent {
  folders: Folder[] = [];
  parent: Folder | undefined;
  constructor(
    private route: ActivatedRoute,
    private recipieService: RecipieService,
    private folderService: FolderService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getRecipie();
  }

  goBack(): void {
    this.location.back();
  }

  getRecipie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipieService.getRecipie(id).subscribe((recipie) => {
      this.recipie = recipie;
      this.folderService
        .getFolder(this.recipie?.parent)
        .subscribe((folder) => (this.parent = folder));
      this.folderService.getFolders().subscribe((folders) => {
        this.folders = folders;
        for (let i = 0; i < folders.length; i++) {
          if (folders[i].id == this.recipie?.parent) {
            folders.splice(i, 1);
          }
        }
      });
    });
  }

  save(): void {
    if (this.recipie) {
      this.recipieService.updateRecipie(this.recipie).subscribe();
    }
  }

  moveToNewFolder(newFolderIdStr: string): void {
    const newFolderId = Number(newFolderIdStr);
    if (this.recipie) {
      this.folderService.getFolder(this.recipie.parent).subscribe((folder) => {
        for (let i = 0; i < folder.recipies.length; i++) {
          if (folder.recipies[i].id === this.recipie?.id) {
            folder.recipies.splice(i, 1);
          }
        }
        this.folderService.updateFolder(folder).subscribe();
      });
      this.recipie.parent = newFolderId;
      this.folderService.getFolder(this.recipie.parent).subscribe((folder) => {
        folder.recipies.push(this.recipie as Recipie);
        this.folderService.updateFolder(folder).subscribe();
      });
      this.recipieService
        .updateRecipie(this.recipie)
        .subscribe(() => this.getRecipie());
    }
  }

  @Input() recipie?: Recipie;
}
