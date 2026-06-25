import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'] // ou .scss
})
export class DashboardComponent implements OnInit {
  matches: any[] = [];
  userId: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    
    // Se não tiver token, expulsa para o login
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    // Truque rápido para ler o ID do usuário direto do Token JWT
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userId = payload.id;
    } catch (e) {
      this.router.navigate(['/login']);
    }

    this.loadMatches();
  }

  loadMatches() {
    this.apiService.getMatches().subscribe({
      next: (data: any) => {
        this.matches = data;
      },
      error: (err: any) => console.error('Erro ao buscar jogos', err)
    });
  }

  submitBet(match: any) {
    // Valida se o usuário preencheu os dois campos
    if (match.myGuessA == null || match.myGuessB == null) {
      alert('Preencha os dois placares antes de salvar!');
      return;
    }

    const betData = {
      user: this.userId,
      match: match._id,
      guessA: match.myGuessA,
      guessB: match.myGuessB
    };

    this.apiService.createBet(betData).subscribe({
      next: () => alert('Palpite salvo com sucesso!'),
      error: (err: any) => alert(err.error?.message || 'Erro ao salvar palpite.')
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}