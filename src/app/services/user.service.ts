import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {UserCourse} from '../models/usercourse.interface';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCourseCollection: AngularFirestoreCollection<UserCourse>;
  private userCourseList;
  private userCourseAssignmentList: [];

  constructor(private db: AngularFirestore) {
    this.userCourseCollection = db.collection<UserCourse>('userCourseList');

    this.userCourseList = this.userCourseCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );
    // this.userCourseList = this.queryUserCourseList(this.authService.getLoggedInUser().uid);
  }

  // getUserCourseList(user_id) {
  //   const filtered = this.userCourseList;
  //   filtered.filter(course => course.user_id === user_id);
  //   console.log('filt', filtered); // TODO DELETE
  //   return filtered;
  // }

  getUserCourseList() {
    return this.userCourseList;
  }

  // queryUserCourseList(user_id) {
  //   const courses = [];
  //   this.db.firestore.collection('userCourseList')
  //       .where('user_id', '==', user_id)
  //       .onSnapshot(function (res) {
  //         res.forEach(doc => {
  //           courses.push(doc.data());
  //         });
  //       });
  //   console.log('courses: ', courses); // TODO DELETE
  //   // this.userCourseList = courses;
  //   return courses;
  // }

  addUserCourse(userCourse: UserCourse) {
    return this.userCourseCollection.add(userCourse);
  }

  // getAssignmentsForUserCourses() {
  //   const assignmentList$ = this.db.firestore.collection('assignmentList');
  //   this.userCourseAssignmentList = this.getUserCourseList()
  //       .forEach(course => {
  //         assignmentList$
  //             .where('course_id', '==', course.id)
  //             .get()
  //             .then((res) => {
  //               // return res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //               const data = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //               console.log('data: ', data);
  //               return data;
  //             });
  //       });
  // }
}
