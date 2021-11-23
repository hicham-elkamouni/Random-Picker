const numberOfStudents = document.getElementById("numberOfStudents");

const name = document.getElementById("name");
const subject = document.getElementById("subject");
const add = document.getElementById("add");

const studentsContainer = document.getElementById("studentsContainer");
const SelectedStudentsContainer = document.getElementById(
  "SelectedStudentsContainer"
);

const generate = document.getElementById("generate");
const test = document.getElementById("test");

const selectedDate = document.getElementById("selectedDate");

let StdNamesSubjects = [];
let SelectedStudents = [];

let randomName;
let indexOfRandomName;

function getRandomName(arr) {
  return (indexOfRandomName = Math.floor(Math.random() * arr.length));
}

function fillingStudentNamesContainer() {
  StdNamesSubjects.forEach((std) => {
    const stdSpan = document.createElement("span");
    stdSpan.classList.add("btn1");
    stdSpan.innerText = std.name;
    studentsContainer.appendChild(stdSpan);
  });
}

//filling selected students
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

add.addEventListener("click", () => {
  let obj = {
    name: name.value,
    subject: subject.value,
    date: "",
  };

  StdNamesSubjects.push(obj);

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

  // getting date

  let D2 = new Date(selectedDate.value);
  D2.setDate(D2.getDate() + nextDay);

  let dd = String(D2.getDate()).padStart(2, "0");
  let mm = String(D2.getMonth() + 1).padStart(2, "0");
  let yyyy = D2.getFullYear();

  let dateM9ada = dd + "/" + mm + "/" + yyyy;
  let DayName = D2.toString().split(" ")[0];

  if (DayName == "Sat") {
    nextDay += 2;
    // generate.click()
    pickStudent();
  } else if (DayName == "Sun") {
    nextDay += 1;
    // generate.click()
    pickStudent();
  } else {
    
    StdNamesSubjects[indexOfRandomName].date = `${dateM9ada}`;

    SelectedStudents.push(StdNamesSubjects[indexOfRandomName]);

    StdNamesSubjects.splice(indexOfRandomName, 1);

    studentsContainer.innerHTML = "";
    
    fillingStudentNamesContainer();

    SelectedStudentsContainer.innerHTML = "";
    
    fillingSelectedStudentsContainer();
    
    nextDay += 1;
  }
});

//download CSV
const downloadCSV = () => {
  let csvContent =
    "data:text/csv;charset=utf-8," +
    SelectedStudents.map((e) => [...Array.from(e)].join(",")).join("\n");
  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
};

// test.addEventListener('click', () => {
  
  //     console.warn('wow');

  //     for (let i=0 ;i< SelectedStudents.length ; i++) {
    //         date.setDate(date.getDate() + i);
    
    //         console.warn(date.getDate());
    //     }

    // })

    // function getDynamicDate(){

      //     let D2 = new Date(selectedDate);

      //     D = D2.setDate(D2.getDate() + 1);
      
      //     let DayName = D.toString().split(' ')[0];
      //     let DayNumber = D.getDate();
//     let Month = D.getMonth() + 1;
//     let Year = D.getFullYear();

//     console.warn(DayName + " " + DayNumber + " " + Month + " " + Year);
//     // let objDate = {
//     //     day : DayNumber,
//     //     month : Month,
//     //     year : Year
//     // }

//     return D;
// }

// if(D2.getDay() == 6 || D2.getDay() == 0) alert('Weekend!');