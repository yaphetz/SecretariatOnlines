import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take} from 'rxjs/operators';
import {saveAs} from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() submissionId = '';
  
  replies = from([]);
  uploadedFiles = [];
  role: string; 

  messageContent: string = '';
  constructor(private firestore: AngularFirestore, private http : HttpClient, private authService: FirebaseService) { }

  ngOnInit(): void {
    console.log(this.authService.isStudent(this.authService.user))
    this.role = this.authService.isStudent(this.authService.user) ? 'student' : 'admin';
  }

  ngOnChanges(changes) {
    if(changes.submissionId)
    this.replies = this.firestore.collection('submissions').doc(this.submissionId).collection('replies', ref=> ref.orderBy('timestamp')).valueChanges();

  }

  sendMessage() {
    if(this.messageContent || this.uploadedFiles.length != 0)
    this.firestore.collection('submissions').doc(this.submissionId).collection('replies').add({sender: this.role, read: false, message: this.messageContent, attachments: this.uploadedFiles, timestamp: new Date()})
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
