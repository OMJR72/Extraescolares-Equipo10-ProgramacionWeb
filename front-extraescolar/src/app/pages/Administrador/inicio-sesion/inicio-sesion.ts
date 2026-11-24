import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export type RolUsuario = 'alumno' | 'encargado' | 'administrador';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-inicio-sesion',
  styleUrl: './inicio-sesion.css',
  templateUrl: './inicio-sesion.html',
})
export class InicioSesion {
  readonly roles: { valor: RolUsuario; etiqueta: string }[] = [
    { valor: 'alumno', etiqueta: 'Alumno' },
    { valor: 'encargado', etiqueta: 'Encargado' },
    { valor: 'administrador', etiqueta: 'Administrador' },
  ];

  // Rol seleccionado (en el diseño aparece "Administrador" activo)
  readonly rolSeleccionado = signal<RolUsuario>('administrador');

  // Controla si la contraseña se muestra en texto plano
  readonly mostrarContrasena = signal(false);

  readonly formulario = new FormGroup({
    usuario: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    contrasena: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  seleccionarRol(rol: RolUsuario): void {
    this.rolSeleccionado.set(rol);
  }

  alternarMostrarContrasena(evento: Event): void {
    this.mostrarContrasena.set((evento.target as HTMLInputElement).checked);
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const payload = {
      rol: this.rolSeleccionado(),
      ...this.formulario.getRawValue(),
    };

    // TODO: conectar con tu servicio HTTP, por ejemplo:
    // this.authService.login(payload).subscribe({ next: ..., error: ... });
    console.log('Datos de inicio de sesión:', payload);
  }
}