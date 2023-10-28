import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Customer } from 'src/app/modelClasses/create-customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  @ViewChild("statusView", { read: ViewContainerRef }) vc!: ViewContainerRef;
  @ViewChild("error") errorViewChild!: TemplateRef<any>;
  @ViewChild("success") successViewChild!:TemplateRef<any>;
  errorMessage!: string;
  successMessage!:string;
  
  editCustomerForm:FormGroup;
  private id:string|null;
  constructor(private route:ActivatedRoute,
              private customerService:CustomerService,
              private router:Router,
              private utilityService:UtilityService,
              private fb:FormBuilder) {
    this.id=null;
    this.editCustomerForm=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])],
      phoneNumber:['',Validators.compose([Validators.required])],
      teleCodeOfPhoneNumber:['',Validators.required],
      countryCode:['US'],
      gender:['',Validators.required],
      balance:[0],
      password:['',Validators.required]
    });
   }
  
  ngOnInit(): void {
    console.log('snapshot param-map',this.route.snapshot.paramMap);
    this.route.paramMap.subscribe((params:ParamMap)=>{
      console.log('subscribe param-map',params);
      this.id=params.get('id');
      this.customerService.getCustomerByid(this.id).pipe(catchError(error=>{
        //const errorObj=new Error(error);
        this.router.navigateByUrl("/error");
        this.utilityService.publishDataToErrorSubject(error);
        return throwError(()=>error);
      })).subscribe(data=>{
        let customer=data as Customer;
        this.patchDataToForm(customer);
        console.log(`customer with id ${this.id}`,customer);
      })
    });
  }
  patchDataToForm(customer: Customer) {
    let teleCodeWithPhoneNumber=customer.phone_Number.split(" ");
    const teleCode=teleCodeWithPhoneNumber[0];
    const phoneNumber=teleCodeWithPhoneNumber[1];
    let customerDataWithFormFormat={
      firstName:customer.firstname,
      lastName:customer.lastname,
      email:customer.email,
      teleCodeOfPhoneNumber:teleCode,
      phoneNumber:phoneNumber,
      countryCode:customer.country_code,
      gender:customer.gender,
      balance:customer.balance,
      password:customer.password
    };
    this.editCustomerForm.patchValue(customerDataWithFormFormat);
  }

  insertTemplateInContainer(template:TemplateRef<any>){
    let viewTemplate=template.createEmbeddedView(null);
    this.vc.clear();
    this.vc.insert(viewTemplate,0);
  }
  onSubmit(){
    if(this.editCustomerForm.invalid){
      console.log("form invalid");
      return;
    }
    console.log(this.editCustomerForm);
    console.log(this.editCustomerForm.value);
    let randomWholeNumber=Math.floor(Math.random()*1000+1);
    let customerId=this.id||"";
    let salutation=this.editCustomerForm.value.gender==='M'?'Mr.':'Mrs.';
    let initials=this.editCustomerForm.value.firstName[0]+".";
    let countryCodeAlpha='USA';
    let countryName='United States';
    let primaryLanguageCode="en";
    let primaryLanguage="English";
    let currency="USD";
    let country_rank= randomWholeNumber.toString();
    let country_frequency=(randomWholeNumber+1000).toString();
    let fname_ascii= this.editCustomerForm.value.firstName.toLowerCase();
    let lname_ascii= this.editCustomerForm.value.lastName.toLowerCase();
    let customer:Customer=new Customer(customerId,
                                                    salutation,
                                                    initials,
                                                    this.editCustomerForm.value.firstName,
                                                    fname_ascii,
                                                    this.editCustomerForm.value.gender,
                                                    country_rank,
                                                    country_frequency,
                                                    this.editCustomerForm.value.lastName,
                                                    lname_ascii,
                                                    country_rank,
                                                    country_frequency,
                                                    this.editCustomerForm.value.email,
                                                    this.editCustomerForm.value.password,
                                                    this.editCustomerForm.value.countryCode,
                                                    countryCodeAlpha,
                                                    countryName,
                                                    primaryLanguageCode,
                                                    primaryLanguage,
                                                    this.editCustomerForm.value.balance,
                                                    this.editCustomerForm.value.phoneNumber,
                                                    currency
                                                    );
     this.customerService.updateCustomer(customer).pipe(catchError(error=>{
        console.log(error);
        this.errorMessage='Uh oh! some error occurred';
        this.insertTemplateInContainer(this.errorViewChild);
        ////const errorObj=new Error(error);
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
