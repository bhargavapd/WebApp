import { Component, OnInit,VERSION } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerService } from 'src/app/services/customer.service';
import { CustomerInterface } from 'src/app/modelsInterfaces/CustomerInterface.model';
import { UtilityService } from 'src/app/services/utility.service';
import { catchError, throwError } from 'rxjs';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  customersResponseData:CustomerInterface[];
  customersData:any[];
  customerHeaders:string[];
  loading: boolean;
  customDialog!: MatDialogRef<CustomDialogComponent>;
  constructor(private customerService:CustomerService,
                private utilityService:UtilityService,
                private router:Router,
                private dialogModel:MatDialog) {
    console.log(VERSION);
    this.customersData=[];
    this.customersResponseData=[];
    this.customerHeaders=[];
    this.loading=true;
   }

  ngOnInit(): void {
   this.getDataAndPopulateCustomersTable();
  }
   getDataAndPopulateCustomersTable(){
    this.customerService.getCustomers().pipe(catchError(error=>{
      this.loading=false;
      //const errorObj=new Error(error);
          return throwError(()=>error);
    })).subscribe(data=>{
      this.loading=false;
      this.customersResponseData=data;
      this.populateRowAndHeaders();
      console.log(data);
    })
   }
  showLoader():boolean{
    return this.loading;
  }
  populateRowAndHeaders(){
    if(this.customersResponseData && this.customersResponseData.length>0){
      this.customersData=this.utilityService.filterHeaders(this.customersResponseData);
      this.customerHeaders=this.utilityService.getHeaders();
    }
  }
  delete(event:any,customer:any){
    console.log("delete",customer);
    this.customDialog=this.dialogModel.open(CustomDialogComponent,{
      width:"250px",
      data: { name: customer.FirstName } 
    });
    this.customDialog.afterClosed().pipe(catchError(error=>{
      //const errorObj=new Error(error);
      return throwError(()=>error);
    })).subscribe(data=>{
      if(data==="YES"){
        this.loading=true;
        this.onSuccessfullDelete(customer.CustomerId);
      }
    })
   
    
  }
  onSuccessfullDelete(customerId:string){
    this.customerService.deleteCustomer(customerId).pipe(catchError(error=>{
      this.loading=false;
      console.log(error);
      //const errorObj=new Error(error);
          return throwError(()=>error);
    })
    ).subscribe(data=>{
      this.loading=false;
      this.getDataAndPopulateCustomersTable();
      console.log(data);
    });
  }
  edit(event:any,customer:any){
    console.log("edit",customer);
    this.router.navigateByUrl(`/edit/${customer.CustomerId}`);
  }
  add(){
    console.log("add");
    this.router.navigateByUrl("/add");
  }
}
