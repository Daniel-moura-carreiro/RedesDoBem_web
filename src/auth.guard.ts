import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const logado = localStorage.getItem('logado') === 'true';
    
    if (logado) {
      return true; // Permitir acesso
    } else {
      this.router.navigate(['/']); // Redirecionar para a página de login
      return false;
    }
  }
}