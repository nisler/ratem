import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Rating} from '../models/rating.interface';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private ratingCollection: AngularFirestoreCollection<Rating>;

  constructor(private db: AngularFirestore) {
    this.ratingCollection = db.collection<Rating>('ratingList');
  }

  addRating(rating: Rating) {
    return this.ratingCollection.add(rating);
  }

  getRatingsForCourse(course_id) {
    return this.db.firestore.collection('ratingList')
        .where('course_id', '==', course_id)
        .get()
        .then((res) => {
          return res.docs.map(doc => ({ id: doc.id, ...doc.data()}));
        });
  }
}
