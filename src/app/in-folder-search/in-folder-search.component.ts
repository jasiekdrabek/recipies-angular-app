import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Folder } from '../folder';
import { FolderService } from '../folder.service';
import { Recipie } from '../recipie';
import { RecipieService } from '../recipie.service';

@Component({
  selector: 'app-in-folder-search',
  templateUrl: './in-folder-search.component.html',
  styleUrls: ['./in-folder-search.component.css'],
})
export class InFolderSearchComponent implements OnInit, OnChanges {
  folders$!: Observable<Folder[]>;
  recipies$!: Observable<Recipie[]>;
  private searchTerms = new Subject<string>();
  @Input() folder!: Folder;
  @Output() folderChange = new EventEmitter<Folder>();
  @Input() currentSearchTerm = '';
  @Output() currentSearchTermChange = new EventEmitter<string>();
  constructor(
    private folderService: FolderService,
    private recipieService: RecipieService
  ) {}

  search(term: string): void {
    this.searchTerms.next(term);
    this.currentSearchTerm = term;
    this.currentSearchTermChange.emit(this.currentSearchTerm);
  }

  ngOnInit(): void {
    this.folders$ = this.searchTerms.pipe(
      debounceTime(300),
      switchMap((term: string) =>
        this.folderService.searchInFolderForFolders(term)
      )
    );
    this.recipies$ = this.searchTerms.pipe(
      debounceTime(300),
      switchMap((term: string) =>
        this.folderService.searchInFolderForRecipies(term)
      )
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.search(this.currentSearchTerm);
  }

  deleteRecipie(recipie: Recipie, folder: Folder = this.folder): void {
    this.recipieService.deleteRecipie(recipie.id).subscribe(() => {
      folder.recipies = folder.recipies?.filter((r) => r.id !== recipie.id);
      console.log(this.folder);
      this.folderChange.emit(this.folder);
      this.search(this.currentSearchTerm);
      if (folder.id === this.folder.id) {
        this.folderService.updateFolder(folder).subscribe((f) => (folder = f));
      }
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
            this.folderChange.emit(this.folder);
            this.search(this.currentSearchTerm);
          }
        }
      });
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
