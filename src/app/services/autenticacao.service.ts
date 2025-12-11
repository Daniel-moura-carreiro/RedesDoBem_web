import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private apiUrl = 'http://localhost:8080/api/usuario';  // URL da API

  constructor(private http: HttpClient) { }

  // Método que utiliza o lastValueFrom para pegar o último valor do Observable
  async verificarUsuario(email: string, senha: string): Promise<any> {
    const body = {
      email: email,  // Definindo o primeiro campo
      senha: senha   // Definindo o segundo campo
    };
    console.log("Body:", body);
    // se parâmetros fossem passados na url
    //const params = new HttpParams()
    //  .set('campo1api', campo1)
    //  .set('campo2api', campo2);

    const token = localStorage.getItem('token');

    // APIs que precisam do token
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    //   'Authorization': `Bearer ${token}`
    // });

    // APIs que não precisam do token
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });

    const headers = new HttpHeaders ({
      ' Content-Type': 'application/json'
    });

    const options = {
      headers: headers,
      responseType: 'json' as const
    };

    const observable: Observable<any> = this.http.post<any>(this.apiUrl, body, options);
    try {
      
      const resposta = await lastValueFrom(observable);
      console.log("Resposta da api:", resposta);
      localStorage.setItem('token', resposta.token);
      return resposta;  
    } catch (erro) {
      console.log('Erro da api:', erro);
      throw erro;
    }
  }

  async cadastrarUsuario(email: string, nome: string, senha: string): Promise<any> {
    const body = {
      email: email,
      nome: nome,
      senha: senha
    };
    
    console.log("Body enviado para cadastro:", body);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = {
      headers: headers,
      responseType: 'json' as const
    };

    const observable: Observable<any> = this.http.post<any>(`${this.apiUrl}/salvar`, body, options);
    
    try {
      const resposta = await lastValueFrom(observable);
      console.log("Usuário cadastrado com sucesso:", resposta);
      return resposta;
    } catch (erro) {
      console.error('Erro ao cadastrar usuário:', erro);
      throw erro;
    }
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLogado(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('logado');
  }
}


