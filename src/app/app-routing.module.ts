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
import { DashboardComponent } from './dashboard/dashboard.component';
import { DraftsComponent } from './drafts/drafts.component';
import { SubmissionsComponent } from './admin/submissions/submissions.component';
import { SubmissionDetailComponent } from './admin/submissions/submission-detail/submission-detail.component';


const routes: Routes = [
  {
    path: 'acasa',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'form-builder',
    component: FormBuilderComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'templates',
    component: TemplatesComponent,
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
    children : [
      {
        path: 'no/:id',
        component: SubmissionDetailComponent,
        canActivate: [AuthGuard]
      }
    ]
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
