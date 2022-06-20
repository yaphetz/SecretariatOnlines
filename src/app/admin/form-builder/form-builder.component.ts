import { Component, OnInit, Optional } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { builderConfig } from "./form-builder.config";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';


interface Template {
  id: string;
  active: boolean;
  template: string;
}

@Component({
  selector: "app-form-builder",
  templateUrl: "./form-builder.component.html",
  styleUrls: ["./form-builder.component.scss"],
})
export class FormBuilderComponent implements OnInit {
  templateNameFormControl = new FormControl("", [Validators.required]);
  templatesCollection: AngularFirestoreDocument<Template>;
  templates: Observable<Template>;
  form: any;
  templateName: string;
  currentTemplate: string;

  constructor(private firestore: AngularFirestore, private router: Router, private notificator: MatSnackBar) {
    let routerData = this.router.getCurrentNavigation().extras.state;
    if (routerData) {
      this.defaultForm = JSON.parse(routerData.template)
      this.templateName = routerData.id;
    } 
  }

  ngOnInit(): void {
    this.builderConfig = builderConfig;
  }

  onChange(event) {
    this.currentTemplate = event.form;
  }

  publishTemplate(templateName) {
    this.templatesCollection = this.firestore.doc(`templates/${templateName}`);
    this.templatesCollection.set(
      { template: JSON.stringify(this.currentTemplate), active: true, id: templateName }, { merge: true }
      );
      this.notificator.open('Formularul este publicat', 'Închide')
  }

  builderConfig: any;

  defaultForm = {
    input: true,
    label: "Trimite",
    tableView: false,
    key: "submit",
    size: "md",
    leftIcon: "",
    rightIcon: "",
    block: false,
    action: "submit",
    disableOnInvalid: true,
    theme: "primary",
    type: "button",
  };
}
