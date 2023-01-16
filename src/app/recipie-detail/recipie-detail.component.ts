import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { RecipieService } from '../recipie.service';
import { Recipie } from '../recipie';
import { FolderService } from '../folder.service';
import { Folder } from '../folder';

@Component({
  selector: 'app-recipie-detail',
  templateUrl: './recipie-detail.component.html',
  styleUrls: ['./recipie-detail.component.css'],
})
export class RecipieDetailComponent {
  folders: Folder[] = [];
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
      this.folderService.getFolders().subscribe((folders) => {
        this.folders = folders;
        for(let i=0;i<folders.length;i++){
          if(folders[i].id == this.recipie?.parent){
            folders.splice(i,1);
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
      this.recipie.parent = newFolderId;
      this.recipieService.updateRecipie(this.recipie).subscribe();
    }
  }

  @Input() recipie?: Recipie;
}
