import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) { }

  getPosts() {
    return this.http
    .get(this.url)
      .pipe(
        map(data => {
         return data;
        }),
        catchError(error => {
          if (error.status === 404) {
            return throwError(new NotFoundError());
          } else {
            return throwError(new AppError(error));
          }
        })
      );
  }

  createPost(post) {
    return this.http.post(this.url, JSON.stringify(post))
      .pipe(
        map(data => {
         return data;
        }),
        catchError(error => {
          if (error.status === 404) {
            return throwError(new NotFoundError());
          } else {
            return throwError(new AppError(error));
          }
        })
      );
  }

  updatePost(post) {
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true }))
      .pipe(
        map(data => {
         return data;
        }),
        catchError(error => {
          if (error.status === 404) {
            return throwError(new NotFoundError());
          } else {
            return throwError(new AppError(error));
          }
        })
      );
  }

  deletePost(post) {
    return this.http.delete(this.url + '/' + post.id)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(error => {
          if (error.status === 404) {
            return throwError(new NotFoundError());
          } else {
            return throwError(new AppError(error));
          }
        })
      );
  }
}
