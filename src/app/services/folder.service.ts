import { Injectable } from '@angular/core';
import { Folder } from '../interfaces/folder';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Recipie } from '../interfaces/recipie';
import { FoldersComponent } from '../components/folders/folders.component';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}
  private urlFolder = 'api/folders';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getFolder(id: number | undefined): Observable<Folder> {
    const url = this.urlFolder + `/${id}`;
    return this.http.get<Folder>(url).pipe(
      tap((_) => this.messageService.add(`fetched folder ${_.name}`)),
      catchError(this.handleError<Folder>('getRecipie'))
    );
  }

  getFolders(): Observable<Folder[]> {
    return this.http.get<Folder[]>(this.urlFolder).pipe(
      tap(() => this.messageService.add(`fetched folders`)),
      catchError(this.handleError<Folder[]>('getFolders'))
    );
  }

  addFolder(folder: Folder) {
    return this.http
      .post<Folder>(this.urlFolder, folder, this.httpOptions)
      .pipe(
        tap((newFolder: Folder) =>
          this.messageService.add(`added folder ${newFolder.name}`)
        ),
        catchError(this.handleError<Folder>('addFolder'))
      );
  }

  updateFolder(folder: Folder): Observable<any> {
    return this.http.put(this.urlFolder, folder, this.httpOptions).pipe(
      tap((_) => this.messageService.add(`updated  ${folder?.name}`)),
      catchError(this.handleError<any>('updateFolder'))
    );
  }

  deleteFolder(id: number): Observable<Folder> {
    const url = this.urlFolder + `/${id}`;
    return this.http.delete<Folder>(url, this.httpOptions).pipe(
      tap((_) => this.messageService.add(`deleted folder ${id}`)),
      catchError(this.handleError<Folder>('deleteFolder'))
    );
  }

  searchInFolderForFolders(term: string): Observable<Folder[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<Folder[]>(
        `${this.urlFolder}/?name=${term}&parent=${FoldersComponent.folderId}`
      )
      .pipe(
        tap((x) =>
          x.length
            ? this.messageService.add(`found folders matching "${term}"`)
            : this.messageService.add(`no folders matching "${term}"`)
        ),
        catchError(this.handleError<Folder[]>('searchInFolderForFolders', []))
      );
  }

  searchInFolderForRecipies(term: string): Observable<Recipie[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<Recipie[]>(
        `api/recipies/?name=${term}&parent=${FoldersComponent.folderId}`
      )
      .pipe(
        tap((x) =>
          x.length
            ? this.messageService.add(`found recipies matching "${term}"`)
            : this.messageService.add(`no recipies matching "${term}"`)
        ),
        catchError(this.handleError<Recipie[]>('searchInFolderForRecipies', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.messageService.add(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
