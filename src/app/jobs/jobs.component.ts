import { Component, OnInit } from '@angular/core';
import { Job } from '../job';
import { AvailableJobsService } from '../available-jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  Jobs: any[];
  shifts: string[];
  constructor(private availableJobs: AvailableJobsService) { }

  ngOnInit() {
    this.Jobs = this.availableJobs.JOBS;
    this.getShifts();
  }

  /** Get shifts to be displayed */
  getShifts() {
    this.shifts = this.getUniqueDays(this.Jobs[0].shifts);
  }

  /** Per hour wages conversion from Cents to Dollars */
  centsToDollars(value) {
    return parseInt(value, 10) / 100;
  }

  /** Get date string out of time zoned date */
  getDate(value) {
    let date = new Date(value.toString());
    return date;
  }

  /** Get time */
  getTime(value) {
    let date = this.getDate(value);
    return date.getTime();
  }

  /** Get number of shifts per week*/
  getUniqueDays(shifts) {
    var newArray = shifts.map(shift => (this.getDate(shift.startDate)).toString());
    var secondarray = []
    var filtered = newArray.filter(i => {

      var split = i.split(' ', 10);
      if (secondarray.indexOf(split[0]) == -1) {
        secondarray.push(split[0]);
        return true;
      }
      return false;
    });
    return filtered;
  }
}
