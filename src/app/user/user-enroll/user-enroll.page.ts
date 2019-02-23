import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';
import {AuthService} from '../../services/auth.service';
import {UserCourse} from '../../models/usercourse.interface';
import {UserService} from '../../services/user.service';
import {NavController} from '@ionic/angular';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-enroll',
  templateUrl: './user-enroll.page.html',
  styleUrls: ['./user-enroll.page.scss'],
})
export class UserEnrollPage implements OnInit, OnDestroy {
  private userCourse: UserCourse = {
    course_id: '',
    course_name: '',
    semester_id: '',
    semester_name: '',
    semester_is_current: false,
    user_id: ''
  };
  private user;
  private currentCourseList;
  private currentCourseSub: Subscription;

  constructor(private courseService: CourseService,
              private authService: AuthService,
              private userService: UserService,
              private nav: NavController) { }

  ngOnInit() {
    this.user = this.authService.getLoggedInUser();
    if (this.user) {
      this.loadCurrentCourseList();
    }
  }

  ngOnDestroy() {
    this.currentCourseSub.unsubscribe();
  }

  loadCurrentCourseList() {
    this.currentCourseSub = this.courseService.getCourseList()
        .subscribe(res => {
          this.currentCourseList = res.filter(course => course.semester_is_current);
        });
  }

  enroll(course) {
    if (this.user) {
      this.userCourse.user_id = this.user.uid;
      this.userCourse.course_id = course.id;
      this.userCourse.course_name = course.course_name;
      this.userCourse.semester_id = course.semester_id;
      this.userCourse.semester_name = course.semester_name;
      this.userCourse.semester_is_current = course.semester_is_current;
      this.userService.addUserCourse(this.userCourse)
          .then(() => {
            this.nav.navigateBack('/user-courses');
          }).catch((err) => {
            console.log(err); // TODO: error handling
          });
    } else {
      console.log('User not logged in...');
    }
  }

}
