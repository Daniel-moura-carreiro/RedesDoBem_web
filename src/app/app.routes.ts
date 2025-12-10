import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { AuthGuard } from '../auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: Login
    },
    {
        path: 'home',
        component: 
        HomeComponent,
        canActivate: 
        [AuthGuard]
    }
];
