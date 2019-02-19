import { Component, OnInit } from '@angular/core';
import {Semester} from '../../models/semester.interface';
import {SemesterService} from '../../services/semester.service';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-semester-details',
  templateUrl: './semester-details.page.html',
  styleUrls: ['./semester-details.page.scss'],
})
export class SemesterDetailsPage implements OnInit {
  private semester: Semester = {
    semester_name: '',
    semester_is_current: false
  };

  private semester_id = null;

  constructor(private semesterService: SemesterService,
              private route: ActivatedRoute,
              private nav: NavController) { }

  ngOnInit() {
    this.semester_id = this.route.snapshot.paramMap.get('id');
    if (this.semester_id) {
      this.loadSemester();
    }
  }

  loadSemester() {
    // TODO: add loading
    this.semesterService.getSemesterDetails(this.semester_id).subscribe(res => {
      this.semester = res;
    });
  }

  saveSemester() {
    if (this.semester_id) {
      this.semesterService.updateSemester(this.semester, this.semester_id).then(() => {
        this.nav.navigateBack('home');
      });
    } else {
      this.semesterService.addSemester(this.semester).then(() => {
        this.nav.navigateBack('home');
      });
    }
  }

}
