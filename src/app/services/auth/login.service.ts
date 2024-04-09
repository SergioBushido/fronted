import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({id:0, email:''});

  constructor(private http: HttpClient) { }

  login(credentials:LoginRequest):Observable<User>{
    return this.http.get<User>('././assets/data.json').pipe(
      tap((userData: User) =>{
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    );//aqui en los parentesis meteriamos la url del servicio a consumir 
 }

 private handleError(error:HttpErrorResponse){
  if(error.status===0){
    
    console.error('Error', error.error)
  }else{
    console.error('erro', error.status, error.error);
  }
  return throwError(()=>new Error('Algo falló. Intentelo de nuevo'));
 }

 get userData():Observable<User>{
  return this.currentUserData.asObservable();
}

get userLoginOn():Observable<boolean>{
  return this.currentUserLoginOn.asObservable();
}

}

