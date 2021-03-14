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
      this.addToLocalStorage();
      return;
    }
    throw "StudentList: Add Error: invalid input";
  }
  removeStudent(id) {
    let student = this.findStudent(id);
    if (!student) return false;
    let index = this.list.indexOf(student);
    this.list.splice(index, 1);
    this.addToLocalStorage();
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
  getStudents() {
    return this.list;
  }

  // Update the data of a student, id is never updated
  updateStudent(id, student) {
    let thisStudent = this.findStudent(id);
    if (!thisStudent) return false;
    // Student ID  change not allowed
    thisStudent.setFirstName(student.getFirstName());
    thisStudent.setLastName(student.getLastName());
    thisStudent.setCapsule(student.getCapsule());
    thisStudent.setAge(student.getAge());
    thisStudent.setCity(student.getCity());
    thisStudent.setGender(student.getGender());
    thisStudent.setHobby(student.getHobby());
    this.addToLocalStorage();
  }
  sort(field, direction = 0) {
    console.log("sorting by", field);
    switch (field) {
      case StudentList.sortField.ID:
        this.list.sort((a, b) => a.getId() - b.getId());
        break;

      case StudentList.sortField.firstName:
        this.list.sort((a, b) => this.sortByField(a.getFirstName(), b.getFirstName()));
        break;

      case StudentList.sortField.lastName:
        this.list.sort((a, b) => this.sortByField(a.getLastName(), b.getLastName()));
        break;

      case StudentList.sortField.Capsule:
        this.list.sort((a, b) => a.getCapsule() - b.getCapsule());
        break;

      case StudentList.sortField.Age:
        this.list.sort((a, b) => a.getAge() - b.getAge());
        break;

      case StudentList.sortField.City:
        this.list.sort((a, b) => this.sortByField(a.getCity(), b.getCity()));
        break;
      case StudentList.sortField.Gender:
        this.list.sort((a, b) => this.sortByField(a.getGender(), b.getGender()));
        break;
      case StudentList.sortField.Hobby:
        this.list.sort((a,b) => this.sortByField(a.getHobby(), b.getHobby()));
        break;
    }
  }

  sortByField(a,b) {
    const x = a.toLowerCase().trim();
    const y = b.toLowerCase().trim();
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
  }

  search(str) {
    return [];
  } //TODO-implement

  async addToLocalStorage() {
    let data = JSON.stringify(this.list);
    localStorage.setItem("students", data);
  } // write tasks to local storage
  getFromLocalStorage() {
  
    const storage = localStorage.getItem("students");
    if (storage) {
      let data = JSON.parse(storage);
      console.log(data);
      let i = 0;
      while (i < data.length) {
        let student = Student.fromJson(data[i]);
        console.log(student instanceof Student);
        // student.print();
        this.addStudent(student);
        i++;
      }
    }
    // this.updateDisplay();
  }
  //checks that the data that is updated is valid. 
  // returns true if valid, else returns false
  validateStudent() {
    return true;
  } //TODO- implement
  
  getLength() {
    return this.list.length;
  }

  static sortField = {
    ID: 0,
    firstName: 1,
    lastName: 2,
    Capsule: 3,
    Age: 4,
    City: 5,
    Gender: 6,
    Hobby: 7,
  };
}
