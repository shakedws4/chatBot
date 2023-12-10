import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-circle-button',
  standalone: true,
  imports: [],
  templateUrl: './circle-button.component.html',
  styleUrl: './circle-button.component.scss'
})
export class CircleButtonComponent {
  @Output() buttonClick = new EventEmitter();
  @Input() icon = "";
  @Input() size: 's' | 'm' | 'l' = "m";


}
