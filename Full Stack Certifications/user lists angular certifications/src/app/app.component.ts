import {Component} from '@angular/core';
import {Item} from "../types/Item";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  Book: string = 'Book';
  Song: string = 'Song';

  constructor() {

  }

  ngOnInit() {

  }

  onItemAdded(item) {

  }


  onItemDelete(item) {

  }
}
