import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-cambiar-contrasena',
  styleUrl: './cambiar-contrasena.css',
  templateUrl: './cambiar-contrasena.html',
})
export class CambiarContrasena {
  nuevaContrasena = '';
  confirmarContrasena = '';
  mensaje = '';
  error = '';

  guardar(): void {
    this.mensaje = '';
    this.error = '';

    if (this.nuevaContrasena.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    this.mensaje = 'Contraseña actualizada localmente (demo).';
    this.nuevaContrasena = '';
    this.confirmarContrasena = '';
  }
}
