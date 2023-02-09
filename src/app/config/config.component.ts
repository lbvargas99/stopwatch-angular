import { Exercise } from './../exercise';
import { TimerService } from './../service/timer.service';
import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {

  constructor(public ts: TimerService) {
  }

  exerciseForm = new FormGroup ({
    name: new FormControl('', Validators.required),
    duration: new FormControl(30, Validators.required),
    repetition: new FormControl(3, Validators.required),
    preparation: new FormControl(15, Validators.required),
    rest: new FormControl(30, Validators.required)
  });

  add() {
    const exercise = this.exerciseForm.value as Exercise;
    this.ts.add(exercise);
    this.exerciseForm.reset({ ...exercise, name: '' })
  }

  delete(index: number) {
    this.ts.delete(index);
  }

}
