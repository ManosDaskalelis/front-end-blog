import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBlogPost } from 'src/app/shared/models/add-blogpost';
import { FormsModule } from '@angular/forms';
import { BlogpostService } from 'src/app/services/blogPost.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MarkdownModule } from "ngx-markdown";
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule],
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit {
  model: AddBlogPost;
  categories$?: Observable<Category[]>

  constructor(
    @Inject(BlogpostService) private blogPostService: BlogpostService,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.model = {
      title: '',
      content: '',
      urlHandle: '',
      fullContent: '',
      imageUrl: '',
      author: '',
      isVisible: true,
      dateCreated: new Date(),
      categories: []
    }
  }
  
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

  onFormSubmit(): void {
    this.blogPostService.addBlogPost(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts')
        }
      })
  }

}
