import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { PostComponent } from './pages/post/post.component';
import { CategoryComponent } from './pages/category/category.component';
import { TagComponent } from './pages/tag/tag.component';
import { AboutComponent } from './pages/about/about.component';
import { Portfolio } from './pages/portfolio/portfolio';
import { Contact } from './pages/contact/contact';
import { Project } from './pages/project/project';
import { PeruTravelerComponent } from './pages/projects/peru-traveler/peru-traveler.component';
import { WooStarsoftComponent } from './pages/projects/woo-starsoft/woo-starsoft.component';
import { ManoalzadaComponent } from './pages/projects/manoalzada/manoalzada.component';
import { CodigologiaComponent } from './pages/projects/codigologia/codigologia.component';
import { MypComponent } from './pages/projects/myp/myp.component';
import { CyrComponent } from './pages/projects/cyr/cyr.component';
import { TonoNunezComponent } from './pages/projects/tono-nunez/tono-nunez.component';
import { MonicaPascoComponent } from './pages/projects/monica-pasco/monica-pasco.component';
import { GuaranaComponent } from './pages/projects/guarana/guarana.component';
import { NegociadorComponent } from './pages/projects/negociador/negociador.component';
import { DeporTriviaComponent } from './pages/projects/depor-trivia/depor-trivia.component';

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
            /*
            {
              path: 'etiqueta/:id',
              component: TagComponent,
            },*/
        ] 
    },
    { 
        path: 'portafolio',
        children: [
            {
            path: '',
            component: Portfolio,
            },
            {
            path: 'proyecto',
            children: [
                {
                path: 'peru-traveler',
                component: PeruTravelerComponent,
                },
                {
                path: 'woo-starsoft',
                component: WooStarsoftComponent,
                },
                {
                path: 'manoalzada',
                component: ManoalzadaComponent,
                },
                {
                path: 'codigologia',
                component: CodigologiaComponent,
                },
                {
                path: 'myp',
                component: MypComponent,
                },
                {
                path: 'cyr',
                component: CyrComponent,
                },
                {
                path: 'tono-nunez',
                component: TonoNunezComponent,
                },
                {
                path: 'monica-pasco',
                component: MonicaPascoComponent,
                },
                {
                path: 'guarana',
                component: GuaranaComponent,
                },
                {
                path: 'negociador',
                component: NegociadorComponent,
                },
                {
                path: 'depor-trivia',
                component: DeporTriviaComponent,
                },
            ]
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
