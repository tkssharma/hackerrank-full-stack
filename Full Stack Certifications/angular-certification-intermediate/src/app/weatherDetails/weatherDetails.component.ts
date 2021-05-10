import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'weather-details',
  templateUrl: './weatherDetails.component.html',
  styleUrls: ['./weatherDetails.component.scss']
})

export class WeatherDetails implements OnInit {
  @Input() weatherData: data[];
  city: any;
  cityDetails: any;
  showNoResult: boolean = false;
  hideDetails: boolean = false;

  ngOnInit() {

  }

  cityChange(value: any) {
    if (value) {
      let foundCityDetails = this.weatherData.find(city => city.name.toLowerCase() == value.toLowerCase());
      if (foundCityDetails) {
        this.cityDetails = foundCityDetails;
        this.hideDetails = true;
        this.showNoResult = false;
      }
      else {
        this.showNoResult = true;
        this.hideDetails = false;
      }
    } else {
      this.showNoResult = false;
      this.hideDetails = false;
    }

  }
}

interface data {
  name: string;
  temperature: string;
  wind: string;
  humidity: string;
}