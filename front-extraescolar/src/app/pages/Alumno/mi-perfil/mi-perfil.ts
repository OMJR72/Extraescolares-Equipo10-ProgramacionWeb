import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-mi-perfil',
  styleUrl: './mi-perfil.css',
  templateUrl: './mi-perfil.html',
})
export class MiPerfil {
  readonly perfil = {
    nombre: 'Juan Pérez López',
    telefono: '71234567',
    correo: 'juan.perez@universidad.edu',
    correoAdicional: 'juan.perez@correo.com',
    carrera: 'Ingeniería de Sistemas'
  };

  get iniciales(): string {
    return this.perfil.nombre
      .split(' ')
      .slice(0, 2)
      .map((parte) => parte.charAt(0))
      .join('')
      .toUpperCase();
  }
}
