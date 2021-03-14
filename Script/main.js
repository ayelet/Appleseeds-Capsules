const baseEndpoint_Users = "https://appleseed-wa.herokuapp.com/api/users/";
//baseeEndpoint_UserData usage: url+{userID}
const baseEndpoint_UserData = "https://appleseed-wa.herokuapp.com/api/users/";
/////////////////////////////////////
// global functions
function handleError(err) {
  console.log(err);
}


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
  remove(id) {
    if (!this.students.removeStudent(id)) throw "Remove Student failed";
    this.updateDisplay();
    return true;
  }
  update(student) {} //TODO-implement
  updateDisplay() {
    let table = document.getElementById("resp-table-body");
    table.innerHTML = "";
    for (let i = 0; i < this.students.getLength(); i++) {
      //[{"id":0,"firstName":"Adan","lastName":"Hajyahya","capsule":3}
      //{"id":1,"age":27,"city":"Holon","gender":"Male","hobby":"Economics"}
      let tableRow = document.createElement("div");
      let studentList = this.students.getStudents();
      tableRow.classList.add("resp-table-row");
      let id = studentList[i].getId();
      tableRow.setAttribute("id", `${studentList[i].getId()}`);
      table.appendChild(tableRow);
      let cellId = document.createElement("div");
      cellId.innerHTML = studentList[i].getId();
      cellId.classList.add(`table-body-cell`);
      let cellFirstName = document.createElement("div");
      cellFirstName.classList.add(`table-body-cell`);
      cellFirstName.innerHTML = studentList[i].getFirstName().toLowerCase();
      let cellLastName = document.createElement("div");
      cellLastName.classList.add(`table-body-cell`);
      cellLastName.innerHTML = studentList[i].getLastName().toLowerCase();
      let cellCapsule = document.createElement("div");
      cellCapsule.classList.add(`table-body-cell`);
      cellCapsule.innerHTML = studentList[i].getCapsule();
      let cellAge = document.createElement("div");
      cellAge.classList.add(`table-body-cell`);
      cellAge.innerHTML = studentList[i].getAge();
      let cellCity = document.createElement("div");
      cellCity.classList.add(`table-body-cell`);
      cellCity.innerHTML = studentList[i].getCity().toLowerCase();
      let cellGender = document.createElement("div");
      cellGender.classList.add(`table-body-cell`);
      cellGender.classList.add("fas");
      let gender = studentList[i].getGender();
      if (gender === "f") {
        cellGender.classList.add("fa-female");
        cellGender.style.color = `#F04558`;
        cellGender.style.color = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--femaleIconColor");
      } else if (gender === "m") {
        cellGender.classList.add("fa-male");
        cellGender.style.color = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--maleIconColor");
      } else {
        cellGender.classList.add("fa-venus-mars");
        cellGender.style.color = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--otherIconColor");
      }
      // cellGender.innerHTML = (studentList[i].getGender());
      let cellHobby = document.createElement("div");
      cellHobby.classList.add(`table-body-cell`);
      cellHobby.innerHTML = studentList[i].getHobby().toLowerCase();
      // append all of the fields to the table-row
      tableRow.appendChild(cellId);
      tableRow.appendChild(cellFirstName);
      tableRow.appendChild(cellLastName);
      tableRow.appendChild(cellCapsule);
      tableRow.appendChild(cellAge);
      tableRow.appendChild(cellCity);
      tableRow.appendChild(cellGender);
      tableRow.appendChild(cellHobby);
      let editContainer = document.createElement("div");
      editContainer.classList.add(`table-body-cell`);
      let editBtn = document.createElement("input");
      editBtn.setAttribute("type", "button");
      editBtn.setAttribute("aria-label", "Edit user");
      editBtn.value = "Edit";
      editBtn.classList.add("btn");
      editBtn.classList.add("edit-btn");
      editBtn.style.display = "inline";
      editBtn.addEventListener("click", this.onButtonEdit);
      editContainer.appendChild(editBtn);

      let deleteContainer = document.createElement("div");
      deleteContainer.classList.add(`table-body-cell`);

      let deleteBtn = document.createElement("input");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.setAttribute("type", "button");
      deleteBtn.value = "Delete";
      deleteBtn.addEventListener("click", this.onButtonDelete);
      deleteBtn.setAttribute("aria-label", "Delete user");
      deleteBtn.classList.add("btn");
      deleteBtn.style.display = "inline";
      deleteContainer.appendChild(deleteBtn);
      tableRow.appendChild(editContainer);
      tableRow.appendChild(deleteContainer);
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
      for (let i = 0; i < data.length; i++) {
        let response1 = await fetchUrl(baseEndpoint_UserData + data[i].id);
        let studentStats = await response1.json();
        //   console.log(studentStats);
        let student = new Student(
          data[i].id,
          data[i].firstName,
          data[i].lastName,
          data[i].capsule,
          studentStats.age,
          studentStats.city,
          studentStats.gender,
          studentStats.hobby
        );
        this.students.addStudent(student);
        //   console.log("new student created:", student);
      }
      this.updateDisplay();
      console.log("Number students: ", this.students.getLength());
    } catch (err) {
      console.log(`Error in fetching users data:`, err);
      return;
    }
  }
  onButtonDelete = (e) => {
    try {
      let id = parseInt(e.target.parentElement.parentElement.id);
      console.log("id of parent is ", id, e.target.checked);
      this.remove(id); //TODO-implement?

      //TODO-change button name to "delete/confirm"
    } catch (err) {
      console.log("onButtonDelete: ", err);
    }
  };

  onButtonEdit = (e) => {
    try {
      let id = parseInt(e.target.parentElement.parentElement.id);
      console.log("id of parent is ", id, e.target.checked);
      // GUI issues
      e.target.removeEventListener("click", this.onButtonEdit);
      e.target.addEventListener("click", this.onButtonConfirm);
      e.target.value = "Confirm";
      let siblingBtn = e.target.parentElement.nextSibling.firstChild;
      console.log(siblingBtn);
      siblingBtn.value = "Cancel";
      siblingBtn.removeEventListener("click", this.onButtonDelete);
      siblingBtn.addEventListener("click", this.onButtonCancel);
      // Logics issues
      let parent = e.target.parentElement.parentElement;
      for (let i=1; i < parent.children.length-2; i++){
          if (i !== 6)
            parent.children[i].setAttribute("contenteditable", "true");
      }
    } catch (err) {
      console.log("onButtonEdit: ", err);
    }
  };

  onButtonConfirm = (e) => {
    try {
      //GUI
      let id = parseInt(e.target.parentElement.parentElement.id);
      console.log("id of parent is ", id, e.target.checked);
      e.target.removeEventListener("click", this.onButtonConfirm);
      e.target.addEventListener("click", this.onButtonEdit);
      e.target.value = "Edit";
      let siblingBtn = e.target.parentElement.nextSibling.firstChild;
      console.log(siblingBtn);
      siblingBtn.value = "Delete";
      siblingBtn.removeEventListener("click", this.onButtonCancel);
      siblingBtn.addEventListener("click", this.onButtonDelete);
      //Logistics
      this.update(id);
    } catch {
      console.log("onButtonConfirm: ", err);
    }
  };

  onButtonCancel = (e) => {
    try {
      //GUI
      let id = parseInt(e.target.parentElement.parentElement.id);
      console.log("id of parent is ", id, e.target.checked);
      e.target.removeEventListener("click", this.onButtonCancel);
      e.target.addEventListener("click", this.onButtonDelete);
      e.target.value = "Delete";
      let siblingBtn = e.target.parentElement.previousSibling.firstChild;
      console.log(siblingBtn);
      siblingBtn.value = "Edit";
      siblingBtn.addEventListener("click", this.onButtonEdit);
      siblingBtn.removeEventListener("click", this.onButtonConfirm);
      //Logistics
   // Logics issues
   let parent = e.target.parentElement.parentElement;
   for (let i=1; i < parent.children.length-2; i++){
       if (i !== 6)
         parent.children[i].setAttribute("contenteditable", "false");
   }
   this.updateDisplay();
    } catch (err) {
      console.log("onButtonCancel: ", err);
    }
  };
}

function main() {
  // let storage = window.localStorage;
  studentsDisplay = new StudentsDisplay();

//   let sortTypeBtn = document.querySelector(".sort-type");
//   sortTypeBtn.addEventListener("click", () => {
//     // toggle sort up/down
//     StudentsDisplay.sortType = !StudentsDisplay.sortType;
//     if (studentsDisplay.sortType === "up") {
//       studentDisplay.sortType = "down";
//       sortTypeBtn.innerHTML = "0xf160";
//     } else {
//       studentDisplay.sortType = "up";
//       sortTypeBtn.innerHTML = "0xf161";
//     }
//     studentsDisplay.updateDisplay();
//   });
  studentsDisplay.updateDisplay();
}

let studentsDisplay = null;
window.onload = (event) => {
  main();
};
