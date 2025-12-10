import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cadastro-fisica',
  templateUrl: './cadastro-fisica.html',
  styleUrls: ['./cadastro-fisica.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule]
})
export class CadastroFisicaComponent {
  formCadastro: FormGroup;
  estados: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
  ];

  constructor(private fb: FormBuilder) {
    this.formCadastro = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  registrar() {
    if (this.formCadastro.valid) {
      const dados = this.formCadastro.value;
      console.log('Cadastro pessoa física:', dados);
      // Aqui você pode enviar os dados para o backend
    } else {
      console.log('Formulário de pessoa física inválido');
    }
  }
}
