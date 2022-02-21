import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  send(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  getLastResult(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
