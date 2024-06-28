import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BlogImageService } from 'src/app/services/blog-image.service';
import { response } from 'express';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit{
  private file?: File;
  fileName: string = '';
  title: string = '';
  blogImages$?: Observable<BlogImage[]>;

  @ViewChild('form', { static: false}) imageUloadForm?: NgForm;

  constructor(private blogImageService: BlogImageService) { }

  ngOnInit(): void {
    this.getImages();
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage(): void {
    if (this.file && this.fileName !== '' && this.title !== '') {

      this.blogImageService.uploadImage(this.file, this.fileName, this.title)
        .subscribe({
          next: (response) => {
            this.imageUloadForm?.resetForm();
            this.getImages();
          }
        })
    }
  }

  private getImages() {
    this.blogImages$ = this.blogImageService.getAllImages()
  }
}
