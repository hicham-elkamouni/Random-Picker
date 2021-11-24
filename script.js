"use strict";

const name1 = document.getElementById("name");
const subject = document.getElementById("subject");
const add = document.getElementById("add");

const studentsContainer = document.getElementById("studentsContainer");
const SelectedStudentsContainer = document.getElementById("SelectedStudentsContainer");

const generate = document.getElementById("generate");
const selectedDate = document.getElementById("selectedDate");

let StdNamesSubjects = [];
let SelectedStudents = [];
let randomName;
let indexOfRandomName;

// GETTING RANDOM INDEX FROM ANN ARRAY
function getRandomName(arr) {
  return (indexOfRandomName = Math.floor(Math.random() * arr.length));
}

//PICKING THE INSERTED STUDENTS AND SHOW THEM IN UI
function fillingStudentNamesContainer() {
  StdNamesSubjects.forEach((std) => {
    const stdSpan = document.createElement("span");
    stdSpan.classList.add("btn1");
    stdSpan.innerText = std.name;
    studentsContainer.appendChild(stdSpan);
  });
}

//PICKING THE SELECTED STUDENTS AND SHOW THEM IN UI
function fillingSelectedStudentsContainer() {
  SelectedStudents.forEach((SelectedStd) => {
    const selectedStdSpan = document.createElement("span");
    selectedStdSpan.classList.add("btn1");
    selectedStdSpan.innerText =
      SelectedStd.name +
      " and his subject is " +
      SelectedStd.subject +
      " " +
      SelectedStd.date;
    SelectedStudentsContainer.appendChild(selectedStdSpan);
    console.warn(SelectedStd);
  });
}

// GETTING INPUT STUDENT'S NAME AND SUBJECT AND CHECK IF HIS NAME ALREADY EXIST
let exist;
add.addEventListener("click", () => {
  exist = false;
  if (StdNamesSubjects.length < 1) {
    let obj = {
      name: name1.value,
      subject: subject.value,
      date: "",
    };
    StdNamesSubjects.push(obj);
  } else {
    StdNamesSubjects.forEach((element) => {
      if (element.name == name1.value) {
        exist = true;
      }
    });
    if (exist == false) {
      let obj = {
        name: name1.value,
        subject: subject.value,
        date: "",
      };
      StdNamesSubjects.push(obj);
    }
  }
  studentsContainer.innerHTML = "";

  StdNamesSubjects.forEach((std) => {
    const stdSpan = document.createElement("span");
    stdSpan.classList.add("btn1");
    stdSpan.innerText = std.name;
    studentsContainer.appendChild(stdSpan);
  });
});

// choosing student randomly
let D = "";
let nextDay = 0;

generate.addEventListener("click", function pickStudent() {
  getRandomName(StdNamesSubjects);

  
  let D2 = new Date(selectedDate.value);
  D2.setDate(D2.getDate() + nextDay);

  let dd = String(D2.getDate()).padStart(2, "0");
  let mm = String(D2.getMonth() + 1).padStart(2, "0");
  let yyyy = D2.getFullYear();

  let FormattedDate = dd + "/" + mm + "/" + yyyy;
  let DayName = D2.toString().split(" ")[0];

  // CHECKING IF IT'S WEEKEND  
  if (DayName == "Sat") {
    nextDay += 2;
    pickStudent();
  } else if (DayName == "Sun") {
    nextDay += 1;
    pickStudent();
  } else {

    StdNamesSubjects[indexOfRandomName].date = `${FormattedDate}`;

    SelectedStudents.push(StdNamesSubjects[indexOfRandomName]);

    StdNamesSubjects.splice(indexOfRandomName, 1);

    studentsContainer.innerHTML = "";

    fillingStudentNamesContainer();

    SelectedStudentsContainer.innerHTML = "";

    fillingSelectedStudentsContainer();

    nextDay += 1;
  }
});

// EXPORTING DATA AS CSV FILE
const downloadCSV = () => {
  var csv = "Name,Subject,date\n";
  newArr = [];
  SelectedStudents.map((e) => newArr.push(Object.values(e)));
  newArr.forEach(function (row) {
    csv += row.join(",");
    csv += "\n";
  });

  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
  hiddenElement.target = "_blank";

  //provide the name for the CSV file to be downloaded
  hiddenElement.download = "Subjects By Order.csv";
  hiddenElement.click();
};
