import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Aviso {
  autor: string;
  contenido: string;
  fecha: string;
}

@Component({
  imports: [CommonModule],
  selector: 'app-foro',
  styleUrl: './foro.css',
  templateUrl: './foro.html',
})
export class Foro {
  readonly actividad = 'Ballet';

  readonly avisos: Aviso[] = [
    {
      autor: 'Ana Rojas',
      contenido: 'El próximo ensayo se realizará en el Auditorio B a las 16:00. Por favor llegar 10 minutos antes.',
      fecha: '18/11/2026'
    },
    {
      autor: 'Lucía Torres',
      contenido: 'Se recuerda traer ropa cómoda y zapatos de ballet para la sesión de práctica.',
      fecha: '15/11/2026'
    },
    {
      autor: 'Coordinación',
      contenido: 'La presentación de fin de semestre será el 12 de diciembre. Más detalles en la próxima reunión.',
      fecha: '10/11/2026'
    },
    {
      autor: 'Ana Rojas',
      contenido: 'Se ha actualizado el horario del grupo. Pueden descargarlo desde la sección Mi grupo.',
      fecha: '05/11/2026'
    }
  ];
}
