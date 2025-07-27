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
import { BeautybossComponent } from './pages/projects/beautyboss/beautyboss.component';
import { YaquaComponent } from './pages/projects/yaqua/yaqua.component';
import { MdbarnComponent } from './pages/projects/mdbarn/mdbarn.component';

export const routes: Routes = [
    { 
        title:'Home',
        data: {title: 'Home'},
        path: '', 
        component: HomeComponent 
    },
    { 
        title:'Acerca',
        path: 'acerca', 
        component: AboutComponent 
    },
    { 
        path: 'blog',
        children: [
            {
                title:'Blog',
                path: '',
                component: BlogComponent,
            },
            {
                title:'home',
                path: 'articulo/:id',
                component: PostComponent,
            },
            {
                title:'home',
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
                title:'Portafolio',
                path: '',
                component: Portfolio,
            },
            {
            path: 'proyecto',
            children: [
                {
                    title:'Perú traveler',
                    path: 'peru-traveler',
                    component: PeruTravelerComponent,
                },
                {
                    title:'Woo Starsoft',
                    path: 'woo-starsoft',
                    component: WooStarsoftComponent,
                },
                {
                    title:'Mano Alzada',
                    path: 'manoalzada',
                    component: ManoalzadaComponent,
                },
                {
                    title:'Codigologia',
                    path: 'codigologia',
                    component: CodigologiaComponent,
                },
                {
                    title: 'MYP',
                    path: 'myp',
                    component: MypComponent,
                },
                {
                    title: 'CYR',
                    path: 'cyr',
                    component: CyrComponent,
                },
                {
                    title: 'Toño Nuñez',
                    path: 'tono-nunez',
                    component: TonoNunezComponent,
                },
                {
                    title: 'Monica Pasco',
                    path: 'monica-pasco',
                    component: MonicaPascoComponent,
                },
                {
                    title: 'Guarana',
                    path: 'guarana',
                    component: GuaranaComponent,
                },
                {
                    title: 'Negociador',
                    path: 'negociador',
                    component: NegociadorComponent,
                },
                {
                    title: 'Depor Trivia',
                    path: 'depor-trivia',
                    component: DeporTriviaComponent,
                },
                {
                    title: 'Beautyboss',
                    path: 'beautyboss',
                    component: BeautybossComponent,
                },
                {
                    title: 'Yaqua',
                    path: 'yaqua',
                    component: YaquaComponent,
                },
                {
                    title: 'Barn',
                    path: 'barn',
                    component: MdbarnComponent,
                },
            ]
            },
        ] 
    },
    { 
        title: 'Contacto',
        path: 'contacto',
        children: [
            {
                path: '',
                component: Contact,
            },
        ] 
    },
];
