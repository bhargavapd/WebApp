import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {path:"",component:DashboardComponent},
  {path:"add",component:AddCustomerComponent},
  {path:"edit/:id",component:EditCustomerComponent},
  {path:"error",component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
