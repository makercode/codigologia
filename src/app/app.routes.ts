import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { PostComponent } from './pages/post/post.component';
import { CategoryComponent } from './pages/category/category.component';
import { TagComponent } from './pages/tag/tag.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { 
        path: 'blog', component: BlogComponent,
        children: [
            {
              path: 'articulo/:id',
              component: PostComponent,
            },
            {
              path: 'categoria/:id',
              component: CategoryComponent,
            },
            {
              path: 'etiqueta/:id',
              component: TagComponent,
            },
        ] 
    },
];
