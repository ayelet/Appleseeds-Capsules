// class Student - basic unit to be entered to the database
// data is read from the api:
//[{"id":0,"firstName":"Adan","lastName":"Hajyahya","capsule":3}
//{"id":1,"age":27,"city":"Holon","gender":"Male","hobby":"Economics"}

// class Student is the basic data unit for students
class Student {
  constructor(id, firstName, lastName, capsule, age, city, gender, hobby) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.capsule = capsule;
    this.age = age;
    this.city = city;
    this.gender = gender;
    this.hobby = hobby;
  }

  getId() {
    return this.id;
  }
  getFirstName() {
    return this.firstName;
  }
  getLastName() {
    return this.lastName;
  }
  getCapsule() {
    return this.capsule;
  }
  getAge() {
    return this.age;
  }
  getCity() {
    return this.city;
  }
  getGender() {
    return this.gender;
  }
  getHobby() {
    return this.hobby;
  }

  setFirstName(name) {
    if (Student.validateText(name)) return (this.firstName = name);
    throw "SetFirstName: invalid input";
  }
  setLastName(name) {
    if (Student.validateText(name)) return (this.lastName = name);
    throw "SetLastName: invalid input";
  }
  setCapsule(num) {
    if (Student.validateNum(num)) return (this.capsule = num);
    throw "SetCapsule: invalid input";
  }
  setAge(num) {
    if (Student.validateNum(age)) return (this.age = age);
    throw "SetAge: invalid input";
  }
  setCity(city) {
    if (Student.validateCity(city)) return (this.city = city);
    throw "SetCity: invalid input";
  }
  setGender(gender) {
    if (Student.validateGender(gender)) return (this.gender = gender);
    throw "SetGender: invalid input";
  }
  setHobby(hobby) {
    if (Student.validateText(hobby)) return (this.hobby = hobby);
    throw "SetHobby: invalid input";
  }

  static validateText(text) {
    return true;
  } //TODO-implement
  static validateNum(num) {
    num = parseInt(num);
    if (isNaN(num))
      return false;
    return true;
  } 
  static validateGender(gender) {
    if (!personalbar.gender.includes(gender))
      return false;
    return true;
  } 
  static field = { id: 0, firstName: 1, lastName: 2, capsule: 3, gender: 4, age: 5, city: 6, hobby: 7}
  static gender = ["f", "m", "o" ];
}
  Student.toJson = function () {
  return JSON.stringify({
    id: this.id,
    firstName: this.firstName,
    lastName: this.lastName,
    capsule: this.capsule,
    gender: this.gender,
    age: this.age,
    city: this.city,
    hobby: this.hobby
  });
};
Student.fromJson = function (json) {
  var data = json; // No need to parse, it is already a string

  return new Student(
    parseInt(data.id),
    data.firstName,
    data.lastName,
    parseInt(data.capsule),
    parseInt(data.age),
    data.city,
    data.gender,
    data.hobby
  );
};
