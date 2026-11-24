import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-mi-perfil',
  styleUrl: './mi-perfil.css',
  templateUrl: './mi-perfil.html',
})
export class MiPerfil {
  private readonly fb = inject(FormBuilder).nonNullable;

  editando = false;
  fotoUrl: string | null = null;

  // Valores de ejemplo: reemplazar por los datos del servicio HTTP.
  readonly perfilForm = this.fb.group({
    nombre: ['Bautista Garcia Ever', [Validators.required]],
    telefono: ['9511234567', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    correo: ['EvBaGa@itoaxaca.edu.mx', [Validators.required, Validators.email]],
    correoAdicional: ['', [Validators.email]],
    departamento: ['Ing. Electrica', [Validators.required]],
  });

  constructor() {
    // Solo lectura hasta que se pulse "Editar".
    this.perfilForm.disable();
  }

  activarEdicion(): void {
    this.editando = true;
    this.perfilForm.enable();
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.perfilForm.disable();
    // TODO: restaurar los valores originales (p. ej. volver a pedirlos al servicio).
  }

  onSubmit(): void {
    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      return;
    }

    const datos = this.perfilForm.getRawValue();
    // TODO: enviar `datos` a tu servicio HTTP (PUT/PATCH al perfil).
    console.log('Perfil a guardar:', datos);

    this.editando = false;
    this.perfilForm.disable();
  }

  onFotoSeleccionada(event: Event): void {
    const archivo = (event.target as HTMLInputElement).files?.[0];
    if (!archivo) return;

    if (this.fotoUrl) URL.revokeObjectURL(this.fotoUrl);
    this.fotoUrl = URL.createObjectURL(archivo);
    // TODO: subir `archivo` al servidor (FormData).
  }

  cambiarContrasena(): void {
    // TODO: navegar a la pantalla de cambio de contraseña.
  }

  cerrarSesion(): void {
    // TODO: llamar al servicio de autenticación y redirigir al login.
  }
}