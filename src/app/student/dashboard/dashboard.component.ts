import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})

export class DashboardComponent implements OnInit {

  constructor(private firestore : AngularFirestore) { }
  submissions$: Observable<any>;

  ngOnInit(): void {
    this.submissions$ = this.firestore.collection('submissions', (ref)=> ref.where("user.uid", "==", 'kILNSeCAeZXCcTkkErwy6Ug52o82').where("state", "!=", "solved")).valueChanges({ idField: "id" })
  }

  displayedColumns: string[] = ["title","date", "time", "symbol"];
  expandedElement: any | null;
  submissions = [];
  selectedSubmission;

  async getTime(date) {
    let bufferDate = date.toDate();
    return bufferDate.toLocaleTimeString();
  }

  async deleteSubmission(index) {
    let submissionId;
    this.firestore
      .collection("submissions")
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((doc) => {
        submissionId = doc[index].payload.doc.id;
        this.firestore.collection("submissions").doc(submissionId).delete();
      });
  }

  async changeSubmissionStatus(index, status) {
    let submissionId;
    this.firestore
      .collection("submissions")
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((doc) => {
        submissionId = doc[index].payload.doc.id;
        this.firestore
          .collection("submissions")
          .doc(submissionId)
          .update({ state: status });
      });
  }

  async emitSubmission(event) {
    this.selectedSubmission = event;
  }

  submissionStatus(status) {
    switch (status) {
      case "new":
        return "mail";
      case "pending":
        return "drafts";
      case "solved":
        return "check_circle";
      default:
        return "undefined";
    }
  }

  scrollTo(className: string):void {
    setTimeout(() => {
      const elementList = document.querySelectorAll(className);
      const element = elementList[0] as HTMLElement;
      element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
 }

}
