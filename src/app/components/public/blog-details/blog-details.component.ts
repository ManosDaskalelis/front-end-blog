import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit{
  url: string | null = null;


  constructor(private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.paramMap
    .subscribe({
      next: (params) => {
        this.url = params.get('url');
      }
    });


    
  }

}
