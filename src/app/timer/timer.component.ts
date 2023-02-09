import { TimerService } from './../service/timer.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Exercise } from '../exercise';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {

  interval!: NodeJS.Timeout;

  constructor(public ts: TimerService) { }

  ngOnInit() {
    this.ts.restart();
  }

  formatPhase(phase: number) {
    switch (phase) {
      case 0: return 'Preparation';
      case 1: return 'Exercise';
      case 2: return 'Rest';
      default: return ''; break;
    }
  }

  start() {
    if (!this.interval) {
      let lastTime = Date.now();
      this.interval = setInterval(() => {
        let currentTime = Date.now();
        let ellapsedTime = currentTime - lastTime;
        lastTime = currentTime;
        this.ts.decrementTimeLeft(ellapsedTime);
      }, 100)
    }
  }

  pause() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined!;
    }
  }

  restart() {
    this.ts.restart();
  }

  next() {
    this.ts.next();
  }

  ngOnDestroy(): void {
    this.pause();
  }
}
