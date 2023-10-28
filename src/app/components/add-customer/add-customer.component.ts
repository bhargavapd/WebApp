
import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError,pipe, throwError } from 'rxjs';

import { Customer } from 'src/app/modelClasses/create-customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  addCustomerForm:FormGroup;
  @ViewChild("statusView", { read: ViewContainerRef }) vc!: ViewContainerRef;
  @ViewChild("error") errorViewChild!: TemplateRef<any>;
  @ViewChild("success") successViewChild!:TemplateRef<any>;
  errorMessage!: string;
  successMessage!:string;
  constructor(private formBuilder:FormBuilder,
              private customerService:CustomerService,
              private router:Router,
              private utilityService:UtilityService) {
    this.addCustomerForm=this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])],
      teleCodeOfPhoneNumber:['+91',Validators.required],
      phoneNumber:['',Validators.compose([Validators.required,Validators.minLength(12),Validators.pattern("[0-9]{3}-[0-9]{3}-[0-9]{4}")])],
      countryCode:['US'],
      gender:['',Validators.required],
      balance:[0],
      password:['',Validators.required]
    });
   }

  ngOnInit(): void {

  }
  insertTemplateInContainer(template:TemplateRef<any>){
    let viewTemplate=template.createEmbeddedView(null);
    this.vc.clear();
    this.vc.insert(viewTemplate,0);
  }
  onSubmit(){
    if(this.addCustomerForm.invalid){
      console.log("form invalid");
      return;
    }
      console.log(this.addCustomerForm);
      console.log(this.addCustomerForm.value);
      let randomWholeNumber=Math.floor(Math.random()*1000+1);
      let customerId=randomWholeNumber.toString();
      let salutation=this.addCustomerForm.value.gender==='M'?'Mr.':'Mrs.';
      let initials=this.addCustomerForm.value.firstName[0]+".";
      let countryCodeAlpha='USA';
      let countryName='United States';
      let primaryLanguageCode="en";
      let primaryLanguage="English";
      let currency="USD";
      let country_rank= randomWholeNumber.toString();
      let country_frequency=(randomWholeNumber+1000).toString();
      let fname_ascii= this.addCustomerForm.value.firstName.toLowerCase();
      let lname_ascii= this.addCustomerForm.value.lastName.toLowerCase();
      let phoneNumberWithTeleCode=`${this.addCustomerForm.value.teleCodeOfPhoneNumber?.trim()} ${this.addCustomerForm.value.phoneNumber}`;
      let customer:Customer=new Customer(customerId,
                                                      salutation,
                                                      initials,
                                                      this.addCustomerForm.value.firstName,
                                                      fname_ascii,
                                                      this.addCustomerForm.value.gender,
                                                      country_rank,
                                                      country_frequency,
                                                      this.addCustomerForm.value.lastName,
                                                      lname_ascii,
                                                      country_rank,
                                                      country_frequency,
                                                      this.addCustomerForm.value.email,
                                                      this.addCustomerForm.value.password,
                                                      this.addCustomerForm.value.countryCode,
                                                      countryCodeAlpha,
                                                      countryName,
                                                      primaryLanguageCode,
                                                      primaryLanguage,
                                                      this.addCustomerForm.value.balance,
                                                      phoneNumberWithTeleCode,
                                                      currency
                                                      );
       this.customerService.postCustomer(customer).pipe(catchError(error=>{
          console.log(error);
          this.errorMessage='Uh oh! some error occurred';
          this.insertTemplateInContainer(this.errorViewChild);
          //const errorObj=new Error(error);
          return throwError(()=>error);
       })).subscribe(data=>{
        this.successMessage="Record added successfully";
        this.insertTemplateInContainer(this.successViewChild);
          console.log(data);
       });
  }

  backtoHome(){
    this.router.navigateByUrl("/");
  }
  getGenderList():any[]{
    return this.utilityService.getGenderList();
  }
  getCountriesInfo(){
    return this.utilityService.getCountriesList();
  }
}
