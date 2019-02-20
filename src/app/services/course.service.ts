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

  // TODO: firestore querying
  // getCoursesForSemester(semester_id) {
  //   const coursesRef = this.db.collection<Course>('courseList', ref => {
  //     ref.where('semester_id', '==', semester_id);
  //   });
  // }

  getCourseDetails(id) {
    return this.courseCollection.doc<Course>(id).valueChanges();
  }

  updateCourse(course: Course, id: string) {
    return this.courseCollection.doc(id).update(course);
  }

  addCourse(course: Course) {
    return this.courseCollection.add(course);
  }
}
