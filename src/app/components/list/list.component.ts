import { Component, /*OnInit,*/ Input } from '@angular/core';

import { List } from '../../models/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent /*implements OnInit*/ {

  @Input() list: List[];

/*  constructor() { }

  ngOnInit() {
  }*/

}
