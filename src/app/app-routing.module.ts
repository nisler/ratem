import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'semester-list', loadChildren: './semester/semester-list/semester-list.module#SemesterListPageModule' },
  { path: 'semester-details', loadChildren: './semester/semester-details/semester-details.module#SemesterDetailsPageModule' },
  { path: 'semester-details/:id', loadChildren: './semester/semester-details/semester-details.module#SemesterDetailsPageModule' },
  { path: 'semester-cu', loadChildren: './semester/semester-cu/semester-cu.module#SemesterCuPageModule' },
  { path: 'semester-cu/:id', loadChildren: './semester/semester-cu/semester-cu.module#SemesterCuPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
