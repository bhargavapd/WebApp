import { Injectable } from '@angular/core';
import { CustomerInterface } from '../modelsInterfaces/CustomerInterface.model';
import { CustomerTable } from '../modelClasses/customer-table.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private headers=['CustomerId','FirstName','LastName','Email','PhoneNumber','CountryCode','Gender','Balance'];
  private currency=['USD','CAD','INR'];
  private countriesInfo=[{code:'US',codeAlpha:'USA',name:'Unites States',teleCode:"+1"},
                         {code:'CA',codeAlpha:'CAN',name:'Canada',teleCode:"+1"},
                         {code:'IN',codeAlpha:'IND',name:'India',teleCode:"+91"}];
  private genderList=[{key:'Male',value:'m'},{key:'Female',value:'f'}];
  private errorBehaviourSubject: BehaviorSubject<any>;
  constructor() {
    this.errorBehaviourSubject=new BehaviorSubject<any>(null);
   }
  filterHeaders(srcData:CustomerInterface[]):CustomerTable[]{
    let customersFilteredData: CustomerTable[]=[];

    srcData.forEach((element)=>{
      let tempObject= new CustomerTable(element['id'],element['firstname'],element['lastname'],element['email'],element['phone_Number'],element['country_code'],element['gender'],element['balance']);
  
      customersFilteredData.push(tempObject);
    })
    return customersFilteredData;
  }
  getHeaders():string[]{
    return this.headers;
  }
  getGenderList():any[]{
    return this.genderList;
  }
  getCountriesList():any[]{
    return this.countriesInfo;
  }
  publishDataToErrorSubject(data:any){
    this.errorBehaviourSubject.next(data);
  }
  getErrorSubject(){
    return this.errorBehaviourSubject;
  }
}
