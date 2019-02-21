import {Component, OnDestroy, OnInit} from '@angular/core';
import {Course} from '../../models/course.interface';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Assignment} from '../../models/assignment.interface';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit, OnDestroy {
  course: Course = {
    course_name: '',
    semester_id: '',
    semester_name: '',
    semester_is_current: false
  };

  private course_id = null;

  private assignmentList: Assignment[];
  private courseSub: Subscription;

  constructor(private courseService: CourseService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.course_id = this.route.snapshot.paramMap.get('id');
    if (this.course_id) {
      this.loadCourse();
    }
  }

  ngOnDestroy() {
    // unsubscribe to prevent duplications while navigating using the back button
    this.courseSub.unsubscribe();
  }

  loadCourse() {
    this.courseSub = this.courseService.getCourseDetails(this.course_id)
        .subscribe(res => {
          this.course = res;
        });

    // TODO: get assignments for this course
  }

}
