
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { SurveyList } from './surveyList/surveyList.component';
import { Filters } from './filters/filters.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

@NgModule({
  declarations: [
    AppComponent,
    SurveyList,
    Filters
  ],
  imports: [
    BrowserModule,
    RouterTestingModule,
    RouterModule.forRoot([
      { path:'', component: SurveyList }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
