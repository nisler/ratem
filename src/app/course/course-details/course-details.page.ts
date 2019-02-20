import { Component, OnInit } from '@angular/core';
import {Course} from '../../models/course.interface';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit {
  course: Course = {
    course_name: '',
    semester_id: '',
    semester_name: '',
    semester_is_current: false
  };

  private course_id = null;

  private assignmentList = [];

  constructor(private courseService: CourseService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.course_id = this.route.snapshot.paramMap.get('id');
    if (this.course_id) {
      this.loadCourse();
    }
  }

  loadCourse() {
    this.courseService.getCourseDetails(this.course_id)
        .subscribe(res => {
          this.course = res;
        });

    // TODO: get assignments for this course
  }

}
