import {Component, Input} from '@angular/core';
import {Message} from "../chat-container.component";

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {

  @Input() message: Message = {} as Message;

}
