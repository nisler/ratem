import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Assignment} from '../models/assignment.interface';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private assignmentCollection: AngularFirestoreCollection<Assignment>;
  private assignmentList: Observable<Assignment[]>;

  constructor(private db: AngularFirestore) {
    this.assignmentCollection = db.collection<Assignment>('assignmentList');

    this.assignmentList = this.assignmentCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );
  }

  getAssignmentList() {
    return this.assignmentList;
  }

  getAssignmentDetails(id) {
    return this.assignmentCollection.doc<Assignment>(id).valueChanges();
  }

  addAssignment(assignment: Assignment) {
    return this.assignmentCollection.add(assignment);
  }
}
