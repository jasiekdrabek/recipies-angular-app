import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipiesComponent } from './recipies/recipies.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';
import { FoldersComponent } from './folders/folders.component';

const routes: Routes = [
  { path: 'recipies', component: RecipiesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: RecipieDetailComponent },
  { path: 'folder/:id', component: FoldersComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
