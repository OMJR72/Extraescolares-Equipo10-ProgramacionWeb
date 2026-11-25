import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface GrupoInfo {
  actividad: string;
  encargado: string;
  grupo: string;
  aula: string;
  horario: string;
  cupo: string;
}

@Component({
  imports: [CommonModule],
  selector: 'app-mi-grupo',
  styleUrl: './mi-grupo.css',
  templateUrl: './mi-grupo.html',
})
export class MiGrupo {
  readonly grupo: GrupoInfo = {
    actividad: 'Ballet',
    encargado: 'Ana Rojas',
    grupo: 'Grupo 02',
    aula: 'Auditorio B',
    horario: 'Lunes 16:00 - 17:30',
    cupo: '18/20 estudiantes'
  };

  mensaje = '';

  descargarHorario(): void {
    const blob = this.crearPdf();
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');

    enlace.href = url;
    enlace.download = 'horario-mi-grupo.pdf';
    enlace.click();

    setTimeout(() => URL.revokeObjectURL(url), 0);
    this.mensaje = 'Horario descargado correctamente.';
  }

  private crearPdf(): Blob {
    const lineas = [
      'Horario de actividad complementaria',
      `Actividad: ${this.grupo.actividad}`,
      `Encargado: ${this.grupo.encargado}`,
      `Grupo: ${this.grupo.grupo}`,
      `Aula: ${this.grupo.aula}`,
      `Horario: ${this.grupo.horario}`,
      `Cupo: ${this.grupo.cupo}`
    ].map((linea) => this.quitarAcentos(linea));

    const contenido = lineas.map((linea) => `(${this.escapePdf(linea)}) Tj`).join('\nT*\n');
    const stream = `BT\n/F1 12 Tf\n50 780 Td\n20 TL\n${contenido}\nET`;

    const objetos = [
      '<< /Type /Catalog /Pages 2 0 R >>',
      '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
      '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
      `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'
    ];

    let pdf = '%PDF-1.4\n';
    const desplazamientos: number[] = [];

    objetos.forEach((objeto, indice) => {
      desplazamientos.push(pdf.length);
      pdf += `${indice + 1} 0 obj\n${objeto}\nendobj\n`;
    });

    const inicioXref = pdf.length;
    pdf += `xref\n0 ${objetos.length + 1}\n0000000000 65535 f \n`;

    desplazamientos.forEach((desplazamiento) => {
      pdf += `${desplazamiento.toString().padStart(10, '0')} 00000 n \n`;
    });

    pdf += `trailer\n<< /Size ${objetos.length + 1} /Root 1 0 R >>\nstartxref\n${inicioXref}\n%%EOF`;

    return new Blob([pdf], { type: 'application/pdf' });
  }

  private quitarAcentos(valor: string): string {
    return valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  private escapePdf(valor: string): string {
    return valor.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  }
}
