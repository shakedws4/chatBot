import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {MessageReq, MessageRes, url} from "../../config";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _httpClient: HttpClient) {}

  sendMessage(message: string): Observable<MessageRes> {
    return this._httpClient.post(url, {message:message} as MessageReq);
  }
}
