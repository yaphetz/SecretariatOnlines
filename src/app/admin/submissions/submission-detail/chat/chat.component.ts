import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take} from 'rxjs/operators';
import {saveAs} from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() submissionId = '';
  
  replies = from([]);
  uploadedFiles = [];

  messageContent: string = '';
  constructor(private firestore: AngularFirestore, private http : HttpClient) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes) {
    if(changes.submissionId)
    this.replies = this.firestore.collection('submissions').doc(this.submissionId).collection('replies', ref=> ref.orderBy('timestamp')).valueChanges();

  }

  sendMessage() {
    if(this.messageContent || this.uploadedFiles.length != 0)
    this.firestore.collection('submissions').doc(this.submissionId).collection('replies').add({sender: 'admin', read: false, message: this.messageContent, attachments: this.uploadedFiles, timestamp: new Date()})
    this.messageContent = null;
    this.uploadedFiles = [];
  }

  receiveUploadedFiles(event) {
    this.uploadedFiles = event;
    console.log(event);
  }

  downloadFile(url, fileName) {
    this.http.get(url, {responseType: "blob", headers: {'Accept': 'application/pdf'}})
  .subscribe(blob => {
    saveAs(blob, fileName);
  });
  }

}
