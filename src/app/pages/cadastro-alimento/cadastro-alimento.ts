import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-alimento',
  templateUrl: './cadastro-alimento.html',
  styleUrls: ['./cadastro-alimento.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class CadastroAlimentoComponent {
  doacao = {
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

  tiposAlimento = ['Grãos', 'Enlatados', 'Frescos', 'Congelados'];
  unidades = ['kg', 'g', 'unidade', 'litro'];
  condicoesArmazenamento = ['Temperatura ambiente', 'Refrigerado', 'Congelado'];

  setStatus(status: string) {
    this.doacao.status = status;
  }

  cadastrarDoacao() {
    console.log('Doação cadastrada:', this.doacao);
    // Aqui você pode integrar com um serviço backend
  }

  cancelar() {
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
  }
}
