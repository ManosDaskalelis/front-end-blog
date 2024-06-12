import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogpostService } from 'src/app/services/blogPost.service';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/shared/models/blogPost';

@Component({
  selector: 'app-blogpost-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {

  blogPosts$?: Observable<BlogPost[]>

  constructor(private blogPostService: BlogpostService) {

  }

  ngOnInit(): void {
    this.blogPosts$ = this.blogPostService.getAllBlogPosts()
  }

}
