import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DoacaoService } from '../../services/doacao.service';
import { MatDialog } from '@angular/material/dialog';
import { CaixaDialogoSimples } from '../dialogos/caixa-dialogo-simples/caixa-dialogo-simples';

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
export class CadastroAlimentoComponent implements OnInit {
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

  // Controle de edição
  doacaoId?: number;
  modoEdicao = false;
  carregando = false;

  tiposAlimento = ['Grãos', 'Enlatados', 'Frescos', 'Congelados'];
  unidades = ['kg', 'g', 'unidade', 'litro'];
  condicoesArmazenamento = ['Temperatura ambiente', 'Refrigerado', 'Congelado'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private doacaoService: DoacaoService,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.doacaoId = Number(id);
      this.modoEdicao = true;
      await this.carregarDoacao(this.doacaoId);
    }
  }

  async carregarDoacao(id: number): Promise<void> {
    this.carregando = true;
    try {
      const doacaoBackend = await this.doacaoService.buscarDoacao(id);
      this.doacao = {
        tipo: doacaoBackend.tipo_alimento || '',
        validade: doacaoBackend.validade || '',
        descricao: doacaoBackend.tipo_alimento || '',
        quantidade: doacaoBackend.quantidade || null,
        unidade: doacaoBackend.unidade || '',
        endereco: doacaoBackend.endereco || '',
        armazenamento: doacaoBackend.armazenamento || '',
        observacoes: doacaoBackend.observacoes || '',
        status: doacaoBackend.status || 'Disponível'
      };
      this.abrirDialogo('Informação', 'Doação carregada com sucesso!');
    } catch (erro: any) {
      const message = erro?.error?.message || erro?.message || 'Erro ao carregar doação';
      this.abrirDialogo('Erro', `Não foi possível carregar a doação: ${message}`);
      this.router.navigate(['/home']);
    } finally {
      this.carregando = false;
    }
  }

  setStatus(status: string): void {
    this.doacao.status = status;
  }

  async cadastrarDoacao(): Promise<void> {
    this.formSubmitted = true;

    if (!this.validarFormulario()) {
      this.abrirDialogo('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      if (!this.doacaoService.verificarAutenticacao()) {
        this.abrirDialogo('Erro', 'Você precisa estar logado para realizar esta ação.');
        this.router.navigate(['/login']);
        return;
      }

      const doacaoParaBackend = {
        doacao_id: this.doacaoId,
        tipo_alimento: this.doacao.descricao,
        quantidade: this.doacao.quantidade!,
        unidade: this.doacao.unidade,
        validade: this.doacao.validade,
        endereco: this.doacao.endereco,
        armazenamento: this.doacao.armazenamento,
        observacoes: this.doacao.observacoes,
        status: this.doacao.status
      };

      const resposta = await this.doacaoService.salvarDoacao(doacaoParaBackend);

      const mensagem = this.modoEdicao ? 'Doação atualizada com sucesso!' : 'Doação cadastrada com sucesso!';
      this.abrirDialogo('Sucesso', mensagem);

      if (!this.modoEdicao) {
        this.resetarFormulario();
      }

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);

    } catch (erro: any) {
      const status = erro?.status ?? 'N/A';
      const message = erro?.error?.message || erro?.message || 'Erro ao processar doação';
      this.abrirDialogo('Erro', `STATUS: ${status} - ${message}`);
    }
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
    const mensagem = this.modoEdicao ? 'Deseja realmente cancelar a edição?' : 'Deseja realmente cancelar o cadastro?';
    if (confirm(mensagem)) {
      this.resetarFormulario();
      this.router.navigate(['/home']);
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
    this.doacaoId = undefined;
    this.modoEdicao = false;
  }

  abrirDialogo(titulo: string, conteudo: string) {
    this.dialog.open(CaixaDialogoSimples, {
      width: '300px',
      data: { titulo: titulo, conteudo: conteudo }
    });
  }

  irPara(caminho: string) {
    this.router.navigate([caminho]);
  }

  async irRegistrar(caminho: string) {
    await this.cadastrarDoacao();
  }
}