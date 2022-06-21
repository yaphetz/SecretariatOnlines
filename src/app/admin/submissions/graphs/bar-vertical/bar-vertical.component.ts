import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { from, Observable } from "rxjs";
import { timestamp } from "rxjs/operators";

@Component({
  selector: "app-bar-vertical",
  templateUrl: "./bar-vertical.component.html",
  styleUrls: ["./bar-vertical.component.scss"],
})
export class BarVerticalComponent implements OnInit {
  constructor(private firestore: AngularFirestore) {}
  barGraphData = [];

  ngOnInit(): void {
    this.getLength();
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.view = [500,300]
    } 
  }

  async getLength() {
    let days = ["Duminică", "Luni", "Marți", "Miecuri", "Joi", "Vineri", "Sâmbătă"];
    let daysAgoDate = (daysAgo) => new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
    for (let i = 0; i < 7; i++) {
      await this.getNumberOfSubmission(i + 1, i).subscribe(async (data) => {
        await this.barGraphData.push({ name: days[daysAgoDate(i).getDay()] + " " + daysAgoDate(i).getDate(), value: data.length });
        this.barGraphData = JSON.parse(JSON.stringify(this.barGraphData));
      });
    }
  }

  getNumberOfSubmission(from: number, to: number) {
    let daysAgoDate = (daysAgo) => new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
    return this.firestore
      .collection("submissions", (ref) => ref.where("metadata.time", ">=", daysAgoDate(from)).where("metadata.time", "<=", daysAgoDate(to)))
      .valueChanges();
  }

  view: any[] = [600, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = "Country";
  showYAxisLabel = true;
  yAxisLabel = "Numărul de cereri deschise";

  colorScheme = {
    domain: ["#65d4d9b8"],
  };

  onSelect(event) {
  }
}
