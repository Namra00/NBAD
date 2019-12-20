class User {
   constructor(userId, firstName, lastName, emailAddress, userName, password) {
     this._userId = userId;
     this._firstName = firstName;
     this._lastName = lastName;
     this._emailAddress = emailAddress;
     this._userName = userName;
     this._password = password;
   }
   get userID() {
     return this._userId;
   }
   set userID(value) {
     this._userId = value;
   }
   get firstName() {
     return this._firstName;
   }
   set firstName(value) {
     this._firstName = value;
   }
   get lastName() {
     return this._lastName;
   }
   set lastName(value) {
     this._lastName = value;
   }
   get emailAddress() {
     return this._emailAddress;
   }
   set emailAddress(value) {
     this._emailAddress = value;
   }
   get userName() {
     return this._userName;
   }
   set userName(value) {
     this._userName = value;
   }
   get password() {
     return this._password;
   }
   set password(value) {
     this._password = value;
   }
}

module.exports = User;
