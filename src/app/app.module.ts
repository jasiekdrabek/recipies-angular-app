import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { FormsModule } from '@angular/forms';
import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FoldersComponent } from './folders/folders.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { RecipieSearchComponent } from './recipie-search/recipie-search.component';
import { InFolderSearchComponent } from './in-folder-search/in-folder-search.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipiesComponent,
    RecipieDetailComponent,
    MessagesComponent,
    DashboardComponent,
    FoldersComponent,
    RecipieSearchComponent,
    InFolderSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
