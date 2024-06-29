import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from "@angular/common/http";
import { AddCategory } from '../shared/models/add-category.js';
import { Observable } from 'rxjs';
import { Category } from '../shared/models/category.js';
import { environment } from 'src/environments/environment';
import { UpdateCategory } from '../shared/models/update-category.js';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  
  getAllCategories(query?: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Observable<Category[]> {
    let params = new HttpParams();

    if (query) {
      params = params.set('query', query)
    }

    if (sortBy) {
      params = params.set('sortBy', sortBy)
    }

    if (sortDirection) {
      params = params.set('sortDirection', sortDirection)
    }

    if (pageNumber) {
      params = params.set('pageNumber', pageNumber)
    }

    if (pageSize) {
      params = params.set('pageSize', pageSize)
    }

    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories/GetCategories`, {
      params: params
    });
  }
  
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/Categories/GetCategory/${id}`)
  }

  getCategoryCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiBaseUrl}/api/Categories/GetCount`)
  }

  addCategory(model: AddCategory): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Categories/AddCategory?addAuth=true`, model);
  }
  
  updateCategory(id: string, updateCategory: UpdateCategory): Observable<Category> {
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/Categories/UpdateCategory/${id}?addAuth=true`, updateCategory);
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/Categories/DeleteCategory/${id}?addAuth=true`)
  }
}
