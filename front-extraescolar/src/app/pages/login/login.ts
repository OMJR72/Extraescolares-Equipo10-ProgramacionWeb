
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  selectedRole: string = 'ALUMNO';

  username: string = '';
  password: string = '';

  showPassword: boolean = false;

  selectRole(role: string) {
    this.selectedRole = role;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);
    console.log('Tipo de usuario:', this.selectedRole);
  }
}
