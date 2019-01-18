import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ListComponent } from './list.component';
import { ItemComponent } from '../item/item.component';

import { SortableModule } from 'ngx-bootstrap/sortable';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        SortableModule.forRoot()
      ],
      declarations: [
        ListComponent,
        ItemComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    const list: any = { id: 42, title: 'title #42', items: ['Test'] };
    component.list = list;
    fixture.detectChanges();
  });

  it('should create', () => {
    // const component = new ListComponent();
    // const list: any = { id: 42, title: 'title #42', items: ['Test'] };
    // component.list = list;

    expect(component).toBeTruthy();
  });
});
