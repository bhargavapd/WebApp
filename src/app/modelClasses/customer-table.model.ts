export class CustomerTable {
  CustomerId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  CountryCode: string;
  Gender: string;
  Balance: number;
  constructor(
    customerId: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    countryCode: string,
    gender: string,
    balance: number
  ) {
    this.CustomerId = customerId;
    this.FirstName=firstName;
    this.LastName=lastName;
    this.Email=email;
    this.PhoneNumber=phoneNumber;
    this.CountryCode=countryCode;
    this.Gender=gender;
    this.Balance=balance;

  }
}
