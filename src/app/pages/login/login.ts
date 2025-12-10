import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CaixaDialogoSimples } from '../dialogos/caixa-dialogo-simples/caixa-dialogo-simples';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CaixaDialogoSimples],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login { // nome sem "Component"

  loginForm: FormGroup;
  dados: any;
  erro: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private autenticacaoService: AutenticacaoService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  async verificarDados(email: string, senha: string): Promise<void> {
    try {
      this.dados = await this.autenticacaoService.verificarUsuario(email, senha);
      console.log('Dados recebidos:', this.dados);
      this.erro = null;
    } catch (erro) {
      console.log('Erro recebido da api:', erro);
      this.erro = erro;
    }
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulário válido', this.loginForm.value);
      await this.verificarDados(
        this.loginForm.get('email')?.value,
        this.loginForm.get('senha')?.value
      );

      if (this.erro === null) {
        this.abrirDialogo('Informação', 'Login realizado com sucesso!');
        localStorage.setItem('logado', 'true');
        await this.router.navigateByUrl('/home', { replaceUrl: true });
      } else {
        const status = this.erro?.status ?? 'N/A';
        const message = this.erro?.error?.error ?? JSON.stringify(this.erro);
        this.abrirDialogo('Erro', `STATUS: ${status} - ERROR: ${message}`);
      }
    } else {
      console.log('Formulário inválido');
      this.loginForm.markAllAsTouched();
    }
  }

  abrirDialogo(tituloDialogo: string, conteudoDialogo: string) {
    this.dialog.open(CaixaDialogoSimples, {
      width: '200px',
      height: '200px',
      data: { titulo: tituloDialogo, conteudo: conteudoDialogo },
    });
  }
}