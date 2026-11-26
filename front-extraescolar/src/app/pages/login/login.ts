import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type RolUsuario = 'alumno' | 'encargado' | 'administrador';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  readonly roles: { valor: RolUsuario; etiqueta: string }[] = [
    { valor: 'alumno', etiqueta: 'ALUMNO' },
    { valor: 'encargado', etiqueta: 'ENCARGADO' },
    { valor: 'administrador', etiqueta: 'ADMINISTRADOR' },
  ];

  selectedRole: RolUsuario = 'alumno';

  username: string = '';
  password: string = '';

  showPassword: boolean = false;

  selectRole(role: RolUsuario) {
    this.selectedRole = role;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    console.log('Inicio de sesión:', {
      rol: this.selectedRole,
      usuario: this.username,
    });
  }
}
