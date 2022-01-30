import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = 'http://localhost:3000'

  constructor(private httpClient: HttpClient) { }

  getUsers():Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`);
  }
}
