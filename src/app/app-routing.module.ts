import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './admin/form-builder/form-builder.component';
import { TemplatePreviewComponent } from './admin/templates/template-preview/template-preview.component';
import { TemplatesComponent } from './admin/templates/templates.component';
import { AuthGuard } from './core/auth.guard';
import { AdminGuard } from './core/admin.guard';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { SigninComponent } from './authenticate/signin/signin.component';
import { SignupComponent } from './authenticate/signup/signup.component';
import { DraftsComponent } from './drafts/drafts.component';
import { SubmissionsComponent } from './admin/submissions/submissions.component';
import { SubmissionDetailComponent } from './admin/submissions/submission-detail/submission-detail.component';
import { SubmissionsHistoryComponent } from './student/submissions-history/submissions-history.component';
import { DashboardComponent } from './student/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'acasa',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'istoric',
    component: SubmissionsHistoryComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'form-builder',
    component: FormBuilderComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'templates',
    component: TemplatesComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'templates/:id',
    component: TemplatePreviewComponent,
  },
  {
    path: 'drafts',
    component: DraftsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'submissions',
    component: SubmissionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: AuthenticateComponent,
    children: [
      {
        path: 'login',
        component: SigninComponent,
      },
      {
        path: 'register',
        component: SignupComponent,
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
