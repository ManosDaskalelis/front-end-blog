import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogpostService } from 'src/app/services/blogPost.service';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/shared/models/blogPost';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs$?: Observable<BlogPost[]>

  constructor(private blogPostService: BlogpostService) { }


  ngOnInit(): void {
    this.blogs$ = this.blogPostService.getAllBlogPosts();
  }
}
