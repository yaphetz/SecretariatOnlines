import { Component, OnInit, Output } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  uploadedFiles = [];
  isHovering: boolean;

  @Output() uploadedFilesEmitter = new EventEmitter();


  constructor(private storage: AngularFireStorage, private userService: FirebaseService) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
    console.log(this.isHovering)
  }

  startUpload(event: FileList) {
    const file  = event.item(0);
    console.log(file)
    const userId = this.userService.user.uid;
    const customMetadata = { name: file.name, uploadedBy: userId}
    const path = `submissions/attachments/${new Date().getTime()}.${file.name.split('.')[file.name.split('.').length-1]}`;
    this.task = this.storage.upload(path, file, {customMetadata});
    this.task.then( (file)=> {
      this.task.task.snapshot.ref.getDownloadURL().then( (url)=> {
        console.log(url);
        this.uploadedFiles.push({name: file.metadata.customMetadata.name, downloadUrl: url})
        this.emitFiles();
      })
    })
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  async emitFiles() {
    this.uploadedFilesEmitter.emit(this.uploadedFiles);
  }
  

  ngOnInit(): void {
  }

}
