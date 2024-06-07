import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBlogPost } from 'src/app/shared/models/add-blogpost';
import { FormsModule } from '@angular/forms';
import { BlogpostService } from 'src/app/services/blogpost.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent {
  model: AddBlogPost;

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
      visible: true,
      dateCreated: new Date()
    }
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
