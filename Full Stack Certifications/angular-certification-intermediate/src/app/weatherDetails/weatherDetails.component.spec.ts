import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';
import {WeatherDetails} from './weatherDetails.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
let Bluebird = require('bluebird');
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('WeatherDetails', () => {
  let component: WeatherDetails;
  let fixture: ComponentFixture<WeatherDetails>;
  let appInput;
  let weatherDetailsDiv;

  const pushValue = async (value, fixture) => {
    appInput.value = value;
    appInput.dispatchEvent(new Event('change'));
    appInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  };

  const getByTestId = (testId: string, compiled) => {
    return compiled.querySelector(`[data-test-id="${testId}"]`);
  };


  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule,
          FormsModule
        ],
        declarations: [WeatherDetails],
        schemas : [CUSTOM_ELEMENTS_SCHEMA]
      })
      .compileComponents();
  }));

  const factory = (weatherData) => {
    const fixture: ComponentFixture<WeatherDetails> = TestBed.createComponent(WeatherDetails);
    const component: WeatherDetails = fixture.componentInstance;
    component.weatherData = weatherData;
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    return {
      fixture,
      component,
      compiled
    };
  };

  const weatherData = [
    {
      "name": "Denver",
      "temperature": "36º F",
      "wind": "31Kmph",
      "humidity": "66%"
    },
    {
      "name": "Dallas",
      "temperature": "3º F",
      "wind": "4Kmph",
      "humidity": "9%"
    },
    {
      "name": "Madison",
      "temperature": "15º F",
      "wind": "8Kmph",
      "humidity": "61%"
    },
    {
      "name": "Portland",
      "temperature": "27º F",
      "wind": "35Kmph",
      "humidity": "2%"
    },
    {
      "name": "Austin",
      "temperature": "12º F",
      "wind": "25Kmph",
      "humidity": "5%"
    },
    {
      "name": "Phoenix",
      "temperature": "15º F",
      "wind": "1Kmph",
      "humidity": "5%"
    },
    {
      "name": "Boston",
      "temperature": "5º F",
      "wind": "8Kmph",
      "humidity": "48%"
    }
  ];

  const cities = ['Dallas', 'Portland', 'boston', 'phoenix'];

  const nonExistingCities = ['Seattle', 'new york', 'florida'];

  it('Initial UI is rendered as expected', async () => {
    const {compiled, fixture} = factory(weatherData);
    await fixture.whenStable();
    appInput = getByTestId('app-input', compiled);
    weatherDetailsDiv = getByTestId('weather-details', compiled);
    const noResultFoundDiv = getByTestId('no-results', compiled);

    expect(appInput.value).toBeFalsy();
    expect(weatherDetailsDiv).toBeFalsy();
    expect(noResultFoundDiv).toBeFalsy();
  });

  it('Test with existing cities in both upper and small case', async (done) => {
    const {compiled, fixture} = factory(weatherData);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);

    Bluebird.each(cities, async (city) => {
      await pushValue(city, fixture);
      await fixture.detectChanges();
      const output = weatherData.filter(e => e.name.toLowerCase() === city.toLowerCase())[0];
      expect(getByTestId('output-temperature', compiled).innerHTML.trim()).toBe(output.temperature);
      expect(getByTestId('output-wind', compiled).innerHTML.trim()).toBe(`Wind: ${output.wind}`);
      expect(getByTestId('output-humidity', compiled).innerHTML.trim()).toBe(`Humidity: ${output.humidity}`);
      expect(getByTestId('no-results', compiled)).toBeFalsy();
    })
    .then(() => {
      done();
    })
  });

  it('Test with non-existing cities', async (done) => {
    const {compiled, fixture} = factory(weatherData);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);

    Bluebird.each(nonExistingCities, async (city) => {
      await pushValue(city, fixture);
      await fixture.detectChanges();
      expect(getByTestId('weather-details', compiled)).toBeFalsy();
      expect(getByTestId('no-results', compiled).innerHTML.trim()).toBe('No Results Found');
    })
    .then(() => {
      done();
    })
  });

  it('Perform series of actions', async () => {
    const {compiled, fixture} = factory(weatherData);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);

    await pushValue('dallas', fixture);
    await fixture.detectChanges();
    expect(getByTestId('output-temperature', compiled).innerHTML.trim()).toBe('3º F');
    expect(getByTestId('output-wind', compiled).innerHTML.trim()).toBe(`Wind: 4Kmph`);
    expect(getByTestId('output-humidity', compiled).innerHTML.trim()).toBe(`Humidity: 9%`);
    expect(getByTestId('no-results', compiled)).toBeFalsy();

    await pushValue('seattle', fixture);
    await fixture.detectChanges();
    expect(getByTestId('weather-details', compiled)).toBeFalsy();
    expect(getByTestId('no-results', compiled).innerHTML.trim()).toBe('No Results Found');

    await pushValue('', fixture);
    await fixture.detectChanges();
    expect(getByTestId('weather-details', compiled)).toBeFalsy();
    expect(getByTestId('no-results', compiled)).toBeFalsy();

    await pushValue('Boston', fixture);
    await fixture.detectChanges();
    expect(getByTestId('output-temperature', compiled).innerHTML.trim()).toBe('5º F');
    expect(getByTestId('output-wind', compiled).innerHTML.trim()).toBe(`Wind: 8Kmph`);
    expect(getByTestId('output-humidity', compiled).innerHTML.trim()).toBe(`Humidity: 48%`);
    expect(getByTestId('no-results', compiled)).toBeFalsy();
  });
});
