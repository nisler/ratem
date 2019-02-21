import { Component, OnInit } from '@angular/core';
import {Course} from '../../models/course.interface';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {SemesterService} from '../../services/semester.service';
import {Semester} from '../../models/semester.interface';

@Component({
  selector: 'app-course-cu',
  templateUrl: './course-cu.page.html',
  styleUrls: ['./course-cu.page.scss'],
})
export class CourseCuPage implements OnInit {
  private course: Course = {
    course_name: '',
    semester_id: '',
    semester_name: '',
    semester_is_current: false
  };
  private course_id = null;

  private semester: Semester = {
    semester_name: '',
    semester_is_current: false
  };
  private semester_id = null;

  constructor(private courseService: CourseService,
              private route: ActivatedRoute,
              private nav: NavController,
              private semesterService: SemesterService) { }

  ngOnInit() {
    this.course_id = this.route.snapshot.paramMap.get('id');
    if (this.course_id) {
      this.loadCourse();
    }

    this.semester_id = this.route.snapshot.paramMap.get('semester_id');
    if (this.semester_id) {
      this.loadSemester();
    }
  }

  loadCourse() {
    this.courseService.getCourseDetails(this.course_id)
        .subscribe(res => {
          this.course = res;
        });
  }

  loadSemester() {
    this.semesterService.getSemesterDetails(this.semester_id)
        .subscribe(res => {
          this.semester = res;
        });
  }

  saveCourse() {
    if (this.course_id) {
      // TODO: implement updating
      // this.courseService.updateCourse(this.course, this.course_id)
      //     .then(() => {
      //       this.nav.navigateBack('home'); // TODO: go back to semester details
      //     }).catch((err) => {
      //       console.log(err);
      //     });
    } else {
      this.course.semester_id = this.semester_id;
      this.course.semester_name = this.semester.semester_name;
      this.course.semester_is_current = this.semester.semester_is_current;
      this.courseService.addCourse(this.course)
          .then(() => {
            this.nav.navigateBack('home'); // TODO: go back to semester details
          }).catch((err) => {
            console.log(err); // TODO: better error checking
          });
    }
  }

}
