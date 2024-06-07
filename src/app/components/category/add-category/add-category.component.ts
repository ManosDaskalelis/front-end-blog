import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddCategory } from 'src/app/shared/models/add-category';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClientModule } from "@angular/common/http";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy{
  model: AddCategory;
  private addCategorySubscription?: Subscription;

  constructor(private categoryService: CategoryService, private router: Router) {
    this.model = {
      name: "",
      urlHandle: ""
    };
  }
  
  onFormSubmit() {
    this.addCategorySubscription = this.categoryService.addCategory(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/categories')
      }
    });
  }
  
  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
