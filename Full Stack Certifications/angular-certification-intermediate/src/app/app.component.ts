import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Weather Details';

  weatherData = [
    {
      "name": "San Jose",
      "temperature": "36º F",
      "wind": "31Kmph",
      "humidity": "66%"
    },
    {
      "name": "Seattle",
      "temperature": "30º F",
      "wind": "4Kmph",
      "humidity": "9%"
    },
    {
      "name": "New York",
      "temperature": "20º F",
      "wind": "8Kmph",
      "humidity": "61%"
    },
    {
      "name": "Chicago",
      "temperature": "27º F",
      "wind": "35Kmph",
      "humidity": "2%"
    },
    {
      "name": "Atlanta",
      "temperature": "22º F",
      "wind": "25Kmph",
      "humidity": "5%"
    },
    {
      "name": "Austin",
      "temperature": "25º F",
      "wind": "1Kmph",
      "humidity": "5%"
    },
    {
      "name": "Denver",
      "temperature": "30º F",
      "wind": "8Kmph",
      "humidity": "48%"
    }
  ];
}
