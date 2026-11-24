import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type EstadoActividad = 'Inscribirme' | 'Inscrito' | 'Lleno';

interface ActividadItem {
  actividad: string;
  creditos: number;
  carrera: string;
  encargado: string;
  cupos: string;
  horario: string;
  estado: EstadoActividad;
}

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-actividades',
  styleUrl: './actividades.css',
  templateUrl: './actividades.html',
})
export class Actividades {
  readonly pageSize = 5;

  searchTerm = '';
  currentPage = 1;

  actividades: ActividadItem[] = [
    {
      actividad: 'Ballet',
      creditos: 2,
      carrera: 'Todas',
      encargado: 'Ana Rojas',
      cupos: '6/20',
      horario: 'Lunes 16:00 - 17:30',
      estado: 'Inscribirme'
    },
    {
      actividad: 'Fútbol',
      creditos: 3,
      carrera: 'Todas',
      encargado: 'Carlos Méndez',
      cupos: '0/22',
      horario: 'Martes 17:00 - 18:30',
      estado: 'Lleno'
    },
    {
      actividad: 'Coro',
      creditos: 2,
      carrera: 'Todas',
      encargado: 'Lucía Torres',
      cupos: '12/30',
      horario: 'Miércoles 15:00 - 16:00',
      estado: 'Inscrito'
    },
    {
      actividad: 'Ajedrez',
      creditos: 1,
      carrera: 'Ingeniería',
      encargado: 'Mario Gil',
      cupos: '9/16',
      horario: 'Jueves 16:00 - 17:00',
      estado: 'Inscribirme'
    },
    {
      actividad: 'Pintura',
      creditos: 2,
      carrera: 'Arquitectura',
      encargado: 'Sofía Vega',
      cupos: '4/18',
      horario: 'Viernes 14:00 - 16:00',
      estado: 'Inscribirme'
    },
    {
      actividad: 'Natación',
      creditos: 3,
      carrera: 'Todas',
      encargado: 'Diego Paredes',
      cupos: '0/15',
      horario: 'Lunes 07:00 - 08:00',
      estado: 'Lleno'
    },
    {
      actividad: 'Teatro',
      creditos: 2,
      carrera: 'Comunicación',
      encargado: 'Paola Ruiz',
      cupos: '10/24',
      horario: 'Martes 18:00 - 19:30',
      estado: 'Inscribirme'
    },
    {
      actividad: 'Robótica',
      creditos: 4,
      carrera: 'Ingeniería',
      encargado: 'Iván Castro',
      cupos: '3/12',
      horario: 'Miércoles 17:00 - 19:00',
      estado: 'Inscribirme'
    },
    {
      actividad: 'Yoga',
      creditos: 1,
      carrera: 'Todas',
      encargado: 'Elena Peña',
      cupos: '15/20',
      horario: 'Jueves 08:00 - 09:00',
      estado: 'Inscribirme'
    },
    {
      actividad: 'Fotografía',
      creditos: 2,
      carrera: 'Arquitectura',
      encargado: 'Andrés León',
      cupos: '7/18',
      horario: 'Viernes 16:00 - 18:00',
      estado: 'Inscribirme'
    },
    {
      actividad: 'Banda',
      creditos: 3,
      carrera: 'Todas',
      encargado: 'Rosa Campos',
      cupos: '11/25',
      horario: 'Sábado 09:00 - 12:00',
      estado: 'Inscribirme'
    },
    {
      actividad: 'Voleibol',
      creditos: 2,
      carrera: 'Todas',
      encargado: 'Luis Herrera',
      cupos: '5/20',
      horario: 'Sábado 15:00 - 17:00',
      estado: 'Inscribirme'
    }
  ];

  get filteredActividades(): ActividadItem[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.actividades;
    }

    return this.actividades.filter((item) =>
      [item.actividad, item.carrera, item.encargado, item.horario].some((value) =>
        value.toLowerCase().includes(term)
      )
    );
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredActividades.length / this.pageSize));
  }

  get pagedActividades(): ActividadItem[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredActividades.slice(start, start + this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }

  estadoClass(estado: EstadoActividad): string {
    if (estado === 'Inscrito') {
      return 'estado-inscrito';
    }

    if (estado === 'Lleno') {
      return 'estado-lleno';
    }

    return 'estado-inscribir';
  }

  inscribir(actividad: ActividadItem): void {
    if (actividad.estado !== 'Inscribirme') {
      return;
    }

    actividad.estado = 'Inscrito';
  }

  irAPagina(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
  }
}
