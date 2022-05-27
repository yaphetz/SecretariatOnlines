import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {

  constructor(private firestore : AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
    .collection("submissions")
    .valueChanges({ idField: "id" })
    .subscribe((data) => {
      this.pieChartData = this.getPieChartData(data);
    });
  }

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ["#3cb3718c", "#B7A000", "#3F51B5"],
  };

  pieChartData = [];

  getPieChartData(submissions) {
    console.log(submissions);
    let count = { closed: 0, pending: 0, new: 0 };
    submissions.forEach((submission) => {
      switch (submission.state) {
        case "solved":
          count.closed++;
          break;
        case "pending":
          count.pending++;
          break;
        case "new":
          count.new++;
          break;
      }
    });

    let result = [];
    result.push({ name: "Rezolvat", value: count.closed });
    result.push({ name: "În progres", value: count.pending });
    result.push({ name: "Nou", value: count.new });

    return result;
  }
}
