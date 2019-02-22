import {Component, OnDestroy, OnInit} from '@angular/core';
import {Course} from '../../models/course.interface';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Assignment} from '../../models/assignment.interface';
import {AssignmentService} from '../../services/assignment.service';
import {RatingService} from '../../services/rating.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit, OnDestroy {
  private course: Course = {
    course_name: '',
    semester_id: '',
    semester_name: '',
    semester_is_current: false
  };
  private course_id = null;

  private rating: number;
  private courseRating;

  private assignmentList: Assignment[];
  private courseSub: Subscription;
  private assignmentSub: Subscription;

  constructor(private courseService: CourseService,
              private route: ActivatedRoute,
              private assignmentService: AssignmentService,
              private ratingService: RatingService) { }

  ngOnInit() {
    this.course_id = this.route.snapshot.paramMap.get('id');
    if (this.course_id) {
      this.loadCourse();
      this.getCourseRating();
    }
  }

  ngOnDestroy() {
    // unsubscribe to prevent duplications while navigating using the back button
    this.courseSub.unsubscribe();
    this.assignmentSub.unsubscribe();
  }

  loadCourse() {
    // TODO: add loading
    this.courseSub = this.courseService.getCourseDetails(this.course_id)
        .subscribe(res => {
          this.course = res;
        });

    this.assignmentSub = this.assignmentService.getAssignmentList()
        .subscribe(res => {
          this.assignmentList = res.filter(assignment => assignment.course_id === this.course_id);
        });
  }

  getCourseRating() {
    this.ratingService.getRatingsForCourse(this.course_id)
        .then((res) => {
          this.courseRating = res;
          this.rating = this.courseRating
              .map(r => r.rating)
              .reduce((a, b) => a + b, 0) / this.courseRating.length;
        });
  }

}
