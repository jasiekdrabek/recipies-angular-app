import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Folder } from '../folder';
import { Recipie } from '../recipie';
import { RecipieService } from '../recipie.service';
import { FolderService } from '../folder.service';

@Component({
  selector: 'app-recipie-search',
  templateUrl: './recipie-search.component.html',
  styleUrls: ['./recipie-search.component.css'],
})
export class RecipieSearchComponent implements OnInit, OnChanges {
  recipies$!: Observable<Recipie[]>;
  private searchTerms = new Subject<string>();
  @Input() recipies : Recipie [] = [];
  @Output() recipiesChange = new EventEmitter<Recipie []>(); 
  @Input() currentSearchTerm = ''
  @Output() currentSearchTermChange = new EventEmitter<string>()
  constructor(private recipieService: RecipieService, private folderService : FolderService) {}

  search(term: string): void {
    this.searchTerms.next(term);
    this.currentSearchTerm = term;
    this.currentSearchTermChange.emit(this.currentSearchTerm);
  }

  ngOnInit(): void {
    this.recipies$ = this.searchTerms.pipe(
      debounceTime(300),
      switchMap((term: string) => this.recipieService.searchRecipies(term))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.search(this.currentSearchTerm)
  }
  
  deleteRecipie(recipie: Recipie): void {
    this.recipieService.deleteRecipie(recipie.id).subscribe(() => {
      this.recipies = this.recipies?.filter((r) => r.id !== recipie.id);
      this.recipiesChange.emit(this.recipies);
      this.folderService
        .getFolder(recipie.parent)
        .subscribe((folder: Folder) => {
          folder.recipies = folder.recipies?.filter((r) => r.id !== recipie.id);
          this.folderService.updateFolder(folder).subscribe();
        });
    });
  }
}
