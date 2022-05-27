import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatMenuModule } from '@angular/material/menu';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { GridsterModule } from 'angular-gridster2';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SideMenuComponent } from './side-menu/side-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from './dashboard/card/card.component';
import { FormComponent } from './dashboard/form/form.component';
import { WarningDialogComponent } from './dashboard/form/warning-dialog/warning-dialog.component';
import { DraftsComponent } from './drafts/drafts.component';
import { FirebaseService } from './services/firebase.service';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { SignupComponent } from './authenticate/signup/signup.component';
import { SigninComponent } from './authenticate/signin/signin.component';
import { FormBuilderComponent } from './admin/form-builder/form-builder.component';
import { TemplatesComponent } from './admin/templates/templates.component';
import { TemplatePreviewComponent } from './admin/templates/template-preview/template-preview.component';
import { SearchTemplatePipe } from './pipes/search-template.pipe';
import { Formio, FormioModule, FormioAppConfig } from 'angular-formio';
import { SubmissionsComponent } from './admin/submissions/submissions.component';
import { SubmissionDetailComponent } from './admin/submissions/submission-detail/submission-detail.component';
import { ChatComponent } from './admin/submissions/submission-detail/chat/chat.component';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FormatFileSizePipe } from './pipes/bytes-convert.pipe';
import { BarVerticalComponent } from './admin/submissions/graphs/bar-vertical/bar-vertical.component';
import { PieComponent } from './admin/submissions/graphs/pie/pie.component';
import { SubmissionsHistoryComponent } from './student/submissions-history/submissions-history.component';


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    DashboardComponent,
    CardComponent,
    FormComponent,
    WarningDialogComponent,
    DraftsComponent,
    AuthenticateComponent,
    SignupComponent,
    SigninComponent,
    FormBuilderComponent,
    TemplatesComponent,
    TemplatePreviewComponent,
    SearchTemplatePipe,
    SubmissionsComponent,
    SubmissionDetailComponent,
    ChatComponent,
    FileUploadComponent,
    DropZoneDirective,
    FormatFileSizePipe,
    BarVerticalComponent,
    PieComponent,
    SubmissionsHistoryComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormioModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyB4p20bnbC8hAFZ35aTB93_cavLI7Hqrdc",
      authDomain: "secretariat-online-dm.firebaseapp.com",
      projectId: "secretariat-online-dm",
      storageBucket: "secretariat-online-dm.appspot.com",
      messagingSenderId: "176948909840",
      appId: "1:176948909840:web:45cd74419d9dbfa14f3795",
      measurementId: "G-B5VFEH2MBW"
    }),
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgxChartsModule,
    GridsterModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTableModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressBarModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
