import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  AngularFirestore,
  DocumentChange,
} from "@angular/fire/compat/firestore";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { take } from "rxjs/operators";
import { FirebaseService } from "src/app/services/firebase.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-submissions-history",
  templateUrl: "./submissions-history.component.html",
  styleUrls: ["./submissions-history.component.scss"],
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
export class SubmissionsHistoryComponent implements OnInit {
  @ViewChild("table") tableRef: ElementRef;

  constructor(
    private firestore: AngularFirestore,
    private authservice: FirebaseService
  ) {}

  displayedColumns: string[] = ["name", "date", "time", "symbol"];
  expandedElement: any | null;
  submissions = [];
  selectedSubmission;
  userUID: string;
  userSubmissions: Observable<any>;

  ngOnInit(): void {
    this.getUserUID();
  }

  async getUserUID() {
    this.authservice.user$.pipe(take(1)).subscribe((user) => {
      this.userUID = user.uid;
      this.getUserSubmissions();
    });
  }

  getUserSubmissions() {
    this.userSubmissions = this.firestore
      .collection("submissions", (ref) =>
        ref.where("user.uid", "==", this.userUID).where("state", "==", "solved")
      )
      .valueChanges();
  }

  async getTime(date) {
    let bufferDate = date.toDate();
    return bufferDate.toLocaleTimeString();
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

  scrollTo(className: string): void {
    setTimeout(() => {
      const elementList = document.querySelectorAll(className);
      console.log(elementList);
      const element = elementList[0] as HTMLElement;
      console.log(element);
      element.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
}
