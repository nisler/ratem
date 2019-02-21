import { Component, OnInit } from '@angular/core';
import {Assignment} from '../../models/assignment.interface';
import {Course} from '../../models/course.interface';
import {AssignmentService} from '../../services/assignment.service';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {CourseService} from '../../services/course.service';

@Component({
  selector: 'app-assignment-cu',
  templateUrl: './assignment-cu.page.html',
  styleUrls: ['./assignment-cu.page.scss'],
})
export class AssignmentCuPage implements OnInit {
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

  private course: Course = {
    course_name: '',
    semester_id: '',
    semester_name: '',
    semester_is_current: false
  };
  private course_id = null;

  constructor(private assignmentService: AssignmentService,
              private route: ActivatedRoute,
              private nav: NavController,
              private courseService: CourseService) { }

  ngOnInit() {
    this.assignment_id = this.route.snapshot.paramMap.get('id');
    if (this.assignment_id) {
      this.loadAssignment();
    }

    this.course_id = this.route.snapshot.paramMap.get('course_id');
    if (this.course_id) {
      this.loadCourse();
    }
  }

  loadAssignment() {
    console.log('update functionality'); // TODO: update functionality
  }

  loadCourse() {
    this.courseService.getCourseDetails(this.course_id)
        .subscribe(res => {
          this.course = res;
        });
  }

  saveAssignment() {
    if (this.assignment_id) {
      console.log('update assignment'); // TODO: update functionality
    } else {
      this.assignment.course_id = this.course_id;
      this.assignment.course_name = this.course.course_name;
      this.assignment.semester_id = this.course.semester_id;
      this.assignment.semester_name = this.course.semester_name;
      this.assignment.semester_is_current = this.course.semester_is_current;
      this.assignmentService.addAssignment(this.assignment)
          .then(() => {
            this.nav.navigateBack('home'); // TODO navigate back to course detail page
          }).catch((err) => { // TODO: better error checking
            console.log(err);
          });
    }
  }

}
