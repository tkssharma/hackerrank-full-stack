import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Filters} from "./filters/filters.component";
import {SurveyList} from "./surveyList/surveyList.component";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled;

  const getByTestId = (id, parentNode?) => {
    if (!parentNode) {
      parentNode = compiled;
    }
    return parentNode.querySelector(`[data-test-id="${id}"]`);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        Filters,
        SurveyList
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
      .overrideComponent(AppComponent, {
        set: {changeDetection: ChangeDetectionStrategy.Default}
      })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('Initial UI is rendered as expected', async () => {
    const results = getByTestId('survey-list').children;
    expect(results.length).toEqual(4);
  });

  it('Clicking on "Active" status filter works', async () => {
    const statusLink = getByTestId('status-list').children[2];
    statusLink.click();
    await fixture.whenStable();
    fixture.detectChanges();
    const results = getByTestId('survey-list').children;
    expect(results.length).toEqual(3);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Designer Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Workplace');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[1].children[3].innerHTML.trim()).toEqual('New Framework');
    expect(results[2].children[0].innerHTML.trim()).toEqual('Developer Survey');
    expect(results[2].children[1].innerHTML.trim()).toEqual('Development');
    expect(results[2].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[2].children[3].innerHTML.trim()).toEqual('Education');
  });

  it('Clicking on "Completed" status filter works', async () => {
    const completedLink = getByTestId('status-list').children[3];
    completedLink.click();
    await fixture.whenStable();
    fixture.detectChanges();
    const results = getByTestId('survey-list').children;
    expect(results.length).toEqual(2);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Backend Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Hardware');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Completed');
    expect(results[1].children[3].innerHTML.trim()).toEqual('Personal');
  });

  it('Clicking on "Development" category filter works', async () => {
    const developmentLink = getByTestId('category-list').children[1];
    developmentLink.click();
    await fixture.whenStable();
    fixture.detectChanges();
    const results = getByTestId('survey-list').children;
    expect(results.length).toEqual(2);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Developer Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Development');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[1].children[3].innerHTML.trim()).toEqual('Education');
  });

  it('Clicking on "Workplace" category filter works', async () => {
    const workplaceLink = getByTestId('category-list').children[2];
    workplaceLink.click();
    await fixture.whenStable();
    fixture.detectChanges();
    const results = getByTestId('survey-list').children;
    expect(results.length).toEqual(2);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Designer Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Workplace');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[1].children[3].innerHTML.trim()).toEqual('New Framework');
  });

  it('Clicking on "Hardware" category filter works', async () => {
    const hardwareLink = getByTestId('category-list').children[3];
    hardwareLink.click();
    await fixture.whenStable();
    fixture.detectChanges();
    const results = getByTestId('survey-list').children;
    expect(results.length).toEqual(2);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Backend Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Hardware');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Completed');
    expect(results[1].children[3].innerHTML.trim()).toEqual('Personal');
  });

  it('Clicking on a category twice render the entire list', async () => {
    const hardwareLink = getByTestId('category-list').children[3];
    hardwareLink.click();
    await fixture.whenStable();
    await fixture.detectChanges();
    let results = getByTestId('survey-list').children;
    expect(results.length).toEqual(2);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Backend Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Hardware');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Completed');
    expect(results[1].children[3].innerHTML.trim()).toEqual('Personal');

    hardwareLink.click();
    await fixture.whenStable();
    await fixture.detectChanges();
    results = getByTestId('survey-list').children;
    expect(results.length).toEqual(4);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Designer Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Workplace');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[1].children[3].innerHTML.trim()).toEqual('New Framework');
    expect(results[2].children[0].innerHTML.trim()).toEqual('Developer Survey');
    expect(results[2].children[1].innerHTML.trim()).toEqual('Development');
    expect(results[2].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[2].children[3].innerHTML.trim()).toEqual('Education');
    expect(results[3].children[0].innerHTML.trim()).toEqual('Backend Survey');
    expect(results[3].children[1].innerHTML.trim()).toEqual('Hardware');
    expect(results[3].children[2].innerHTML.trim()).toEqual('Completed');
    expect(results[3].children[3].innerHTML.trim()).toEqual('Personal');
  });

  it('Combination of filters works', async () => {
    let statusLink = getByTestId('status-list').children[2];
    statusLink.click();
    await fixture.whenStable();
    fixture.detectChanges();
    let results = getByTestId('survey-list').children;
    expect(results.length).toEqual(3);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Designer Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Workplace');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[1].children[3].innerHTML.trim()).toEqual('New Framework');
    expect(results[2].children[0].innerHTML.trim()).toEqual('Developer Survey');
    expect(results[2].children[1].innerHTML.trim()).toEqual('Development');
    expect(results[2].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[2].children[3].innerHTML.trim()).toEqual('Education');

    let hardwareLink = getByTestId('category-list').children[3];
    hardwareLink.click();
    await fixture.whenStable();
    fixture.detectChanges();
    results = getByTestId('survey-list').children;
    expect(results.length).toEqual(1);

    const workplaceLink = getByTestId('category-list').children[2];
    workplaceLink.click();
    await fixture.whenStable();
    fixture.detectChanges();

    results = getByTestId('survey-list').children;
    expect(results.length).toEqual(2);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Designer Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Workplace');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[1].children[3].innerHTML.trim()).toEqual('New Framework');

    const developmentLink = getByTestId('category-list').children[1];
    developmentLink.click();
    await fixture.whenStable();
    fixture.detectChanges();

    results = getByTestId('survey-list').children;
    expect(results.length).toEqual(2);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Developer Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Development');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[1].children[3].innerHTML.trim()).toEqual('Education');

    const completedLink = getByTestId('status-list').children[3];
    completedLink.click();
    await fixture.whenStable();
    fixture.detectChanges();

    results = getByTestId('survey-list').children;
    expect(results.length).toEqual(1);

    hardwareLink = getByTestId('category-list').children[3];
    hardwareLink.click();
    await fixture.whenStable();
    fixture.detectChanges();

    results = getByTestId('survey-list').children;
    expect(results.length).toEqual(2);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Backend Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Hardware');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Completed');
    expect(results[1].children[3].innerHTML.trim()).toEqual('Personal');

    hardwareLink = getByTestId('category-list').children[3];
    hardwareLink.click();
    await fixture.whenStable();
    fixture.detectChanges();

    const allLink = getByTestId('status-list').children[1];
    allLink.click();
    await fixture.whenStable();
    fixture.detectChanges();
    results = getByTestId('survey-list').children;
    expect(results.length).toEqual(4);
    expect(results[1].children[0].innerHTML.trim()).toEqual('Designer Survey');
    expect(results[1].children[1].innerHTML.trim()).toEqual('Workplace');
    expect(results[1].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[1].children[3].innerHTML.trim()).toEqual('New Framework');
    expect(results[2].children[0].innerHTML.trim()).toEqual('Developer Survey');
    expect(results[2].children[1].innerHTML.trim()).toEqual('Development');
    expect(results[2].children[2].innerHTML.trim()).toEqual('Active');
    expect(results[2].children[3].innerHTML.trim()).toEqual('Education');
    expect(results[3].children[0].innerHTML.trim()).toEqual('Backend Survey');
    expect(results[3].children[1].innerHTML.trim()).toEqual('Hardware');
    expect(results[3].children[2].innerHTML.trim()).toEqual('Completed');
    expect(results[3].children[3].innerHTML.trim()).toEqual('Personal');
  });
});
