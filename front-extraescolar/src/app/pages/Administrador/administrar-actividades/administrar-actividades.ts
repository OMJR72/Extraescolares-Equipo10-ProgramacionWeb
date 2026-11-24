import { Component } from '@angular/core';

export interface CategoriaActividad {
  id: string;
  titulo: string;
  imagen: string;
  descripcionImagen: string;
}

@Component({
  imports: [],
  selector: 'app-administrar-actividades',
  styleUrl: './administrar-actividades.css',
  templateUrl: './administrar-actividades.html',
})
export class AdministrarActividades {
  // Las imágenes van en la carpeta public/ (por ejemplo public/academicas.jpg)
  readonly categorias: CategoriaActividad[] = [
    {
      id: 'academicas',
      titulo: 'Academicas',
      imagen: 'academicas.jpg',
      descripcionImagen: 'Matraz con líquido morado, modelo de ADN y microscopio',
    },
    {
      id: 'culturales',
      titulo: 'Culturales',
      imagen: 'culturales.jpg',
      descripcionImagen: 'Mástil de una guitarra clásica tocada por una persona',
    },
    {
      id: 'deportivas',
      titulo: 'Deportivas',
      imagen: 'deportivas.jpg',
      descripcionImagen: 'Balones de básquetbol, fútbol americano, fútbol y pelotas de béisbol y tenis',
    },
  ];

  // Esta vista no tiene formulario, así que en lugar de onSubmit()
  // se deja listo el método que se ejecuta al elegir una categoría.
  seleccionarCategoria(categoria: CategoriaActividad): void {
    // TODO: navegar a la lista de actividades de la categoría o cargarlas
    // con tu servicio HTTP, por ejemplo:
    // this.actividadService.listarPorCategoria(categoria.id).subscribe(...)
    console.log('Categoría seleccionada:', categoria.id);
  }

  cerrarSesion(): void {
    // TODO: limpiar sesión y redirigir al inicio de sesión
  }
}