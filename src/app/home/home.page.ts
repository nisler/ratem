import {Component, OnInit} from '@angular/core';
import {Semester} from '../models/semester.interface';
import {SemesterService} from '../services/semester.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private semesterList: Semester[];

  constructor(private semesterService: SemesterService) { }

  ngOnInit() {
    this.semesterService.getSemesterList().subscribe(res => {
      this.semesterList = res;
    });
  }

}
