import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Semester} from '../models/semester.interface';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {
  private semestersCollection: AngularFirestoreCollection<Semester>;
  private semesterList: Observable<Semester[]>;

  constructor(private db: AngularFirestore) {
    this.semestersCollection = db.collection<Semester>('semesterList');

    this.semesterList = this.semestersCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );
  }

  getSemesterList() {
    return this.semesterList;
  }

  getSemesterDetails(id) {
    return this.semestersCollection.doc<Semester>(id).valueChanges();
  }

  updateSemester(semester: Semester, id: string) {
    return this.semestersCollection.doc(id).update(semester);
  }

  addSemester(semester: Semester) {
    return this.semestersCollection.add(semester);
  }

  removeSemester(id) {
    return this.semestersCollection.doc(id).delete();
  }

}
