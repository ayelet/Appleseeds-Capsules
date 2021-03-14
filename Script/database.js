// This is the "database" that implements the CRUD
// const  Student  = require("../Script/person.js");

class StudentList {
  constructor() {
    this.list = [];
    this.indexOfId = []; // a simple index to retrieve sorted data fast
    this.indexOfFirstNames = []; // a simple index to retrieve sorted data fast
    this.indexOfLastNames = []; // a simple index to retrieve sorted data fast
  }
  addStudent(student) {
    if (this.validateStudent(student)) {
      this.list.push(student);
      return;
    }
    throw "StudentList: Add Error: invalid input";
  }
  removeStudent(id) {
    let student = this.findStudent(id);
    if (!student) return false;
    let index= this.list.indexOf(student);
    this.list.splice(index, 1);
    return true;
  }
  // search for a student by id, 
  // returns the student if found, false if not found
  findStudent(id) {
    let student = this.list.find((student) => student.id === id);
    if (!student) return false;

    // let indexOfStudent = this.list.indexOf(student);
    return student;
  }

  
  // Return all students
  getStudents() { return this.list; }

  // Update the data of a student, id is never updated
  updateStudent(student) {
    let thisStudent = this.findStudent(student.getId());
    if (!thisStudent) return false;
    // Student ID  change not allowed
    thisStudent.setFirstName = student.getFirstName();
    thisStudent.setLastName = student.getLastName();
    thisStudent.setCapsule = student.getCapsule();
    thisStudent.setAge = student.getAge();
    thisStudent.setCity = student.getCity();
    thisStudent.setGender = student.getGender();
    thisStudent.setHobby = student.getHobby();
  } 
  sort(sortField, direction = ascending) {} //TODO-implement
  search(str) {
    return [];
  } //TODO-implement
  addToLocalStorage() {} //TODO-implement
  getFromLocalStorage() {} //TODO-implement
  validateStudent()  { return true; } //TODO- implement
  getLength()  { return this.list.length; }
}


