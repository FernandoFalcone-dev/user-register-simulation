import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = 'http://localhost:3000'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getUsers():Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`);
  }

  postUser(user: User):Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/users`, user, this.httpOptions);
  }

  deleteUser(id: number): Observable<User> {
    return this.httpClient.delete<User>(`${this.apiUrl}/users/${id}`)
  }

  updateUser(id: string, user: User):Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/users/${id}`, user, this.httpOptions);
  }

  getUser(id: string):Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/users/${id}`);
  }
}
