let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

document.addEventListener('keyup', function(e) {
  if (e.which == 37) {
    document.getElementById("previous").click();
  } else if (e.which == 38) {
    jumpYear(-1);
  } else if (e.which == 39) {
    document.getElementById("next").click();
  } else if (e.which == 40) {
    jumpYear(1);
  } else if (e.which == 84) { //keyboard shortcut T
    document.getElementById("jumpToday").click();
  }
});

function jumpToday() {

    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    selectYear.value = currentYear;
    selectMonth.value = currentMonth;
    showCalendar(currentMonth, currentYear);
}

function jumpYear(jumpSteps) {
  let tmpCurrentYear = parseInt(selectYear.value) + jumpSteps;
  if(tmpCurrentYear === 2031 || tmpCurrentYear === 1989) {
    return;
  }
  currentYear = tmpCurrentYear;
  selectYear.value = currentYear;
  showCalendar(currentMonth, currentYear);
}


function next() {
    let tmpCurrentYear = parseInt(selectYear.value) + 1;
    if(tmpCurrentYear === 2031 && currentMonth === 11) {
      return;
    }
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    let tmpCurrentYear = parseInt(selectYear.value) - 1;
    if(tmpCurrentYear === 1989 && currentMonth === 0) {
      return;
    }
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}
