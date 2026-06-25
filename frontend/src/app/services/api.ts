import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // URL base do nosso backend
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Método auxiliar para pegar o token salvo no localStorage
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Envia o token para rotas protegidas
    });
  }

  // ==========================================
  // ROTAS DE AUTENTICAÇÃO
  // ==========================================

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  // ==========================================
  // ROTAS DE JOGOS (MATCHES)
  // ==========================================

  getMatches(): Observable<any> {
    return this.http.get(`${this.apiUrl}/matches`);
  }

  createMatch(matchData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/matches`, matchData, { headers: this.getHeaders() });
  }

  updateMatchResult(id: string, resultData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/matches/${id}/result`, resultData, { headers: this.getHeaders() });
  }

  // ==========================================
  // ROTAS DE PALPITES (BETS)
  // ==========================================

  createBet(betData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bets`, betData, { headers: this.getHeaders() });
  }

  getUserBets(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/bets/user/${userId}`, { headers: this.getHeaders() });
  }
}