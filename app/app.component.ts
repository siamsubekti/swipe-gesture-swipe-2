import { Component, OnInit } from '@angular/core';
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { Hammer } from 'hammerjs';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_VERTICAL, threshold: 5 },
  };
}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
})
export class AppComponent implements OnInit {
  eventText = '';
  deltaY: number;

  ngOnInit(): void {
    this.deltaY = document.getElementById('div-swipe').offsetTop;
    console.log('delta y div swipe ', this.deltaY);
  }

  onSwipe(evt) {
    console.log('y ', evt.deltaY);
    this.deltaY = evt.deltaY;
    document.getElementById('div-swipe').style.top = evt.deltaY + 'px';
    const x =
      Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left') : '';
    const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';

    this.eventText += `${x} ${y}<br/>`;
  }
}
