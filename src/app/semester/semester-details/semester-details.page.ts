import {Component, OnDestroy, OnInit} from '@angular/core';
import {Semester} from '../../models/semester.interface';
import {SemesterService} from '../../services/semester.service';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../../services/course.service';
import {Subscription} from 'rxjs';
import {Course} from '../../models/course.interface';

@Component({
  selector: 'app-semester-details',
  templateUrl: './semester-details.page.html',
  styleUrls: ['./semester-details.page.scss'],
})
export class SemesterDetailsPage implements OnInit, OnDestroy {
  private semester: Semester = {
    semester_name: '',
    semester_is_current: false
  };

  private semester_id = null;

  private courseList: Course[];
  private semesterSub: Subscription;
  private coursesSub: Subscription;

  constructor(private semesterService: SemesterService,
              private route: ActivatedRoute,
              private courseService: CourseService) { }

  ngOnInit() {
    this.semester_id = this.route.snapshot.paramMap.get('id');
    if (this.semester_id) {
      this.loadSemester();
    }
  }

  ngOnDestroy() {
    this.coursesSub.unsubscribe();
    this.semesterSub.unsubscribe();
  }

  loadSemester() {
    // TODO: add loading
    this.semesterSub = this.semesterService.getSemesterDetails(this.semester_id).subscribe(res => {
      this.semester = res;
    });

    // need to grab subscription in order to unsubscribe during the onDestroy lifecycle hook
    this.coursesSub = this.courseService.getCourseList().subscribe(res => {
      this.courseList = res.filter(course => course.semester_id === this.semester_id);
    });
  }

}
