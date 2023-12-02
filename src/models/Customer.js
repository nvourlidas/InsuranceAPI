class Customer {
    constructor({id,name,surname,email,cellphone,phone,gender,postcode,property,birthday}) {
      this.id = id
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.cellphone = cellphone;
      this.phone = phone;
      this.gender = gender;
      this.postcode = postcode;
      this.property = property;
      this.birthday = birthday;
    }
    // You can also add methods to the User class if needed
    getFullName() {
      return `${this.name} ${this.surname}`;
    }

  }
  
  module.exports = Customer;
  