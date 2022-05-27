import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-submission-detail',
  templateUrl: './submission-detail.component.html',
  styleUrls: ['./submission-detail.component.scss']
})
export class SubmissionDetailComponent implements OnInit {

  @Input() submissionId: any;
  @Output() loadedEmitter = new EventEmitter();
  @ViewChildren('submissionDetails') submissionDetails: QueryList<any>;
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges() {
    this.loadedEmitter.next();
  }


}
