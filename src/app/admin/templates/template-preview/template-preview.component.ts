import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FirebaseService } from "src/app/services/firebase.service";

@Component({
  selector: "app-template-preview",
  templateUrl: "./template-preview.component.html",
  styleUrls: ["./template-preview.component.scss"],
})
export class TemplatePreviewComponent implements OnInit {
  subscriptionForm: FormGroup;
  template;
  templateID;

  constructor(private router: Router, private firestore: AngularFirestore, private authService: FirebaseService) {
    let routerData = this.router.getCurrentNavigation().extras.state;
    if (routerData) {
      this.templateID = routerData.uid;
      this.template = JSON.parse(routerData.template);
    } else this.router.navigate(["templates"]);
  }

  ngOnInit(): void {}

  onSubmit(submission) {
    submission.user = this.authService.user;
    submission.state = "new";
    submission.metadata.time = new Date();
    submission.template = { name: this.templateID, uid: this.templateID };
    this.firestore.collection("submissions").add(submission);
  }
}