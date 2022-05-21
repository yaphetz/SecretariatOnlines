import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-submission-detail',
  templateUrl: './submission-detail.component.html',
  styleUrls: ['./submission-detail.component.scss']
})
export class SubmissionDetailComponent implements OnInit {

  @Input() submissionId: any;
  
  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    // if(this.submissionId.replies) {
    //   console.log(this.submissionId.replies)
    //   this.submissionId.replies = [];
    // }

  }

}
