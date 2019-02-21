import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Feedback} from '../models/feedback.interface';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbackCollection: AngularFirestoreCollection<Feedback>;
  private feedbackList: Observable<Feedback[]>;

  constructor(private db: AngularFirestore) {
    this.feedbackCollection = db.collection<Feedback>('feedbackList');

    this.feedbackList = this.feedbackCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );
  }

  getFeedbackList() {
    return this.feedbackList;
  }

  addFeedback(feedback: Feedback) {
    return this.feedbackCollection.add(feedback);
  }
}
