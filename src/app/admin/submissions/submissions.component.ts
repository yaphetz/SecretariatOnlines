import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Submission } from "src/app/models/submission.model";
import { MatTableDataSource } from "@angular/material/table";
import { AngularFirestore, DocumentChange } from "@angular/fire/compat/firestore";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { take } from "rxjs/operators";
import { MatTableFilter } from "mat-table-filter";
import { MatSort, Sort } from "@angular/material/sort";
import * as _ from 'lodash';


@Component({
  selector: "app-submissions",
  templateUrl: "./submissions.component.html",
  styleUrls: ["./submissions.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
    ]),
  ],
})
export class SubmissionsComponent implements OnInit {
  @ViewChild("table") tableRef: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private firestore: AngularFirestore) {}

  displayedColumns: string[] = ["name", "date", "time", "weight", "symbol"];
  expandedElement: any | null;
  dataSource: MatTableDataSource<any>;
  selectedSubmission;
  filterEntity;
  filterType;

  ngOnInit(): void {
    this.firestore
      .collection("submissions")
      .valueChanges({ idField: "id" })
      .subscribe((data: Submission[]) => {
        this.dataSource = new MatTableDataSource(data);
        console.log(this.sort)
        console.log(data);
        console.log("change");
      });
    this.filterEntity = new Submission();
    this.filterType = MatTableFilter.ANYWHERE;
  }

  ngAfterViewInit() {
  }

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
        this.firestore.collection("submissions").doc(submissionId).update({ state: status });
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

  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data, string): boolean => {
      let cleanData = JSON.parse(JSON.stringify(data));
      delete cleanData.data;
      delete cleanData.id;
      delete cleanData.metadata;
      if (JSON.stringify(cleanData).toLocaleLowerCase().trim().includes(string)) {
        return true;
      }
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = _.get;
    console.log(this.dataSource.data)
    console.log(this.dataSource.sort)
  }

  scrollTo(className: string): void {
    setTimeout(() => {
      const elementList = document.querySelectorAll(className);
      const element = elementList[0] as HTMLElement;
      element.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
}
