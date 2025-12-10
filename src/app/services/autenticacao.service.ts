import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private apiUrl = 'https://reqres.in/api/login';  // URL da API

  constructor(private http: HttpClient) { }

  // Método que utiliza o lastValueFrom para pegar o último valor do Observable
  async verificarUsuario(email: string, senha: string): Promise<any> {
    const body = {
      email: email,  // Definindo o primeiro campo
      password: senha   // Definindo o segundo campo
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
      'x-api-key' : 'reqres_1834266cd5804d82aa284421b850eca8'
    });

    const options = {
      headers: headers,
      responseType: 'json' as const
    };

    const observable: Observable<any> = this.http.post<any>(this.apiUrl, body, options);
    // se fosse get
    //const observable: Observable<any> = this.http.get<any>(this.apiUrl, { params });
    try {
      // Usando lastValueFrom para pegar a última emissão da resposta
      const resposta = await lastValueFrom(observable);
      console.log("Resposta da api:", resposta);
      localStorage.setItem('token', resposta.token);
      return resposta;  // Retorna a resposta da API
    } catch (erro) {
      console.log('Erro da api:', erro);
      throw erro;
    }
  }
}
