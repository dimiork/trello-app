import { Component, /*OnInit*/ } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public lists: any = [{id: 1, title: 'Title #1', items: [1, 2, 3]}, {id: 2, title: 'Title #2', items: [1, 2]}];

/*  constructor() { }

  ngOnInit() {
  }*/
}
