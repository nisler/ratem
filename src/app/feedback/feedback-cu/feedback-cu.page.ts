import { Component, OnInit } from '@angular/core';
import {Assignment} from '../../models/assignment.interface';
import {Feedback} from '../../models/feedback.interface';
import {FeedbackService} from '../../services/feedback.service';
import {ActivatedRoute} from '@angular/router';
import {AssignmentService} from '../../services/assignment.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-feedback-cu',
  templateUrl: './feedback-cu.page.html',
  styleUrls: ['./feedback-cu.page.scss'],
})
export class FeedbackCuPage implements OnInit {
  private feedback: Feedback = {
    feedback_txt: '',
    rating: 2.0,
    // grade: '', // TODO: remove?
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

  constructor(private feedbackService: FeedbackService,
              private route: ActivatedRoute,
              private nav: NavController,
              private assignmentService: AssignmentService) { }

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
          .then(() => {
            this.nav.navigateBack('home'); // TODO navigate back to assignment details
          }).catch((err) => { // TODO: better error checking
            console.log(err);
          });
    }
  }

}
