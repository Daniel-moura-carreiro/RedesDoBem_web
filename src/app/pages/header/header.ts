import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {

  // Exemplo de título ou nome da aplicação
  appTitle: string = 'Meu Projeto Angular';

  constructor(private router: Router) {}

  // Método para navegar para uma rota
  goToHome(): void {
    this.router.navigate(['/']);
  }

  // Método para logout (exemplo)
  logout(): void {
    // Aqui você pode limpar tokens, chamar serviço de autenticação, etc.
    console.log('Usuário saiu');
    this.router.navigate(['/login']);
  }
}
