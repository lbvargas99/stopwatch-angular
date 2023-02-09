import { Injectable } from '@angular/core';
import { Exercise } from '../exercise';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  currentEx: number = 0;
  currentRep: number = 0;
  phase: number = 0;
  timeLeft!: number;

  exercises: Exercise[] = [{
    name: 'Abdominal',
    duration: 30,
    repetition: 3,
    preparation: 15,
    rest: 20
  }];

  restart() {
    this.currentEx = 0;
    this.currentRep = 0;
    this.phase = 0;
    const ex = this.exercises[this.currentEx];
    this.timeLeft = this.getTimeOfCurrentPhase();
  }

  next() {
    if (this.phase < 2) {
      this.phase++;
    } else {
      const ex = this.exercises[this.currentEx];
      if (this.currentRep < ex.repetition - 1) {
        this.currentRep++;
        this.phase = 1;
      } else {
        if (this.currentEx < this.exercises.length - 1) {
          this.currentEx++;
          this.currentRep = 0;
          this.phase = 0;
        } else {
          return;
        }
      }
    }
    this.timeLeft = this.getTimeOfCurrentPhase();
  }

  decrementTimeLeft(ellapsedTimeMs: number) {
    if(ellapsedTimeMs >= this.timeLeft) {
      this.next();
    } else {
      this.timeLeft -= ellapsedTimeMs;
    }
  }

  private getTimeOfCurrentPhase() {
    const ex = this.exercises[this.currentEx];
    switch (this.phase) {
      case 0: return ex.preparation * 1000; break;
      case 1: return ex.duration * 1000; break;
      case 2: return ex.rest * 1000; break;
      default: return 0; break;
    }
  }

  add(exercise: Exercise) {
    this.exercises.push(exercise);
  }

  delete(index: number) {
    this.exercises.splice(index, 1);
  }
}
