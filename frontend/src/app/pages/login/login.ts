import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  isLoginMode = true; 

  credentials = {
    name: '',
    email: '',
    password: ''
  };
  
  errorMessage = '';
  successMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit() {
    // Limpa apenas as mensagens de erro ao clicar no botão
    this.errorMessage = '';

    if (this.isLoginMode) {
      // ===== FLUXO DE LOGIN =====
      this.successMessage = ''; // Limpa a mensagem verde na hora de logar

      this.apiService.login(this.credentials).subscribe({
        next: (response: any) => { 
          localStorage.setItem('token', response.token);
          if (response.user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err: any) => { 
          this.errorMessage = err.error?.message || 'Erro ao conectar com o servidor.';
        }
      });
    } else {
      // ===== FLUXO DE CADASTRO =====
      this.apiService.register(this.credentials).subscribe({
        next: () => {
          // Mostra a mensagem verde e mantém a tela no modo cadastro
          this.successMessage = 'Cadastro realizado com sucesso! Redirecionando...';
          
          // Limpa os campos por segurança
          this.credentials.name = '';
          this.credentials.password = '';
          
          // Aguarda 2 segundos (2000 ms) para o usuário ler a mensagem, e então muda para o Login
          setTimeout(() => {
            this.isLoginMode = true;
            this.successMessage = ''; // Limpa a mensagem verde para a tela ficar limpa
          }, 2000);
        },
        error: (err: any) => {
          this.errorMessage = err.error?.message || 'Erro ao cadastrar usuário.';
        }
      });
    }
  }
}