import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _url = '';

  constructor(private _httpClient: HttpClient) {
  }

  sendMessage(message: string): Observable<any> {
    return this._httpClient.post(this._url, {message:message});
  }
}
