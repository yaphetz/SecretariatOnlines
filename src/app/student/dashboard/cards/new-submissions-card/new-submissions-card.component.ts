import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-submissions-card',
  templateUrl: './new-submissions-card.component.html',
  styleUrls: ['./new-submissions-card.component.scss']
})
export class NewSubmissionsCardComponent implements OnInit {

  newSubmissions$ : Observable<any>;
  unsolvedSubmissions$ : Observable<any>;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.newSubmissions$ = this.firestore.collection('submissions', (ref)=> ref.where("user.uid", "==", 'kILNSeCAeZXCcTkkErwy6Ug52o82').where("state", "==", "new")).valueChanges({ idField: "id" })
    this.unsolvedSubmissions$ = this.firestore.collection('submissions', (ref)=> ref.where("user.uid", "==", 'kILNSeCAeZXCcTkkErwy6Ug52o82').where("state", "!=", "solved")).valueChanges({ idField: "id" })
  }

}
