import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, take } from 'rxjs';

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(payload: SignupPayload) {
    return this.http.post(`http://myserver.com/api/signup`, payload).pipe(
      take(1),
      catchError(err => {
        throw new Error(err)
      })
    );
  }
}
