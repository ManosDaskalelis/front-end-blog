import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBlogPost } from 'src/app/shared/models/add-blogpost';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent {
  model: AddBlogPost;

  constructor() {
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
    
  }
}
