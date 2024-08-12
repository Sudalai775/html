let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

// Month names for display
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Sample schedule data for each day
const schedule = [
  { date: "15-7-2024", subjects: ["DS/JS", "I Lang Eng", "ACC", "DS/JS Slab", "DTP/JS/GD"] },
  { date: "16-8-2024", subjects: ["II Lang Acc", "DS/JS/NV", "ENG DLab", "SLAB"] },
  { date: "17-7-2024", subjects: ["ACC ENG LANG", "DS/JS/RS", "DS/JS Slab", "DTS/JS/RS"] },
  { date: "18-7-2024", subjects: ["WEB/BJ/NV", "ACC ENG SLAB", "LANG DLab"] },
  { date: "19-7-2024", subjects: ["DS/JS", "BJ", "LANG EVS", "ENG SLAB"] },
  { date: "20-7-2024", subjects: ["ENG DS/JS", "GD", "LANG ACC SLAB"] }
];

// Holidays data
const holidays = [
  { date: "2024-01-26", name: "Republic Day" },
  { date: "2024-08-15", name: "Independence Day" },
  // Add more holidays as needed
];

// Function to generate calendar for given month and year
function generateCalendar(month, year) {
  let calendarDays = document.getElementById("calendar-days");
  calendarDays.innerHTML = '';

  // Get the first day of the month
  let firstDay = new Date(year, month, 1).getDay();
  // Get the last day of the month
  let lastDay = new Date(year, month + 1, 0).getDate();

  // Set the month-year header
  document.getElementById("month-year").innerHTML = monthNames[month] + " " + year;

  // Generate the days
  for (let i = 0; i < firstDay; i++) {
    let emptyDay = document.createElement("div");
    calendarDays.appendChild(emptyDay);
  }
  
  for (let day = 1; day <= lastDay; day++) {
    let calendarDay = document.createElement("div");
    calendarDay.textContent = day;
    calendarDay.classList.add("day");

    // Check if the day is a Sunday
    if (new Date(year, month, day).getDay() === 0) {
      calendarDay.classList.add("sunday");
    }

    // Check if the day has a schedule
    let daySchedule = schedule.find(s => {
      let [d, m, y] = s.date.split('-').map(Number);
      return d === day && m - 1 === month && y === year;
    });
    
    if (daySchedule) {
      calendarDay.classList.add("has-schedule");
    }

    // Add click event to show timetable
    calendarDay.addEventListener("click", function() {
      displayTimetable(day, month, year);
    });

    calendarDays.appendChild(calendarDay);
  }
}

// Initial calendar generation
generateCalendar(currentMonth, currentYear);

// Function to navigate to the previous month
function prevMonth() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  generateCalendar(currentMonth, currentYear);
}

// Function to navigate to the next month
function nextMonth() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  generateCalendar(currentMonth, currentYear);
}

// Function to display the timetable for a specific day
function displayTimetable(day, month, year) {
  let selectedDate = `${day}-${month + 1}-${year}`;
  let daySchedule = schedule.find(s => s.date === selectedDate);
  let timetableDisplay = document.getElementById("timetable-display");

  if (daySchedule) {
    let timetableHTML = "<u><h1>Timetable for " + selectedDate + "</h1><li ></u>";
    daySchedule.subjects.forEach(subject => {
      timetableHTML += "<i><h4><table>" + subject + "</table></h4></i>";
    });
    timetableHTML += "</li>";
    timetableDisplay.innerHTML = timetableHTML;
    timetableDisplay.style.display = "block"; // Show the timetable display
  } else {
    timetableDisplay.innerHTML = "<h2>No timetable available for " + selectedDate + "</h2>";
    timetableDisplay.style.display = "block"; // Show the timetable display
  }
}
