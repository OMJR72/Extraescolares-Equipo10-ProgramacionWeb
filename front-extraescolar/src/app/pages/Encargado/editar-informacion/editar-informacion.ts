import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-editar-informacion',
  styleUrl: './editar-informacion.css',
  templateUrl: './editar-informacion.html',
})
export class EditarInformacion {
  private readonly fb = inject(FormBuilder).nonNullable;

  readonly infoForm = this.fb.group({
    telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    correoAdicional: ['', [Validators.required, Validators.email]],
  });

  get telefono() {
    return this.infoForm.controls.telefono;
  }

  get correoAdicional() {
    return this.infoForm.controls.correoAdicional;
  }

  onSubmit(): void {
    if (this.infoForm.invalid) {
      this.infoForm.markAllAsTouched();
      return;
    }

    const datos = this.infoForm.getRawValue();
    // TODO: enviar `datos` a tu servicio HTTP (PUT/PATCH de la información adicional).
    console.log('Información a guardar:', datos);
  }

  regresar(): void {
    // TODO: navegar a Mi Perfil (Router o Location.back()).
  }

  cerrarSesion(): void {
    // TODO: llamar al servicio de autenticación y redirigir al login.
  }
}