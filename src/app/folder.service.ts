import { Injectable } from '@angular/core';
import { Folder } from './folder';
import { FOLDERS } from './Mock-folders';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private messageService: MessageService) { }

  getFolder(id:number) : Observable<Folder>{
    const folder = FOLDERS.find(f => f.id == id)!;
    this.messageService.add(`FolderService: fetched folder ${folder.name}`);
    return of(folder);
  }
}
