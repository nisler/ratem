import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserCourse} from '../../models/usercourse.interface';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.page.html',
  styleUrls: ['./user-courses.page.scss'],
})
export class UserCoursesPage implements OnInit, OnDestroy {
  private userCourse: UserCourse = {
    course_id: '',
    course_name: '',
    semester_id: '',
    semester_name: '',
    semester_is_current: false,
    user_id: ''
  };

  private user;

  private userCourseList: UserCourse[];
  // private semesterCourses: [];
  private userCourseSub: Subscription;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    // this.user_id = this.route.snapshot.paramMap.get('id');
    this.user = this.authService.getLoggedInUser();
    if (this.user) {
      this.loadUserCourses();
    }
  }

  ngOnDestroy() {
    this.userCourseSub.unsubscribe();
  }

  loadUserCourses() {
    // TODO: add loading
    console.log('loading user courses...');
    this.userCourseSub = this.userService.getUserCourseList()
        .subscribe(res => {
          this.userCourseList = res.filter(userCourse => userCourse.user_id === this.user.uid);
          // this.semesterCourses = this.userCourseList.map(userCourse => {
          //   console.log(userCourse); // TODO DELETE
          //   return userCourse.semester_id;
          // });
        });
  }

}
