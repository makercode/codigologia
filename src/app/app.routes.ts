import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { PostComponent } from './pages/post/post.component';
import { CategoryComponent } from './pages/category/category.component';
import { TagComponent } from './pages/tag/tag.component';
import { AboutComponent } from './pages/about/about.component';
import { Portfolio } from './pages/portfolio/portfolio';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'acerca', component: AboutComponent },
    { 
        path: 'blog',
        children: [
            {
            path: '',
            component: BlogComponent,
            },
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
    { 
        path: 'portafolio',
        children: [
            {
            path: '',
            component: Portfolio,
            },
        ] 
    },
    { 
        path: 'contacto',
        children: [
            {
            path: '',
            component: Contact,
            },
        ] 
    },
];
