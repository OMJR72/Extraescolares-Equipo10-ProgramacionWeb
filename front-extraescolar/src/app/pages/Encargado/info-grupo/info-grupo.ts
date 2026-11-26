import { Component } from '@angular/core';

interface Grupo {
  nombre: string;
  grupo: string;
  aula: string;
  horario: string;
  cupo: number;
}

interface Estudiante {
  nombre: string;
  numeroControl: string;
  carrera: string;
}

@Component({
  imports: [],
  selector: 'app-info-grupo',
  styleUrl: './info-grupo.css',
  templateUrl: './info-grupo.html',
})
export class InfoGrupo {
  // Datos de ejemplo: reemplazar por la respuesta de tu servicio HTTP.
  grupo: Grupo = {
    nombre: 'Danza Avanzada',
    grupo: '4E',
    aula: 'I10',
    horario: '08:00-10:00',
    cupo: 20,
  };

  estudiantes: Estudiante[] = [
    { nombre: 'José José José', numeroControl: '23160832', carrera: 'ING. Electrica' },
    { nombre: 'Mario Mario Mario', numeroControl: '23160842', carrera: 'ING. Electrica' },
    { nombre: 'Lucio Lucio Lucio', numeroControl: '23160852', carrera: 'ING. Cívil' },
    { nombre: 'Aldo Aldo Aldo', numeroControl: '23160862', carrera: 'ING. Química' },
    { nombre: 'Maria Maria Maria', numeroControl: '23160872', carrera: 'ING. Sistemas Comp.' },
  ];

  regresar(): void {
    // TODO: navegar a la vista anterior (Router o Location.back()).
  }

  descargarPdf(): void {
    // TODO: llamar al servicio HTTP que genera/descarga el PDF de la lista.
  }

  cerrarSesion(): void {
    // TODO: llamar al servicio de autenticación y redirigir al login.
  }
}