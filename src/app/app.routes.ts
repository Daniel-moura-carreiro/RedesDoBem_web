import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { CadastroFisicaComponent } from './pages/cadastro/cadastro-fisica/cadastro-fisica';
import { CadastroJuridicaComponent } from './pages/cadastro/cadastro-juridica/cadastro-juridica';
import { CadastroAlimentoComponent } from './pages/cadastro-alimento/cadastro-alimento';
import { AuthGuard } from '../auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: Login
    },
    {
        path: 'cadastro-fisica',
        component: CadastroFisicaComponent
    },
    {
        path: 'cadastro-juridica',
        component: CadastroJuridicaComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cadastro-alimento',
        component: CadastroAlimentoComponent,
        canActivate: [AuthGuard]
    }
];
