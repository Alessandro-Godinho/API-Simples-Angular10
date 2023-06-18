import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Contato from './contato';

@Injectable({
  providedIn: 'root'
})
export class DadosService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getDados(): Observable<Contato[]> {
    return this.http.get<Contato[]>(`${this.apiUrl}/contatos`);
  }

  salvarContato(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(`${this.apiUrl}/contatos`, contato); 
  }

  atualizarContato(contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${this.apiUrl}/contatos/${contato.id}`, contato);
  }

  buscarContatoPorId(id: string): Observable<Contato> {
    return this.http.get<Contato>(`${this.apiUrl}/contatos/${id}`);
  }

  excluirContato(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/contatos/${id}`); 
  }
}
