const baseEndpoint_Users = "https://appleseed-wa.herokuapp.com/api/users/";
//baseeEndpoint_UserData usage: url+{userID}
const baseEndpoint_UserData = "https://appleseed-wa.herokuapp.com/api/users/";
/////////////////////////////////////
// global functions
function handleError(err) {
  console.log(err);
}

let capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)
}

// import chart from './covidChart';
async function fetchUrl(url) {
  return await fetch(url)
    .then((response) => (response.ok ? response : Error(response.status)))
    .catch((err) => {
      console.error("fetch failed", err);
    });
}

class StudentsDisplay {
  constructor() {
    this.students = new StudentList();
    // this.displayStyle = TaskListDisplay.Style.list;
    let i = 0;

    if (!this.getFromLocalStorage()) this.loadDataFromApi();
  }

  add(student) {} //TODO-implement
  remove(student) {} //TODO-implement
  update(student) {} //TODO-implement
  updateDisplay() {
      let table = document.getElementById('resp-table-body');
    for (let i = 0; i < this.students.getLength(); i++) {

        //[{"id":0,"firstName":"Adan","lastName":"Hajyahya","capsule":3}
//{"id":1,"age":27,"city":"Holon","gender":"Male","hobby":"Economics"}
        let tableRow = document.createElement('div');
        let studentList = this.students.getStudents();
        tableRow.classList.add('resp-table-row');
        let id = studentList[i].getId();
        tableRow.setAttribute('id', `${studentList[i].getId()}`);
        table.appendChild(tableRow);
        let cellFirstName = document.createElement('div')
        cellFirstName.classList.add(`table-body-cell`);
        cellFirstName.innerHTML = capitalize((studentList[i].getFirstName()));
        let cellLastName = document.createElement('div')
        cellLastName.classList.add(`table-body-cell`);
        cellLastName.innerHTML = capitalize((studentList[i].getLastName()));
        let cellCapsule = document.createElement('div')
        cellCapsule.classList.add(`table-body-cell`);
        cellCapsule.innerHTML = (studentList[i].getCapsule());
        let cellAge = document.createElement('div')
        cellAge.classList.add(`table-body-cell`);
        cellAge.innerHTML = (studentList[i].getAge());
        let cellCity = document.createElement('div')
        cellCity.classList.add(`table-body-cell`);
        cellCity.innerHTML = capitalize((studentList[i].getCity()));
        let cellGender = document.createElement('div')
        cellGender.classList.add(`table-body-cell`);
        cellGender.classList.add('fas');
        let gender = studentList[i].getGender();
        if (gender === "f")
            {
                cellGender.classList.add('fa-female')
                cellGender.style.color = `#F04558`;
                cellGender.style.color = getComputedStyle(document.documentElement)
                .getPropertyValue('--femaleIconColor');
            }
            else if (gender === 'm') {
                cellGender.classList.add('fa-male');
                cellGender.style.color = getComputedStyle(document.documentElement)
                .getPropertyValue('--maleIconColor');
            }
            else {
                cellGender.classList.add('fa-venus-mars')
                cellGender.style.color = getComputedStyle(document.documentElement)
                .getPropertyValue('--otherIconColor');;
            }
        // cellGender.innerHTML = (studentList[i].getGender());
        let cellHobby = document.createElement('div')
        cellHobby.classList.add(`table-body-cell`);
        cellHobby.innerHTML = capitalize((studentList[i].getHobby()));
        // append all of the fields to the table-row
        tableRow.appendChild(cellFirstName);
        tableRow.appendChild(cellLastName);
        tableRow.appendChild(cellCapsule);
        tableRow.appendChild(cellAge);
        tableRow.appendChild(cellCity);
        tableRow.appendChild(cellGender);
        tableRow.appendChild(cellHobby);
    }
  } 

  getFromLocalStorage() {
    // const counter = localStorage.getItem("TaskCounter");
    // TaskList.counter = Number(counter);
    const storage = localStorage.getItem("BootcampStudent");
    if (storage) {
      let data = JSON.parse(storage);
      console.log(data);
      let i = 0;
      while (i < data.length) {
        let student = student.fromJson(data[i]);
        console.log(student instanceof Student);
        // task.print();
        this.students.add(student);
        i++;
      }
      this.updateDisplay();
      return true;
    } else {
      return false;
    }
  } // fetch tasks to local storage

  //   fetch users from api
  async loadDataFromApi() {
    try {
      let response = await fetchUrl(baseEndpoint_Users);
      // let users = await data.JSON();
    //   console.log(response);
      if (!response.ok) throw new Error(response.status);
      let data = await response.json();
    //   console.log(data);
      for (let i=0; i < data.length; i++) {

          let response1 = await fetchUrl(baseEndpoint_UserData+data[i].id);
          let studentStats = await response1.json();
        //   console.log(studentStats);
          let student = new Student(data[i].id, data[i].firstName, data[i].lastName, data[i].capsule, studentStats.age, studentStats.city, studentStats.gender, studentStats.hobby );
          this.students.addStudent(student);
        //   console.log("new student created:", student);
      }
      this.updateDisplay();
      console.log("Number students: ", this.students.getLength() );
    } catch (err) {
      console.log(`Error in fetching users data:`, err);
      return;
    }
  }
}

function main() {
  // let storage = window.localStorage;
  studentsDisplay = new StudentsDisplay();
  studentsDisplay.updateDisplay();
}

let studentsDisplay = null;
window.onload = (event) => {
  main();
};
