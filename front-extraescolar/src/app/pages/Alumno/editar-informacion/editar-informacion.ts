import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-editar-informacion',
  styleUrl: './editar-informacion.css',
  templateUrl: './editar-informacion.html',
})
export class EditarInformacion {
  telefono = '71234567';
  correoAdicional = 'juan.perez@correo.com';
  mensaje = '';

  guardar(): void {
    this.mensaje = 'Información guardada localmente (demo).';
  }
}
