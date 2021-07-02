import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {Item} from "../../types/Item";

@Component({
  selector: 'data-form',
  templateUrl: './dataForm.component.html',
  styleUrls: ['./dataForm.component.scss']
})

export class DataForm implements OnInit {
  @Output() onItemAdded: EventEmitter<Item> = new EventEmitter<Item>();

  ngOnInit() {

  }

}
