import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-juridica',
  templateUrl: './cadastro-juridica.html',
  styleUrls: ['./cadastro-juridica.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CadastroJuridicaComponent {
  formCadastro: FormGroup;
  estados: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
  ];

  constructor(private fb: FormBuilder) {
    this.formCadastro = this.fb.group({
      razaoSocial: ['', Validators.required],
      cnpj: ['', Validators.required],
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      capacidadeRecebimento: ['', Validators.required],
      descricaoOrganizacao: ['', Validators.required]
    });
  }

  registrar() {
    if (this.formCadastro.valid) {
      const dados = this.formCadastro.value;
      console.log('Cadastro pessoa jurídica:', dados);
      // Aqui você pode enviar os dados para o backend
    } else {
      console.log('Formulário de pessoa jurídica inválido');
    }
  }
}
