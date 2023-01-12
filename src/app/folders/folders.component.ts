import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FolderService } from '../folder.service';
import { Folder } from '../folder';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit{
folder: Folder ={};
@Input() id: number=0;
constructor(private folderService : FolderService,private route: ActivatedRoute,private location: Location,private router: Router){
  this.router.routeReuseStrategy.shouldReuseRoute = function() {
    return false;
    
};
  
}
ngOnInit(): void{
 this.getFolder()
}

getFolder():void{
  this.route.params.subscribe(routeParams => {
    this.id = routeParams['id'];
    })
  this.folderService.getFolder(this.id).subscribe(folder => this.folder = folder)
}
goBack():void{
  this.location.back();
}
}
