import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AutenticacaoService } from '../../../services/autenticacao.service'; // <-- corrigido
import { MatDialog } from '@angular/material/dialog';
import { CaixaDialogoSimples } from '../../dialogos/caixa-dialogo-simples/caixa-dialogo-simples'; // <-- corrigido

@Component({
  selector: 'app-cadastro-juridica',
  templateUrl: './cadastro-juridica.html',
  styleUrls: ['./cadastro-juridica.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule]
})
export class CadastroJuridicaComponent {
  formCadastro: FormGroup;
  estados: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
  ];

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private autenticacaoService: AutenticacaoService, // agora o token de injeção resolve
    private dialog: MatDialog // ✅ INJETAR
  ) {
    this.formCadastro = this.fb.group({
      nome: ['', Validators.required], // ⚠️ Mudei de razaoSocial para nome (campo do HTML)
      cnpj: ['', Validators.required],
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async registrar() {
    if (this.formCadastro.valid) {
      const dados = this.formCadastro.value;
      console.log('Dados do formulário:', dados);
      
      try {
        const resposta = await this.autenticacaoService.cadastrarUsuario(
          dados.email,
          dados.nome,
          dados.senha
        );
        
        console.log('Cadastro realizado com sucesso!', resposta);
        this.abrirDialogo('Sucesso', 'Cadastro realizado com sucesso! Faça login para continuar.');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
        
      } catch (erro: any) {
        console.error('Erro ao cadastrar:', erro);
        const status = erro?.status ?? 'N/A';
        const message = erro?.error?.message || erro?.message || 'Erro ao cadastrar instituição';
        this.abrirDialogo('Erro', `STATUS: ${status} - ${message}`);
      }
    } else {
      console.log('Formulário inválido');
      this.formCadastro.markAllAsTouched();
      this.abrirDialogo('Atenção', 'Por favor, preencha todos os campos corretamente.');
    }
  }

  abrirDialogo(titulo: string, conteudo: string) {
    this.dialog.open(CaixaDialogoSimples, {
      width: '300px',
      data: { titulo: titulo, conteudo: conteudo }
    });
  }
}