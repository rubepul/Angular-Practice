import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  //Days in week and calendar period
  datesInWeek = 7;
  datesInCalendar = 14

  // Arrays for the week, calendar, and dates (month/day)
  weekly = ['Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  calendar = ['Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 
  'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  dates = [];

  //Variable to decide whether weekly/calendar is viewed
  currentView = this.weekly;

  constructor() {
    this.createDates(this.datesInWeek);
  }

  // This function changes the view based on the (click) event
  changeSchedule() {
    if (this.currentView === this.weekly) {
      this.createDates(this.datesInCalendar);
      this.currentView = this.calendar;
    } else {
      this.currentView = this.weekly;
      this.createDates(this.datesInWeek);
    }
  }

  // Helper function that creates dates (month/day) format
  createDates(amount) {
    this.dates = [];
    for (let index = 0; index < amount; index++) {
      let day = new Date().getDate() + index;
      let month = new Date().getMonth();
      this.dates.push(month + "/" + day);
    }
  }
}
