import { Component, OnInit, Optional } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { builderConfig } from "./form-builder.config";
import { FormControl, Validators } from "@angular/forms";

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

  constructor(private firestore: AngularFirestore) {
    console.log(this.form);
  }

  ngOnInit(): void {
    this.builderConfig = builderConfig;
  }

  onChange(event) {
    this.currentTemplate = event.form;
    console.log(event);
  }

  updateContent(template, templateName) {
    this.templatesCollection = this.firestore.doc(`templates/${templateName}`);
    this.templatesCollection.set({ template: JSON.stringify(template), active: true, id: templateName }, { merge: true });
  }

  publishTemplate(templateName) {
    this.templatesCollection = this.firestore.doc(`templates/${templateName}`);
    this.templatesCollection.set({ template: JSON.stringify(this.currentTemplate), active: true, id: templateName }, { merge: true });
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
