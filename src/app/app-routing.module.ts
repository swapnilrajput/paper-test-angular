import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'employee-list',
    pathMatch:'full',
  },
  {
    path:'employee-list',
    component: EmployeeComponent,
    pathMatch:'full',
  },
  {
    path:'employee-list/:id',
    component: EmployeeDetailComponent,
    pathMatch:'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
