import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogpostService } from 'src/app/services/blogPost.service';
import { BlogPost } from 'src/app/shared/models/blogPost';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/shared/models/category';
import { UpdateBlogPost } from 'src/app/shared/models/update-blogpost';
import { ImageSelectorComponent } from 'src/app/shared/components/image-selector/image-selector.component';

@Component({
  selector: 'app-edit-blogpost',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule, ImageSelectorComponent],
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  routeSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  isImageSelectorVisible : boolean = false

  selectedCategories?: string[];

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogpostService,
    private categoryService: CategoryService,
    private router: Router
  ) {

  }
  
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
         this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id)
          .subscribe({
            next: (response) => {
              this.model = response;
              this.selectedCategories = response.categories.map(x => x.id)
            }
          });
        }
      }
    })
  }

  onFormSubmit(): void {
    if (this.model && this.id) {
      var updateBlogPost: UpdateBlogPost = {
        author: this.model.author,
        fullContent: this.model.fullContent,
        content: this.model.content,
        imageUrl: this.model.imageUrl,
        isVisible: this.model.isVisible,
        dateCreated: this.model.dateCreated,
        title: this.model.title,
        urlHandle: this.model.title,
        categories: this.selectedCategories ?? []
      };

      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts')
        } 
      })
    }
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }

  onDelete(): void {
    if (this.id) {
     this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl(`/admin/blogposts`)
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
  }
}
