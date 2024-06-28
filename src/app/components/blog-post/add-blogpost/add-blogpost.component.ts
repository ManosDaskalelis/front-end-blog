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
import { ImageSelectorComponent } from 'src/app/shared/components/image-selector/image-selector.component';
import { BlogImageService } from 'src/app/services/blog-image.service';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule, ImageSelectorComponent],
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  model: AddBlogPost;
  isImageSelectorVisible: boolean = false;
  categories$?: Observable<Category[]>;

  blogImageSelectSubscription?: Subscription

  constructor(
    private blogPostService: BlogpostService,
    private router: Router,
    private categoryService: CategoryService,
    private blogImageService: BlogImageService
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

    this.blogImageSelectSubscription = this.blogImageService.onSelectImage()
      .subscribe({
        next: (selectedImage) => {
          this.model.imageUrl = selectedImage.url;
          this.closeImageSelector()
        }
      })
  }

  onFormSubmit(): void {
    this.blogPostService.addBlogPost(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts')
        }
      })
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.blogImageSelectSubscription?.unsubscribe();
  }
}
