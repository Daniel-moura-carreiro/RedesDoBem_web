import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { CaixaDialogoConfirmacao } from '../dialogos/caixa-dialogo-confirmacao/caixa-dialogo-confirmacao';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrls: ['./home.scss'],
    standalone: true,
    imports: [MatButtonModule, MatCardModule]
})
export class HomeComponent implements DoCheck {

  constructor(private router: Router, private dialog: MatDialog) {}

  logado: boolean = false;

  // ngAfterViewChecked(): void {
  //   // Define o valor da propriedade logado com base no conteúdo do localStorage
  //   this.logado = localStorage.getItem('logado') === 'true';
  // }
  ngDoCheck(): void {
    // Define o valor da propriedade logado com base no conteúdo do localStorage
    this.logado = localStorage.getItem('logado') === 'true';
  }
  async sair() {
    if (await this.abrirConfirmacao('Atenção', 'Deseja realmente sair?')) {
      localStorage.removeItem('logado');
      localStorage.removeItem('token');
      this.logado = false;
      this.router.navigate(['/']); // Redirecionar para a página de Login
    }
  }
  abrirConfirmacao(tituloDialogo : string, conteudoDialogo : string) : Promise<boolean> {
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
}
cd "c:\Users\danie\Downloads\RedesDoBem_Web\RedesDoBem_Web"