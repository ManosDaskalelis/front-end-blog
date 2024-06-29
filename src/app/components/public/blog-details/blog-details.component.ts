import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlogpostService } from 'src/app/services/blogPost.service';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/shared/models/blogPost';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit{
  url: string | null = null;
  blogPost$?: Observable<BlogPost>


  constructor(private route: ActivatedRoute,
    private blogPostService: BlogpostService
  ) {

  }
  ngOnInit(): void {
    this.route.paramMap
    .subscribe({
      next: (params) => {
        this.url = params.get('url');
      }
    });

    if (this.url) {
     this.blogPost$ = this.blogPostService.getBlogPostByUrlHandle(this.url);
    }
  }
}
