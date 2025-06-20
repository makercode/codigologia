import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BlogService } from './../../services/data/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  
  posts$:any;
  constructor(private blogService: BlogService) {}

  ngOnInit() {
    
    this.blogService.getBlogPosts().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.posts$ = data;
      },
      error: (err) => console.error('Error:', err)
    });

  }

}