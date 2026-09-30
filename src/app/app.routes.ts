import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/home/home').then((c) => c.Home)
    },
    {
        path: 'users',
        loadComponent: () => import('./components/users-list/users-list').then((c) => c.UsersList)
    },
    {
        path:'about',
        loadComponent: () => import('./components/about/about').then((c) => c.About)
    }
];
