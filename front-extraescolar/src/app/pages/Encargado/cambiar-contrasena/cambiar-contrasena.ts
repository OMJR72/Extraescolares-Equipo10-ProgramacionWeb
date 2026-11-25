import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

function contrasenasCoinciden(control: AbstractControl): ValidationErrors | null {
  const nueva = control.get('nuevaContrasena')?.value;
  const confirmar = control.get('confirmarContrasena')?.value;
  return nueva === confirmar ? null : { noCoinciden: true };
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-cambiar-contrasena',
  styleUrl: './cambiar-contrasena.css',
  templateUrl: './cambiar-contrasena.html',
})
export class CambiarContrasena {
  private readonly fb = inject(FormBuilder).nonNullable;

  readonly passwordForm = this.fb.group(
    {
      nuevaContrasena: ['', [Validators.required, Validators.minLength(8)]],
      confirmarContrasena: ['', [Validators.required]],
    },
    { validators: contrasenasCoinciden },
  );

  get nuevaContrasena() {
    return this.passwordForm.controls.nuevaContrasena;
  }

  get confirmarContrasena() {
    return this.passwordForm.controls.confirmarContrasena;
  }

  onSubmit(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { nuevaContrasena } = this.passwordForm.getRawValue();
    // TODO: enviar `nuevaContrasena` a tu servicio HTTP (PUT/PATCH de la contraseña).
    console.log('Cambio de contraseña listo para enviar');
  }

  regresar(): void {
    // TODO: navegar a Mi Perfil (Router o Location.back()).
  }

  cerrarSesion(): void {
    // TODO: llamar al servicio de autenticación y redirigir al login.
  }
}