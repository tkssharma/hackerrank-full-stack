import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'temperature-converter',
  templateUrl: './temperatureConverter.component.html',
  styleUrls: ['./temperatureConverter.component.scss']
})

export class TemperatureConverter implements OnInit {

  c: any;
  f: any;
  ngOnInit() {
    // C = (F − 32) × 5/9
    // F = C*9/5 + 32
  }

  changed(value: any, type: any) {
    if (value) {
      if (type === 'c') {
        let feh = (value * 9 / 5) + 32;
        this.f = feh.toFixed(1);
      } else {
        let cel = (value - 32) * (5 / 9);
        this.c = cel.toFixed(1);
      }
    } else {
      this.c = null;
      this.f = null;
    }

  }

}