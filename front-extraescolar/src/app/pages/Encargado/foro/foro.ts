import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Aviso {
  id: number;
  autor: string;
  mensaje: string;
  fechaHora: string;
  imagenAdjunta?: boolean;
}

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-foro',
  styleUrl: './foro.css',
  templateUrl: './foro.html',
})
export class Foro {
  mostrarModal = false;
  mostrarExito = false;
  mensajeExito = '';

  nuevoMensaje = '';
  imagenSeleccionada = false;

  avisos: Aviso[] = [
    {
      id: 1,
      autor: 'Joel Huiqui',
      mensaje:
        'Recordatorio del entrenamiento semanal en la cancha principal; favor de llegar quince minutos antes con uniforme completo.',
      fechaHora: '12/02/26 13:45',
    },
  ];

  abrirModal(): void {
    this.nuevoMensaje = '';
    this.imagenSeleccionada = false;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  toggleImagen(): void {
    this.imagenSeleccionada = !this.imagenSeleccionada;
  }

  insertarEmoji(emoji: string): void {
    this.nuevoMensaje = `${this.nuevoMensaje}${emoji}`.trimStart();
  }

  enviarAviso(): void {
    const textoLimpio = this.nuevoMensaje.trim();
    if (!textoLimpio) {
      return;
    }

    const ahora = new Date();
    const dia = String(ahora.getDate()).padStart(2, '0');
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const anio = String(ahora.getFullYear()).slice(-2);
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');

    this.avisos.unshift({
      id: Date.now(),
      autor: 'Coordinación Deportiva',
      mensaje: textoLimpio,
      fechaHora: `${dia}/${mes}/${anio} ${horas}:${minutos}`,
      imagenAdjunta: this.imagenSeleccionada,
    });

    this.mostrarModal = false;
    this.nuevoMensaje = '';
    this.imagenSeleccionada = false;
    this.mensajeExito = 'El aviso se ha publicado correctamente en el foro.';
    this.mostrarExito = true;
  }

  cerrarExito(): void {
    this.mostrarExito = false;
  }

  eliminarAviso(id: number): void {
    this.avisos = this.avisos.filter((aviso) => aviso.id !== id);
    this.mensajeExito = 'El aviso se ha eliminado correctamente.';
    this.mostrarExito = true;
  }

  seleccionarSeccion(seccion: string): void {
    this.mensajeExito = `Navegando a la sección "${seccion}".`;
    this.mostrarExito = true;
  }

  cerrarSesion(): void {
    this.mensajeExito = 'Sesión cerrada correctamente.';
    this.mostrarExito = true;
  }
}