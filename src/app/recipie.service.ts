import { Injectable } from '@angular/core';
import { Recipie } from './recipie';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipieService {

  constructor(private messageService: MessageService, private http : HttpClient) { }
  private urlRecipie = 'api/recipies'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  getRecipies() : Observable< Recipie[]>{    
    return this.http.get<Recipie[]>(this.urlRecipie).pipe(tap(_ =>this.messageService.add('fetched recipies')) ,catchError(this.handleError<Recipie[]>('get recipie',[])));
  }
  getRecipie(id:number) : Observable<Recipie>{
    const url = this.urlRecipie + `/${id}`;
    return this.http.get<Recipie>(url).pipe(tap(_ =>this.messageService.add(`fetched recipie ${_.name}`)) ,catchError(this.handleError<Recipie>('get recipie',)));
  }
  updateRecipie(recipie: Recipie): Observable<any> {
    return this.http.put(this.urlRecipie, recipie, this.httpOptions).pipe(
      tap(_ => this.messageService.add(`updated  id=${recipie.name}`)),
      catchError(this.handleError<any>('updateRecipie'))
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
