import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface Grupo {
  id: number;
  actividad: string;
  grupo: string;
  horario: string;
  aula: string;
}

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-mis-grupos',
  styleUrl: './mis-grupos.css',
  templateUrl: './mis-grupos.html',
})
export class MisGrupos {
  // private readonly gruposService = inject(GruposService); // <- conectar servicio HTTP aquí
  // private readonly authService = inject(AuthService);
  // private readonly router = inject(Router);

  /** Controla el menú lateral en pantallas pequeñas. */
  menuAbierto = false;

  /** Datos de ejemplo; reemplazar con la respuesta del servicio HTTP. */
  grupos: Grupo[] = [
    { id: 1, actividad: 'Danza Avanzada', grupo: '4E', horario: '08:00-10:00', aula: 'I10' },
    { id: 2, actividad: 'Danza Principiante', grupo: '4A', horario: '13:00-15:00', aula: 'I10' },
  ];

  paginas: number[] = [1, 2, 3, 67, 68];
  paginaActual = 1;

  alternarMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  irAPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.cargarGrupos();
  }

  verInfo(grupo: Grupo): void {
    // TODO: navegar al detalle del grupo, por ejemplo:
    // this.router.navigate(['/mis-grupos', grupo.id]);
    console.log('Ver información del grupo:', grupo);
  }

  /** Esta pantalla no tiene formulario; aquí se conectará la consulta HTTP paginada. */
  private cargarGrupos(): void {
    // TODO: reemplazar por la llamada HTTP real, por ejemplo:
    // this.gruposService.obtenerMisGrupos(this.paginaActual).subscribe({
    //   next: (respuesta) => { this.grupos = respuesta.datos; this.paginas = respuesta.paginas; },
    //   error: () => { /* mostrar mensaje de error */ },
    // });
    console.log('Cargar página:', this.paginaActual);
  }

  cerrarSesion(): void {
    // TODO: reemplazar por la llamada HTTP real, por ejemplo:
    // this.authService.cerrarSesion().subscribe({
    //   next: () => this.router.navigate(['/inicio-sesion']),
    //   error: () => { /* mostrar mensaje de error */ },
    // });
    console.log('Cerrar sesión: pendiente de conectar al servicio HTTP.');
  }
}