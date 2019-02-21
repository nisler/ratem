import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'semester-details', loadChildren: './semester/semester-details/semester-details.module#SemesterDetailsPageModule' },
  { path: 'semester-details/:id', loadChildren: './semester/semester-details/semester-details.module#SemesterDetailsPageModule' },
  { path: 'semester-cu', loadChildren: './semester/semester-cu/semester-cu.module#SemesterCuPageModule' },
  { path: 'semester-cu/:id', loadChildren: './semester/semester-cu/semester-cu.module#SemesterCuPageModule' },
  { path: 'course-details', loadChildren: './course/course-details/course-details.module#CourseDetailsPageModule' },
  { path: 'course-details/:id', loadChildren: './course/course-details/course-details.module#CourseDetailsPageModule' },
  { path: 'semester-details/:semester_id/course-cu', loadChildren: './course/course-cu/course-cu.module#CourseCuPageModule' },
  { path: 'course-cu/:id', loadChildren: './course/course-cu/course-cu.module#CourseCuPageModule' },
  { path: 'assignment-details', loadChildren: './assignment/assignment-details/assignment-details.module#AssignmentDetailsPageModule' },
  { path: 'assignment-details/:id', loadChildren: './assignment/assignment-details/assignment-details.module#AssignmentDetailsPageModule' },
  { path: 'assignment-cu', loadChildren: './assignment/assignment-cu/assignment-cu.module#AssignmentCuPageModule' },
  { path: 'course-details/:course_id/assignment-cu', loadChildren: './assignment/assignment-cu/assignment-cu.module#AssignmentCuPageModule' },
  { path: 'assignment-details/:assignment_id/feedback-cu', loadChildren: './feedback/feedback-cu/feedback-cu.module#FeedbackCuPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
