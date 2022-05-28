import { Component, OnInit } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from "rxjs/internal/Observable";


interface Template {
  active: boolean;
  template: string;
}

@Component({
  selector: "app-templates",
  templateUrl: "./templates.component.html",
  styleUrls: ["./templates.component.scss"],
})
export class TemplatesComponent implements OnInit {
  constructor(private router : Router, private firestore: AngularFirestore, private popup: MatDialog) {}

  templatesCollection: AngularFirestoreCollection<Template>;
  templates: Observable<Template[]>;
  templates2 = [];
  searchValue: string;

  ngOnInit(): void {
    this.templatesCollection = this.firestore.collection('templates');
    this.templates = this.templatesCollection.valueChanges({ idField: "uid" });
    this.templates.subscribe( (data)=> {
      this.templates2 = data;
    })

  }

  deleteTemplate(document) {
    this.templatesCollection.doc(document).delete().then( ()=> {
      console.log('Document removed');
    })
    .catch( (error)=> {
      console.log("Error removing template: ", error)
    })
  }

  toggleTemplateStatus(template) {
    template.active = !template.active;
    this.templatesCollection.doc(template.id).set(template)
  }

  updateSearch(term) {
    this.searchValue = term;
  }

  openTemplatePreview(template) {
    this.router.navigate(['templates', template.id], { state: template})
  }

  ngAfterViewInit() {

  }
}




