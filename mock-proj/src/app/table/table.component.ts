import { Component, Input } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  activity = [];
  
  //Days in week and calendar period
  datesInWeek = 7;
  datesInCalendar = 14
  refreshTime = new Date().getDate() - 12;

  // Arrays for the week, calendar, and dates (month/day)
  weekly = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  calendar = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  dates = [];

  //Variable to decide whether weekly/calendar is viewed
  currentView = this.weekly;

  constructor() {
    this.createDates(this.datesInWeek);
    this.fillObject();
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
  createDates(amount: any) {
    this.dates = [];
    
    if (this.refreshTime < 0) {
      this.refreshTime = new Date().getDate();
    }

    for (let index = 0; index < amount; index++) {
      let day = new Date().getDate() + index - this.refreshTime;
      let month = new Date().getMonth();
      this.dates.push(month + "/" + day);
    }
  }

  fillObject() {
    for (let index = 0; index < this.currentView.length; index++) {
      var key = index;
      console.log(key);
      const obj  = {
        [key] : {
          day: this.currentView[index],
          hours: '',
          date: this.dates[index],
        }
      };
      this.activity.push(obj);
    }
  }


  addRow(position: any) {
    const obj = {
      id: '',
      hours: '',
      email: '',
    };
    this.activity.splice(position, 0, obj)
    // this.activity.push(obj);
  }

  deleteRow(row: any) {
    const deleteButton = confirm(' Do you want to delete ?');
    if (deleteButton == true) {
      this.activity.splice(row, 1);
    }
  }

  
}
