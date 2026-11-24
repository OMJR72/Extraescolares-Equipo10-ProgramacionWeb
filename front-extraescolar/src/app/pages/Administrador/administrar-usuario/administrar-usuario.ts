import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface Usuario {
  id: number;
  nombre: string;
  rol: 'Alumno' | 'Encargado' | 'Administrador';
  carrera: string;
  numControl: string;
  correo: string;
  telefono: string;
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-administrar-usuario',
  styleUrl: './administrar-usuario.css',
  templateUrl: './administrar-usuario.html',
})
export class AdministrarUsuario {
  // Formulario de búsqueda (nombre o número de control)
  readonly formularioBusqueda = new FormGroup({
    busqueda: new FormControl('', { nonNullable: true }),
  });

  // Datos de ejemplo: reemplázalos con la respuesta de tu servicio HTTP
  readonly usuarios = signal<Usuario[]>([
    { id: 1, nombre: 'Omar Mora', rol: 'Alumno', carrera: 'Ing. Civil', numControl: '23160832', correo: '23160832@itoaxaca.edu.mx', telefono: '9515848974' },
    { id: 2, nombre: 'Alma Sandra', rol: 'Encargado', carrera: '-', numControl: '23160832', correo: '23160832@itoaxaca.edu.mx', telefono: '9515848974' },
    { id: 3, nombre: 'Heber Reyes', rol: 'Administrador', carrera: '-', numControl: '-', correo: '23160832@itoaxaca.edu.mx', telefono: '9515848974' },
    { id: 4, nombre: 'Mohamed Mi', rol: 'Alumno', carrera: 'Ing. Civil', numControl: '23160832', correo: '23160832@itoaxaca.edu.mx', telefono: '9515848974' },
  ]);

  // Paginación (los "..." son solo visuales)
  readonly paginas: (number | string)[] = ['...', 1, 2, 3, 67, 68];
  readonly paginaActual = signal<number>(1);

  // Se ejecuta al buscar (Enter o clic en la lupa)
  onSubmit(): void {
    const { busqueda } = this.formularioBusqueda.getRawValue();

    // TODO: conectar con tu servicio HTTP, por ejemplo:
    // this.usuarioService.buscar(busqueda, this.paginaActual()).subscribe(...)
    console.log('Buscar usuarios:', busqueda);
  }

  irAPagina(pagina: number | string): void {
    if (typeof pagina !== 'number') return;
    this.paginaActual.set(pagina);
    this.onSubmit();
  }

  filtrar(): void {
    // TODO: abrir menú/opciones de filtro
  }

  agregarUsuario(): void {
    // TODO: abrir formulario o navegar a "nuevo usuario"
  }

  editarUsuario(usuario: Usuario): void {
    // TODO: abrir formulario de edición
    console.log('Editar', usuario);
  }

  eliminarUsuario(usuario: Usuario): void {
    // TODO: confirmar y llamar al servicio HTTP de eliminación
    console.log('Eliminar', usuario);
  }

  cerrarSesion(): void {
    // TODO: limpiar sesión y redirigir al inicio de sesión
  }
}