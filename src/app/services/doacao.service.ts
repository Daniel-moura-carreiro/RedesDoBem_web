import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';

export interface Doacao {
  doacao_id?: number;
  tipo_alimento: string;
  quantidade: number;
  unidade: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoacaoService {
  private apiUrl = 'http://localhost:8080/api/doacao';

  constructor(private http: HttpClient) {}

  // ✅ Método para SALVAR doação (inserir ou atualizar)
  async salvarDoacao(doacao: Doacao): Promise<any> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Você precisa estar logado para cadastrar uma doação');
    }

    // ⚠️ Seu backend espera esses 4 campos específicos
    const body = {
      doacao_id: doacao.doacao_id,  // undefined para nova doação
      tipo_alimento: doacao.tipo_alimento,
      quantidade: doacao.quantidade,
      unidade: doacao.unidade
    };

    console.log("Body enviado para salvar doação:", body);

    // ✅ Adiciona o token Bearer no header
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const options = {
      headers: headers,
      responseType: 'json' as const
    };

    const observable: Observable<any> = this.http.post<any>(`${this.apiUrl}/salvar`, body, options);
    
    try {
      const resposta = await lastValueFrom(observable);
      console.log("Doação salva com sucesso:", resposta);
      return resposta;
    } catch (erro) {
      console.error('Erro ao salvar doação:', erro);
      throw erro;
    }
  }

  // ✅ Método para BUSCAR doação por ID
  async buscarDoacao(id: number): Promise<any> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Você precisa estar logado para consultar doações');
    }

    console.log(`Buscando doação ID: ${id}`);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const options = {
      headers: headers,
      responseType: 'json' as const
    };

    const observable: Observable<any> = this.http.get<any>(`${this.apiUrl}/${id}`, options);
    
    try {
      const resposta = await lastValueFrom(observable);
      console.log("Doação encontrada:", resposta);
      return resposta;
    } catch (erro) {
      console.error('Erro ao buscar doação:', erro);
      throw erro;
    }
  }

  // ✅ Método auxiliar para verificar autenticação
  verificarAutenticacao(): boolean {
    return localStorage.getItem('token') !== null;
  }
}