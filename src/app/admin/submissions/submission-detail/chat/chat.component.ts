import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  replies = [];
  @Input() submissionId = '';

  messageContent: string;
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.getMessages();
  }

  ngOnChanges(changes) {
    if(changes.submissionId)
    this.getMessages();
  }

  public getMessages() {
    return this.firestore.collection('submissions').doc(this.submissionId).collection('replies').valueChanges().pipe(take(1)).subscribe( (replies)=> {
      this.replies = replies;
      console.log(replies)
    })
  }


  sendMessage() {
    this.firestore.collection('submissions').doc(this.submissionId).collection('replies').ref.orderBy('timestamp').onSnapshot( (snapshot)=> {
      console.log(      snapshot.docChanges()     )
    })
    this.firestore.collection('submissions').doc(this.submissionId).collection('replies').add({sender: 'admin', message: this.messageContent, timestamp: new Date()})
    this.getMessages();
  }

}
