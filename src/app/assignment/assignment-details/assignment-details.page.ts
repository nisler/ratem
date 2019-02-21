import {Component, OnDestroy, OnInit} from '@angular/core';
import {Assignment} from '../../models/assignment.interface';
import {Subscription} from 'rxjs';
import {AssignmentService} from '../../services/assignment.service';
import {ActivatedRoute} from '@angular/router';
import {FeedbackService} from '../../services/feedback.service';
import {Feedback} from '../../models/feedback.interface';

@Component({
  selector: 'app-assignment-details',
  templateUrl: './assignment-details.page.html',
  styleUrls: ['./assignment-details.page.scss'],
})
export class AssignmentDetailsPage implements OnInit, OnDestroy {
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

  private feedbackList: Feedback[];
  private assignmentSub: Subscription;
  private feedbackSub: Subscription;

  constructor(private assignmentService: AssignmentService,
              private route: ActivatedRoute,
              private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.assignment_id = this.route.snapshot.paramMap.get('id');
    if (this.assignment_id) {
      this.loadAssignment();
    }
  }

  ngOnDestroy(): void {
    this.assignmentSub.unsubscribe();
    this.feedbackSub.unsubscribe();
  }

  loadAssignment() {
    this.assignmentSub = this.assignmentService.getAssignmentDetails(this.assignment_id)
        .subscribe(res => {
          this.assignment = res;
        });

    this.feedbackSub = this.feedbackService.getFeedbackList()
        .subscribe(res => {
          this.feedbackList = res.filter(feedback => feedback.assignment_id === this.assignment_id);
        });
  }

}
