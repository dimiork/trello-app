import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { BoardComponent } from './board.component';
import { ListComponent } from '../list/list.component';
import { ItemComponent } from '../item/item.component';

import { SortableModule } from 'ngx-bootstrap/sortable';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        SortableModule.forRoot()
      ],
      declarations: [
        BoardComponent,
        ListComponent,
        ItemComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
