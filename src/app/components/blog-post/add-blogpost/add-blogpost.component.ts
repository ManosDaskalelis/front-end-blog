import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBlogPost } from 'src/app/shared/models/add-blogpost';
import { FormsModule } from '@angular/forms';
import { BlogpostService } from 'src/app/services/blogPost.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MarkdownModule } from "ngx-markdown";

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule],
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent {
  model: AddBlogPost;
  addBlogPostSubscription?: Subscription;

  constructor(private blogPostService: BlogpostService,
    private router: Router
  ) {
    this.model = {
      title: '',
      content: '',
      urlHandle: '',
      fullContent: '',
      imageUrl: '',
      author: '',
      isVisible: true,
      dateCreated: new Date()
    }
  }

  onFormSubmit(): void {
    this.addBlogPostSubscription = this.blogPostService.addBlogPost(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts')
        }
      })
  }


  // ngOnDestroy(): void {
  //   this.addBlogPostSubscription?.unsubscribe();
  // }
}
