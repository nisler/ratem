import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Course} from '../models/course.interface';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseCollection: AngularFirestoreCollection<Course>;
  private courseList: Observable<Course[]>;

  constructor(private db: AngularFirestore) {
    this.courseCollection = db.collection<Course>('courseList');

    this.courseList = this.courseCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );
  }

  getCourseList() {
    return this.courseList;
  }

  getCourseDetails(id) {
    return this.courseCollection.doc<Course>(id).valueChanges();
  }

  addCourse(course: Course) {
    return this.courseCollection.add(course);
  }
}
