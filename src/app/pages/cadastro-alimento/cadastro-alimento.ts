import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cadastro-alimento',
  standalone: true, 
  imports: [
    FormsModule,    
    CommonModule,
    MatIconModule   
  ],
  templateUrl: './cadastro-alimento.html',
  styleUrls: ['./cadastro-alimento.scss']
})
export class CadastroAlimentoComponent {
  doacao = {
    tipo: '',
    validade: '',
    descricao: '',
    quantidade: null as number | null,
    unidade: '',
    endereco: '',
    armazenamento: '',
    observacoes: '',
    status: 'Disponível',
  };

  formSubmitted = false;

  tiposAlimento = ['Grãos', 'Enlatados', 'Frescos', 'Congelados'];
  unidades = ['kg', 'g', 'unidade', 'litro'];
  condicoesArmazenamento = ['Temperatura ambiente', 'Refrigerado', 'Congelado'];

  constructor(private router: Router) {}

  setStatus(status: string): void {
    this.doacao.status = status;
  }

  cadastrarDoacao(): void {
    this.formSubmitted = true;

    // Validação básica
    if (!this.validarFormulario()) {
      console.log('Formulário inválido');
      return;
    }

    // Aqui você pode fazer a chamada para o backend
    console.log('Doação cadastrada:', this.doacao);
    
    // Exemplo de navegação após cadastro
    // this.router.navigate(['/lista-doacoes']);
    
    // Ou mostrar mensagem de sucesso
    alert('Doação cadastrada com sucesso!');
    
    // Resetar formulário se quiser
    this.resetarFormulario();
  }

  validarFormulario(): boolean {
    return !!(
      this.doacao.tipo &&
      this.doacao.validade &&
      this.doacao.descricao &&
      this.doacao.quantidade &&
      this.doacao.unidade &&
      this.doacao.endereco &&
      this.doacao.armazenamento
    );
  }

  cancelar(): void {
    if (confirm('Deseja realmente cancelar o cadastro?')) {
      this.resetarFormulario();
      // Ou navegar para outra página
      // this.router.navigate(['/home']);
    }
  }

  resetarFormulario(): void {
    this.doacao = {
      tipo: '',
      validade: '',
      descricao: '',
      quantidade: null,
      unidade: '',
      endereco: '',
      armazenamento: '',
      observacoes: '',
      status: 'Disponível',
    };
    this.formSubmitted = false;
  }

  irPara(caminho: string) {
    this.router.navigate([caminho]);
  }

  irRegistrar(caminho: string) {
    this.cadastrarDoacao();
    this.router.navigate([caminho]);
  }
}
