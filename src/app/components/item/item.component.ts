import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Item } from '../../models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {

  @Input() item: Item;
}
