// home.page.ts
import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

interface liqueurData {
  Name: string;
  Quantity:number;
  Price: number;
  Description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  liqueurList = [];
  liqueurData: liqueurData;
  liqueurForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.liqueurData = {} as liqueurData;
  }

  ngOnInit() {

    this.liqueurForm = this.fb.group({
      Name: ['', [Validators.required]],
      Quantity: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Description: ['', [Validators.required]]
    })

    this.firebaseService.read_liqueur().subscribe(data => {

      this.liqueurList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Quantity: e.payload.doc.data()['Quantity'],
          Price: e.payload.doc.data()['Price'],
          Description: e.payload.doc.data()['Description'],
        };
      })

    });
  }

  CreateRecord() {
    this.firebaseService.create_liqueur(this.liqueurForm.value)
      .then(resp => {
        //Reset form
        this.liqueurForm.reset();
      })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.firebaseService.delete_liqueur(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditQuantity = record.Quantity;
    record.EditPrice = record.Price;
    record.EditDescription = record.Description;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Quantity'] = recordRow.EditQuantity;
    record['Price'] = recordRow.EditPrice;
    record['Description'] = recordRow.EditDescription;
    this.firebaseService.update_liqueur(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
