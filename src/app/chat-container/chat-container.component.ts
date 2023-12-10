import {ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {NgForOf} from "@angular/common";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../services/api-service/api.service";
import {MessageComponent} from "./message/message.component";
import {CircleButtonComponent} from "./circle-button/circle-button.component";
import {delay, Subscription} from "rxjs";
export interface Message {
  author: MessageAuthor;
  message: string;
}

export type MessageAuthor = 'user' | 'system'
@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    MessageComponent,
    CircleButtonComponent,
  ],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.scss'
})
export class ChatContainerComponent implements OnDestroy{
  @ViewChild('messagesContainer', {read: ElementRef, static: true}) messagesContainer!: ElementRef;
  private _subs = new Subscription();

  public form = new FormGroup({
    input: new FormControl({value: '', disabled: false}, [Validators.required, this._trimValueValid()])
  })
  public messages: Message[] = [];

  constructor(private _apiService: ApiService, private _cd: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  get inputControl(): AbstractControl | null {
    return this.form.get('input');
  }

  onEnterClick(event: any): void {
    event.preventDefault();
    this.sendMessage();
  }

  sendMessage() {
    if (!this.inputControl?.valid) {
      return
    }
    this._addMessage('user', this.inputControl.value)

    this._subs.add(this._apiService.sendMessage(this.inputControl.value).pipe(delay(500)).subscribe(result => {
      console.log('results', result)
      this._addMessage('system', 'temporary system message');
    }));
    this.inputControl?.setValue('');
  }

  private _addMessage(author: MessageAuthor, message: string) {
    this.messages.push({message: message, author: author});
    this._scrollToBottom()
  }

  private _scrollToBottom(): void {
    this._cd.detectChanges();
    const elementTop = this.messagesContainer.nativeElement.scrollHeight;
    this.messagesContainer.nativeElement.scroll({top: elementTop, behavior: "smooth"});
  }

  private _trimValueValid() {
    return (control: AbstractControl): null | { noValue: true } => {
      if (!control.value) {
        return null;
      }
      return !control.value.trim() ? {noValue: true} : null;
    }
  }

}
