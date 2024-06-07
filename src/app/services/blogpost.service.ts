import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBlogPost } from '../shared/models/add-blogpost';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../shared/models/blogPost';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http: HttpClient) {
   }

   addBlogPost(model: AddBlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts/AddBlogPosts`, model)
   }

   getAllBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/BlogPosts/GetBlogPosts`)
  }
}
