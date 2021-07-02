import {Component, OnInit, Input} from '@angular/core';
import {Survey} from "../../types/Survey";

@Component({
  selector: 'survey-list',
  templateUrl: './surveyList.component.html',
  styleUrls: ['./surveyList.component.scss']
})

export class SurveyList implements OnInit {
  @Input() surveyList: Survey[];

  ngOnInit() {

  }
}
