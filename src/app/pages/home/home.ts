import { Component, DoCheck, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { CaixaDialogoConfirmacao } from '../dialogos/caixa-dialogo-confirmacao/caixa-dialogo-confirmacao';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule]
})
export class HomeComponent implements DoCheck {

  constructor(private router: Router, private dialog: MatDialog) { }

  logado: boolean = false;
  public menuAberto: boolean = false;
  public nomeUsuario: string = "usuário";
  public moduloAtual: string = "admin";

  // Fechar menu ao clicar fora
  @HostListener('document:click', ['$event'])
  clickFora(event: Event): void {
    const target = event.target as HTMLElement;
    const menuTrigger = target.closest('.menu-trigger');
    
    if (!menuTrigger && this.menuAberto) {
      this.menuAberto = false;
    }
  }

  ngDoCheck(): void {
    this.logado = localStorage.getItem('logado') === 'true';
  }

  async sair() {
    if (await this.abrirConfirmacao('Atenção', 'Deseja realmente sair?')) {
      localStorage.removeItem('logado');
      localStorage.removeItem('token');
      this.logado = false;
      this.router.navigate(['/']);
    }
  }

  abrirConfirmacao(tituloDialogo: string, conteudoDialogo: string): Promise<boolean> {
    const caixaConfirmacao = this.dialog.open(CaixaDialogoConfirmacao, {
      width: '200px',
      height: '200px',
      data: {
        titulo: tituloDialogo,
        conteudo: conteudoDialogo
      },
    });
    return lastValueFrom(caixaConfirmacao.afterClosed());
  }

  fazerLogout(): void {
    this.fecharMenu();
    this.router.navigate(['/login']);
  }

  private fecharMenu(): void {
    this.menuAberto = false;
  }

  public alternarMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  public irParaPortal(): void {
    this.navegarPara("/portal");
  }

  public irParaCases(): void {
    this.navegarPara("/cases");
  }

  private navegarPara(rota: string): void {
    this.fecharMenu();
    this.router.navigate([rota]);
  }
}