export class Customer {
  id: string;
  salutation: string;
  initials: string;
  firstname: string;
  firstname_ascii: string;
  gender: string;
  firstname_country_rank: string;
  firstname_country_frequency: string;
  lastname: string;
  lastname_ascii: string;
  lastname_country_rank: string;
  lastname_country_frequency: string;
  email: string;
  password: string;
  country_code: string;
  country_code_alpha: string;
  country_name: string;
  primary_language_code: string;
  primary_language: string;
  balance: number;
  phone_Number: string;
  currency: string;
  constructor(
    id: string,
    salutation: string,
    initials: string,
    firstname: string,
    firstname_ascii: string,
    gender: string,
    firstname_country_rank: string,
    firstname_country_frequency: string,
    lastname: string,
    lastname_ascii: string,
    lastname_country_rank: string,
    lastname_country_frequency: string,
    email: string,
    password: string,
    country_code: string,
    country_code_alpha: string,
    country_name: string,
    primary_language_code: string,
    primary_language: string,
    balance: number,
    phone_Number: string,
    currency: string
  ) {
    this.id = id;
    this.salutation = salutation;
    this.initials = initials;
    this.firstname = firstname;
    this.firstname_ascii = firstname_ascii;
    this.gender = gender;
    this.firstname_country_rank = firstname_country_rank;
    this.firstname_country_frequency = firstname_country_frequency;
    this.lastname = lastname;
    this.lastname_ascii = lastname_ascii;
    this.lastname_country_frequency = lastname_country_frequency;
    this.lastname_country_rank = lastname_country_rank;
    this.email = email;
    this.password = password;
    this.country_code = country_code;
    this.country_code_alpha = country_code_alpha;
    this.country_name = country_name;
    this.primary_language = primary_language;
    this.primary_language_code = primary_language_code;
    this.balance = balance;
    this.phone_Number = phone_Number;
    this.currency = currency;
  }
}
