import { Routes } from '@angular/router';
// Repare que importamos o NOME DA CLASSE do caminho do arquivo
import { LoginComponent } from './pages/login/login'; 
import { DashboardComponent } from './pages/dashboard/dashboard';
import { AdminComponent } from './pages/admin/admin';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: 'login' }
];