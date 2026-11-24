import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-bienvenido',
  styleUrl: './bienvenido.css',
  templateUrl: './bienvenido.html',
})
export class Bienvenido {
  // private readonly authService = inject(AuthService); // <- conectar servicio HTTP aquí
  // private readonly router = inject(Router);

  /** Controla el menú lateral en pantallas pequeñas. */
  menuAbierto = false;

  alternarMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  /** Esta pantalla no tiene formulario; la acción lista para conectar es cerrar sesión. */
  cerrarSesion(): void {
    // TODO: reemplazar por la llamada HTTP real, por ejemplo:
    // this.authService.cerrarSesion().subscribe({
    //   next: () => this.router.navigate(['/inicio-sesion']),
    //   error: () => { /* mostrar mensaje de error */ },
    // });
    console.log('Cerrar sesión: pendiente de conectar al servicio HTTP.');
  }
}