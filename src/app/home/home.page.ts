import {Component, OnDestroy, OnInit} from '@angular/core';
import {Semester} from '../models/semester.interface';
import {SemesterService} from '../services/semester.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  private semesterList: Semester[];
  private semesterSub: Subscription;

  constructor(private semesterService: SemesterService) { }

  ngOnInit() {
    this.semesterSub = this.semesterService.getSemesterList()
        .subscribe(res => {
          this.semesterList = res;
        });
  }

  ngOnDestroy() {
    this.semesterSub.unsubscribe();
  }

}
