import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './services/user/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
    // semester list
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    
    // TODO: REMOVE?
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },

    // TODO: REMOVE?
  // { path: 'semester-details', loadChildren: './semester/semester-details/semester-details.module#SemesterDetailsPageModule' },

    // semester details page
  { path: 'semester-details/:id', loadChildren: './semester/semester-details/semester-details.module#SemesterDetailsPageModule' },
    // create a semester --> PRIVATE
  {
    path: 'semester-cu',
    loadChildren: './semester/semester-cu/semester-cu.module#SemesterCuPageModule',
    canActivate: [AuthGuard]
  },

    // TODO: REMOVE? update a semester
  // { path: 'semester-cu/:id', loadChildren: './semester/semester-cu/semester-cu.module#SemesterCuPageModule' },

    // TODO: REMOVE?
  // { path: 'course-details', loadChildren: './course/course-details/course-details.module#CourseDetailsPageModule' },

    // course details page
  { path: 'course-details/:id', loadChildren: './course/course-details/course-details.module#CourseDetailsPageModule' },
    // create a course for a semester --> PRIVATE
  {
    path: 'semester-details/:semester_id/course-cu',
    loadChildren: './course/course-cu/course-cu.module#CourseCuPageModule',
    canActivate: [AuthGuard]
  },

    // TODO: REMOVE? update a course
  // { path: 'course-cu/:id', loadChildren: './course/course-cu/course-cu.module#CourseCuPageModule' },
    // TODO: REMOVE?
  // { path: 'assignment-details', loadChildren: './assignment/assignment-details/assignment-details.module#AssignmentDetailsPageModule' },

    // assignment details page
  { path: 'assignment-details/:id', loadChildren: './assignment/assignment-details/assignment-details.module#AssignmentDetailsPageModule' },

    // TODO: REMOVE?
  // { path: 'assignment-cu', loadChildren: './assignment/assignment-cu/assignment-cu.module#AssignmentCuPageModule' },

    // create an assignment for a course --> PRIVATE
  {
    path: 'course-details/:course_id/assignment-cu',
    loadChildren: './assignment/assignment-cu/assignment-cu.module#AssignmentCuPageModule',
    canActivate: [AuthGuard]
  },
    // create a feedback for an assignment --> PRIVATE
  {
    path: 'assignment-details/:assignment_id/feedback-cu',
    loadChildren: './feedback/feedback-cu/feedback-cu.module#FeedbackCuPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },

    // view the signed-in user's courses --> PRIVATE
  {
    path: 'user-courses',
    loadChildren: './user/user-courses/user-courses.module#UserCoursesPageModule',
    canActivate: [AuthGuard]
  },
    // have user enroll in a course --> PRIVATE
  {
    path: 'user-enroll',
    loadChildren: './user/user-enroll/user-enroll.module#UserEnrollPageModule',
    canActivate: [AuthGuard]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
