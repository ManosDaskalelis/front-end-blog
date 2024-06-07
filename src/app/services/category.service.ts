import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AddCategory } from '../shared/models/add-category.js';
import { Observable } from 'rxjs';
import { Category } from '../shared/models/category.js';
import { environment } from 'src/environments/environment';
import { UpdateCategory } from '../shared/models/update-category.js';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(model: AddCategory): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Categories/AddCategory`, model);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories/GetCategories`)
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/Categories/GetCategoryById/${id}`)
  }

  updateCategory(id: string, updateCategory: UpdateCategory): Observable<Category> {
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/Categories/UpdateCategory/${id}`, updateCategory);
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/Categories/DeleteCategory/${id}`)
  }
}
