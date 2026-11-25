import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-editar-foto',
  styleUrl: './editar-foto.css',
  templateUrl: './editar-foto.html',
})
export class EditarFoto {
  preview: string | null = null;
  nombreArchivo = '';
  mensaje = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (!archivo) {
      return;
    }

    if (!archivo.type.startsWith('image/')) {
      this.mensaje = 'Selecciona un archivo de imagen válido.';
      return;
    }

    this.nombreArchivo = archivo.name;

    const lector = new FileReader();
    lector.onload = () => {
      this.preview = typeof lector.result === 'string' ? lector.result : null;
      this.mensaje = 'Vista previa lista.';
    };
    lector.readAsDataURL(archivo);
  }

  guardar(): void {
    if (!this.preview) {
      this.mensaje = 'Selecciona una imagen antes de guardar.';
      return;
    }

    this.mensaje = 'Foto guardada localmente (demo).';
  }
}
