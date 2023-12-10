import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ChatContainerComponent} from "./chat-container/chat-container.component";
import {CircleButtonComponent} from "./chat-container/circle-button/circle-button.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChatContainerComponent, CircleButtonComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'chatApp';
  public isOpen = false;
  public toggleChat(): void {
    this.isOpen = !this.isOpen;
  }
}
