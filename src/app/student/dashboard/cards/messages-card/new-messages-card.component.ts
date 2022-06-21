import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-messages-card',
  templateUrl: './new-messages-card.component.html',
  styleUrls: ['./new-messages-card.component.scss']
})
export class NewMessagesCardComponent implements OnInit {

  newSubmissions$ : Observable<any>;
  unsolvedSubmissions$ : Observable<any>;
  unreadMessages: number = 0;
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.newSubmissions$ = this.firestore.collection('submissions', (ref)=> ref.where("user.uid", "==", 'kILNSeCAeZXCcTkkErwy6Ug52o82').where("state", "==", "new")).valueChanges({ idField: "id" })

    this.firestore.collection('submissions').get().subscribe( (snapshot)=> {
      this.unreadMessages = 0;
      snapshot.forEach( submission => {
        this.firestore.collection(`submissions`).doc(submission.id).collection('replies', (ref)=>  ref.where("read", "==", false)).get().subscribe( snap=> {
          this.unreadMessages = this.unreadMessages + snap.size;
        })
      })
    })
  }

}
