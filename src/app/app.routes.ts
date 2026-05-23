import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { authGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
      
      { path: 'tabs', component: TabsPage, children: [
          { path: 'login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)},
          { path: 'register', loadComponent: () => import('./pages/auth/registation/registation.component').then(m => m.RegistationComponent)},

          { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
          { path: 'seller', loadComponent: () => import('./pages/seller/seller.component').then(m => m.SellerComponent)},
          { path: 'buyers', loadComponent: () => import('./pages/buyers/buyers.component').then(m => m.BuyersComponent) },
          { path: 'details/:id', loadComponent: () => import('./pages/details-page/details-page.component').then(m => m.DetailsPageComponent)},
          { path: 'categories', loadComponent: () => import('./pages/category/category.component').then(m => m.CategoryComponent) },
          { path: 'category/:key',loadComponent: () => import('./pages/category-list/category-list.component').then(m => m.CategoryListComponent)},
          { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent) },
          { path: 'search', loadComponent: () => import('./pages/search-result/search-result.component').then(m => m.SearchResultComponent) },
          
          { path: 'profile', canActivate: [authGuard], loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) },
          { path: 'create-post', loadComponent: () => import('./pages/create-post/create-post.component').then(m => m.CreatePostComponent)},
          { path: 'update-post/:id', loadComponent: () => import('./pages/create-post/create-post.component').then(m => m.CreatePostComponent)},
          { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
      },
    { path: '', redirectTo: 'tabs', pathMatch: 'full' }
];
