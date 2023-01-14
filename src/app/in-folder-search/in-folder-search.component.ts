import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { Folder } from '../folder';
import { FolderService } from '../folder.service';
import { FoldersComponent } from '../folders/folders.component';
import { Recipie } from '../recipie';

@Component({
  selector: 'app-in-folder-search',
  templateUrl: './in-folder-search.component.html',
  styleUrls: ['./in-folder-search.component.css']
})
export class InFolderSearchComponent implements OnInit{
  folders$!: Observable<Folder[]>;
  recipies$!: Observable<Recipie[]>
  private searchTerms = new Subject<string>();
  constructor(private folderService: FolderService) {}
  search(term: string): void {
    this.searchTerms.next(term);
    console.log(FoldersComponent.folderId)
    FoldersComponent.term =term;
  }
  ngOnInit(): void {
    this.folders$ = this.searchTerms.pipe(      
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.folderService.searchInFolderForFolders(term)),
    );
    this.recipies$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.folderService.searchInFolderForRecipies(term))
    )
  }
}
