import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-recuperar-contrasena',
  styleUrl: './recuperar-contrasena.css',
  templateUrl: './recuperar-contrasena.html',
})
export class RecuperarContrasena {
  private readonly fb = inject(FormBuilder);
  private readonly location = inject(Location);
  // private readonly authService = inject(AuthService); // <- conectar servicio HTTP aquí

  cargando = false;
  error = '';

  readonly formulario = this.fb.nonNullable.group({
    clave: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
  });

  onSubmit(): void {
    this.error = '';

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.error = 'Escribe la clave numérica que llegó a tu correo.';
      return;
    }

    const { clave } = this.formulario.getRawValue();
    this.cargando = true;

    // TODO: reemplazar por la llamada HTTP real, por ejemplo:
    // this.authService.validarClaveRecuperacion(clave).subscribe({
    //   next: () => { this.cargando = false; /* navegar a "nueva contraseña" con Router */ },
    //   error: () => { this.cargando = false; this.error = 'La clave es incorrecta o ya venció.'; },
    // });
    console.log('Clave lista para enviar:', clave);
    this.cargando = false;
  }

  volver(): void {
    this.location.back();
  }
}