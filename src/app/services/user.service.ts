import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {UserCourse} from '../models/usercourse.interface';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCourseCollection: AngularFirestoreCollection<UserCourse>;
  private userCourseList: Observable<UserCourse[]>;

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
  }

  getUserCourseList() {
    return this.userCourseList;
  }

  addUserCourse(userCourse: UserCourse) {
    return this.userCourseCollection.add(userCourse);
  }
}
