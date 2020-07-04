import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private url: string, private http: HttpClient) {}

  getAll(){
    return this.http.get(this.url).pipe(
      catchError(this.handleError));
  }

  create(resource){
      // return throwError(new AppError(resource));
    return this.http.post(this.url, JSON.stringify(resource))
      .pipe(
        map(res=>res),
          catchError(this.handleError)
      );
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({isRead: true}))
      .pipe(catchError(this.handleError));
  }

  delete(id){
      // return throwError(new AppError(id))
    return this.http.delete(this.url + '/' + id)
     .pipe(
        catchError(this.handleError)
     );
  }

  private handleError(error: Response){
    if (error.status === 400) {
      return throwError(new BadInput(error));
    }

    if (error.status === 404) {
      return throwError(new NotFoundError(error));
    }
    return throwError(new AppError(error));
  }
}
