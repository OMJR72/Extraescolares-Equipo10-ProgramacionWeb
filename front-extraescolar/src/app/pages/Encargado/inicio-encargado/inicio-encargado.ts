import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type Rol = 'alumno' | 'encargado' | 'administrador';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-inicio-encargado',
  styleUrl: './inicio-sesion.css',
  templateUrl: './inicio-sesion.html',
})
export class InicioEncargado {
  private readonly fb = inject(FormBuilder);
  // private readonly authService = inject(AuthService); // <- conectar servicio HTTP aquí

  readonly roles: { valor: Rol; etiqueta: string }[] = [
    { valor: 'alumno', etiqueta: 'Alumno' },
    { valor: 'encargado', etiqueta: 'Encargado' },
    { valor: 'administrador', etiqueta: 'Administrador' },
  ];

  rol: Rol = 'encargado';
  mostrarContrasena = false;
  cargando = false;
  error = '';

  readonly formulario = this.fb.nonNullable.group({
    usuario: ['', [Validators.required]],
    contrasena: ['', [Validators.required]],
  });

  seleccionarRol(rol: Rol): void {
    this.rol = rol;
  }

  alternarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  onSubmit(): void {
    this.error = '';

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.error = 'Escribe tu usuario y contraseña.';
      return;
    }

    const credenciales = {
      ...this.formulario.getRawValue(),
      rol: this.rol,
    };

    this.cargando = true;

    // TODO: reemplazar por la llamada HTTP real, por ejemplo:
    // this.authService.iniciarSesion(credenciales).subscribe({
    //   next: () => { this.cargando = false; /* navegar con Router */ },
    //   error: () => { this.cargando = false; this.error = 'Usuario o contraseña incorrectos.'; },
    // });
    console.log('Credenciales listas para enviar:', credenciales);
    this.cargando = false;
  }
}