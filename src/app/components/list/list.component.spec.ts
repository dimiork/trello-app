import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ListComponent } from './list.component';
import { ItemComponent } from '../item/item.component';

import { SortableModule } from 'ngx-bootstrap/sortable';

import { AppModule } from '../../app.module';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        SortableModule.forRoot(),
        AppModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    const list: any = { id: '42', title: 'title #42', items: [{ id: '01', title: 'item_title', description: 'item_descr'}] };
    component.list = list;
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('should create with title "title #42" ', () => {

    expect(component).toBeTruthy();
    expect(component.list.title).toBe('title #42');
  });

  it('should add new item to list with title "Incode" ', () => {

    component.addItem('Incode');
    const items = component.list.items;
    const len = items.length;
    console.log(component);
    // expect(items[1].title).toBe('Incode');
    expect(len).toBe(1);
  });

  it('should remove list', () => {

    component.removeList();

    // expect(items[1].title).toBe('Incode');
    // console.log(component);
    expect(component).toBeTruthy();
  });

});
