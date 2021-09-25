import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  @Input() lang: string = 'fa';

  showYears = false;
  month = 0;
  daysCount = 30;
  daysOfMonth: any = [];
  current = new Date();
  hours: any = [];
  years: any = [];
  showMonths = false;
  persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
  today = this.getToday();

  constructor() {}

  ngOnInit(): void {
    this.current = this.getFirstDayOfMonth(new Date());
    this.initData(this.current);
    for (let i = 0; i <= 23; i++) {
      this.hours.push(i);
    }
    for (let i = 1300; i <= 1450; i++) {
      this.years.push(i);
    }
  }

  setYear(year: number) {
    this.daysOfMonth = [];
    this.month = 0;
    if (this.getYear() > year) {
      this.current.setFullYear(
        this.current.getFullYear() - (this.getYear() - year)
      );

      this.initData(this.current);
      this.closeYearModal();
    }
    if (this.getYear() < year) {
      this.current.setFullYear(
        this.current.getFullYear() + (year - this.getYear())
      );

      this.initData(this.current);
      this.closeYearModal();
    }
  }

  setMonth(month:number){
    this.daysOfMonth = [];
    this.month = 0;
    if (this.getMonth() > month) {
      this.current.setMonth(
        this.current.getMonth() - (this.getMonth() - month)
      );
      this.initData(this.current);
      this.closeYearModal();
    }
    if (this.getMonth() < month) {
      this.current.setMonth(
        this.current.getMonth() + (month - this.getMonth())
      );

      this.initData(this.current);
      this.closeMonthModal();
    }
  }

  showYearModal() {
    this.showYears = true;
  }


  showMonthModal() {
    this.showMonths = true;
  }


  closeMonthModal(){

    let modal: any = document.getElementById('monthModal');
    modal.style.animation = 'fadeOutUp ease 0.5s';
    setTimeout(() => {
      this.showMonths = false;
    }, 400);

  }

  closeYearModal() {
    let modal: any = document.getElementById('yearModal');
    modal.style.animation = 'fadeOutUp ease 0.5s';
    setTimeout(() => {
      this.showYears = false;
    }, 400);
  }

  getFirstDayOfMonth(date: Date) {

    var today = Number(
      this.fixNumbers(date.toLocaleDateString('fa').split('/')[2])
    );
    var hasToReduce = today - 1;
    date.setDate(date.getDate() - hasToReduce);
    return date;
  }

  initData(date: Date) {
    if (this.lang == 'fa') {
      this.month = Number(
        this.fixNumbers(date.toLocaleDateString('fa').split('/')[1])
      );
      if (this.month <= 6) {
        this.daysCount = 31;
      } else if (this.month == 12) {
        if (this.isLeapYear(this.getYear())) {
          this.daysCount = 30;
        } else {
          this.daysCount = 29;
        }
      } else {
        this.daysCount = 30;
      }
      var dt = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      );

      for (let i = 0; i < this.daysCount; i++) {
        if (i != 0) {
          dt.setDate(dt.getDate() + 1);
        }
        this.daysOfMonth.push({
          dayNumber: i + 1,
          dayString: this.getPersianDate(dt),
          date: dt.toString(),
        });
      }
    }
  }

  goPrevious() {

    this.daysOfMonth = [];
    this.month = 0;
    this.current.setMonth(this.current.getMonth() - 1);
    this.current.setDate(this.current.getDate() - 5);
    var newDate = this.getFirstDayOfMonth(this.current);
    this.initData(newDate);
  }

  goNext() {
    this.daysOfMonth = [];
    this.month = 0;
    this.current.setMonth(this.current.getMonth() + 1);
    this.current.setDate(this.current.getDate() + 5);
    var newDate = this.getFirstDayOfMonth(this.current);
    this.initData(newDate);
  }

  isLeapYear(year: any) {
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
  }

  fixNumbers(str: any) {
    if (typeof str === 'string') {
      for (var i = 0; i < 10; i++) {
        str = str
          .replace(this.persianNumbers[i], i)
          .replace(this.arabicNumbers[i], i);
      }
    }
    return str;
  }

  selectDay(day: any, e: any) {
    var daysContainer: any = document.querySelector('.marko-days-container');

    let selectedDay = document.getElementsByClassName('marko-selected-day')[0];
    selectedDay.classList.remove('marko-selected-day');
    selectedDay.classList.add('marko-day');
    var indexOfSelected = this.getChildIndex(selectedDay);
    this.daysOfMonth[indexOfSelected].dayString = this.getShortNameOfDay(
      new Date(this.daysOfMonth[indexOfSelected].date)
    );

    var newSelectedDay = this.getDay(new Date(day.date));
    daysContainer.children[newSelectedDay - 1].classList.add(
      'marko-selected-day'
    );
    daysContainer.children[newSelectedDay - 1].classList.remove('marko-day');
    day.dayString = this.getFullNameOfDay(new Date(day.date));
  }

  getChildIndex(node: any) {
    return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
  }

  getPersianDate(date: Date) {
    var name = '';
    if (this.getDay(date) == this.today) {
      name = this.getFullNameOfDay(date);
    } else {
      name = this.getShortNameOfDay(date);
    }
    return name;
  }

  getFullNameOfDay(date: Date) {
    return date.toLocaleDateString('fa', { weekday: 'long' });
  }

  getShortNameOfDay(date: Date) {
    return date.toLocaleDateString('fa', { weekday: 'narrow' });
  }

  getMonthName() {
    let name = this.current.toLocaleDateString('fa', { month: 'long' });
    return name;
  }

  getYear() {
    return Number(
      this.fixNumbers(this.current.toLocaleDateString('fa').split('/')[0])
    );
  }

  getMonth() {
    return Number(
      this.fixNumbers(this.current.toLocaleDateString('fa').split('/')[1])
    );
  }

  getToday() {
    return Number(
      this.fixNumbers(this.current.toLocaleDateString('fa').split('/')[2])
    );
  }
  getDay(date: Date) {
    return Number(this.fixNumbers(date.toLocaleDateString('fa').split('/')[2]));
  }
}
