import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/shared/models/category';
import { FormsModule } from '@angular/forms';
import { UpdateCategory } from 'src/app/shared/models/update-category';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null = null;
  params?: Subscription;
  editCategory?: Subscription;
  deleteCategory?: Subscription;
  category?: Category;


  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.params = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.categoryService.getCategoryById(this.id)
            .subscribe({
              next: (response) => {
                this.category = response;
              }
            })
        }
      }
    })
  }

  onFormSubmit(): void {
    const updateCategory: UpdateCategory = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle?? ''

    };
    if (this.id) {
      this.editCategory = this.categoryService.updateCategory(this.id, updateCategory)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/categories');
          }
        })
    }
  }

  onDelete(): void {
    if (this.id) {
      this.deleteCategory = this.categoryService.deleteCategory(this.id)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/categories');
          }
        })
    }
  }

  ngOnDestroy(): void {
    this.params?.unsubscribe();
    this.editCategory?.unsubscribe();
    this.deleteCategory?.unsubscribe();
  }
}
