import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hour-component',
  templateUrl: './hour-component.component.html',
  styleUrls: ['./hour-component.component.scss'],
})
export class HourComponentComponent implements OnInit {
  @ViewChild('progressRef', { static: true }) progressRef: any;
  @Input() hour: any;
  @Input() isFirstHalf: boolean = false;

  constructor() {}

  actived = false;

  ngOnInit(): void {

  }

  startDragLine(e: any) {
    if (this.actived) {
      this.progressRef.nativeElement.style.width = e.offsetX + 'px';
      this.progressRef.nativeElement.style.opacity = e.offsetX / 100;
    }
  }

  deactive(e: any) {
    if (this.actived) {
      if (e.offsetX >= 50) {
        this.progressRef.nativeElement.style.width = 100 + 'px';
      this.progressRef.nativeElement.style.opacity = 1;

      } else if (e.offsetX < 50) {
        this.progressRef.nativeElement.style.width = 0 + 'px';
      this.progressRef.nativeElement.style.opacity = 0;

      }
    }

    this.actived = false;
  }

  active() {
    this.actived = true;
  }
}
