import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';
import { TableComponent } from './components/table/table.component';
import { AuthGuard } from './_authGuard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'table',
        component: TableComponent,
      },
      { path: 'form', component: FormComponent },
      { path: 'form/:id', component: FormComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
