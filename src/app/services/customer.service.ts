import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomerInterface } from '../modelsInterfaces/CustomerInterface.model';
import { Observable } from 'rxjs';
import { Customer } from '../modelClasses/create-customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient:HttpClient) { }
  getCustomers(){
    return this.httpClient.get<CustomerInterface[]>(`${environment.api}${environment.getCustomersRoute}`);
  }
  postCustomer(customer:Customer):Observable<any>{
    const headers={'content-type':'application/json'};
    const jsonStringBody=JSON.stringify(customer);
    return this.httpClient.post(`${environment.api}${environment.postCustomerRoute}`,jsonStringBody,{'headers':headers});
  }
  deleteCustomer(id:string){
    return this.httpClient.delete(`${environment.api}${environment.deleteCustomerRoute}/${id}`);
  }
  getCustomerByid(id:string|null){
    return this.httpClient.get(`${environment.api}${environment.getCustomerByIdRoute}/${id}`);
  }
  updateCustomer(customer:Customer):Observable<any>{
    const headers={'content-type':'application/json'};
    const jsonStringBody=JSON.stringify(customer);
    return this.httpClient.put(`${environment.api}${environment.updateCustomerRoute}/${customer.id}`,jsonStringBody,{'headers':headers});
  }
}
