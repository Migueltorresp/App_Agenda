// firebase.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Licores';

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_liqueur(record) {
    console.log(record);

    return this.firestore.collection(this.collectionName).add(record);
  }

  read_liqueur() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  update_liqueur(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_liqueur(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }
}
