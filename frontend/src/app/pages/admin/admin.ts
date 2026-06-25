import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {
  matches: any[] = [];
  
  // Objeto para limpar o formulário de cadastro
  newMatch = {
    teamA: '',
    teamB: '',
    matchDate: ''
  };

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    
    // O ideal seria verificar aqui se o token é de admin, mas para simplificar, 
    // se passou, carrega a lista de jogos:
    this.loadMatches();
  }

  // Busca todos os jogos cadastrados
  loadMatches() {
    this.apiService.getMatches().subscribe({
      next: (data: any) => this.matches = data,
      error: (err: any) => console.error('Erro ao carregar jogos', err)
    });
  }

  // Cadastra um novo jogo no banco
  createMatch() {
    this.apiService.createMatch(this.newMatch).subscribe({
      next: () => {
        alert('Partida cadastrada com sucesso!');
        // Limpa os campos da tela
        this.newMatch = { teamA: '', teamB: '', matchDate: '' };
        // Atualiza a tabela chamando o banco de novo
        this.loadMatches();
      },
      error: (err: any) => alert(err.error?.message || 'Erro ao cadastrar partida.')
    });
  }

  // Lança o resultado final da partida
  updateResult(match: any) {
    if (match.resultA == null || match.resultB == null) {
      alert('Preencha os dois placares finais!');
      return;
    }

    const resultData = {
      resultA: match.resultA,
      resultB: match.resultB
    };

    this.apiService.updateMatchResult(match._id, resultData).subscribe({
      next: () => {
        alert('Resultado oficial salvo e partida encerrada!');
        this.loadMatches();
      },
      error: (err: any) => alert(err.error?.message || 'Erro ao atualizar resultado.')
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}