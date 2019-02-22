import { Component, OnInit } from '@angular/core';
import {Assignment} from '../../models/assignment.interface';
import {Feedback} from '../../models/feedback.interface';
import {FeedbackService} from '../../services/feedback.service';
import {ActivatedRoute} from '@angular/router';
import {AssignmentService} from '../../services/assignment.service';
import {NavController} from '@ionic/angular';
import {RatingService} from '../../services/rating.service';
import {Rating} from '../../models/rating.interface';

@Component({
  selector: 'app-feedback-cu',
  templateUrl: './feedback-cu.page.html',
  styleUrls: ['./feedback-cu.page.scss'],
})
export class FeedbackCuPage implements OnInit {
  private feedback: Feedback = {
    feedback_txt: '',
    rating: 2.0,
    assignment_id: '',
    assignment_name: '',
    assignment_is_in_progress: false,
    assignment_desc: '',
    course_id: '',
    course_name: '',
    semester_id: '',
    semester_name: '',
    semester_is_current: false
  };
  private feedback_id = null;

  private assignment: Assignment = {
    assignment_name: '',
    assignment_is_in_progress: false,
    assignment_desc: '',
    course_id: '',
    course_name: '',
    semester_id: '',
    semester_name: '',
    semester_is_current: false
  };
  private assignment_id = null;

  private rating: Rating = {
    feedback_id: '',
    rating: 0.0,
    course_id: ''
  };

  constructor(private feedbackService: FeedbackService,
              private route: ActivatedRoute,
              private nav: NavController,
              private assignmentService: AssignmentService,
              private ratingService: RatingService) { }

  ngOnInit() {
    this.feedback_id = this.route.snapshot.paramMap.get('id');
    if (this.feedback_id) {
      this.loadFeedback();
    }

    this.assignment_id = this.route.snapshot.paramMap.get('assignment_id');
    if (this.assignment_id) {
      this.loadAssignment();
    }
  }

  loadFeedback() {
    console.log('update functionality'); // TODO update functionality
  }

  loadAssignment() {
    this.assignmentService.getAssignmentDetails(this.assignment_id)
        .subscribe(res => {
          this.assignment = res;
        });
  }

  saveFeedback() {
    if (this.feedback_id) {
      console.log('update feedback'); // TODO update functionality
    } else {
      this.feedback.assignment_id = this.assignment_id;
      this.feedback.assignment_name = this.assignment.assignment_name;
      this.feedback.assignment_is_in_progress = this.assignment.assignment_is_in_progress;
      this.feedback.assignment_desc = this.assignment.assignment_desc;
      this.feedback.course_id = this.assignment.course_id;
      this.feedback.course_name = this.assignment.course_name;
      this.feedback.semester_id = this.assignment.semester_id;
      this.feedback.semester_name = this.assignment.semester_name;
      this.feedback.semester_is_current = this.assignment.semester_is_current;
      this.feedbackService.addFeedback(this.feedback)
          .then((feedback) => {
            /* every time a feedback is created, store its rating to the rating list in order to
             calculate the course's overall rating */
            this.rating.feedback_id = feedback.id;
            this.rating.rating = this.feedback.rating;
            this.rating.course_id = this.feedback.course_id;
            this.ratingService.addRating(this.rating);
            this.nav.navigateBack('home'); // TODO navigate back to assignment details
          }).catch((err) => { // TODO: better error checking
            console.log(err);
          });
    }
  }

}
