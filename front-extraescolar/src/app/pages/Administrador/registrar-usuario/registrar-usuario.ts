import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export type Cargo = 'Alumno' | 'Encargado' | 'Administrador';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-registrar-usuario',
  styleUrl: './registrar-usuario.css',
  templateUrl: './registrar-usuario.html',
})
export class RegistrarUsuario {
  private readonly destroyRef = inject(DestroyRef);

  readonly cargos: Cargo[] = ['Alumno', 'Encargado', 'Administrador'];

  // Carreras de ejemplo: reemplázalas con las de tu servicio
  readonly carreras: string[] = [
    'Ninguna',
    'Ing. Civil',
    'Ing. Industrial',
    'Ing. en Sistemas Computacionales',
    'Ing. Eléctrica',
    'Ing. Mecánica',
    'Lic. Administracion de Empresas',
  ];

  readonly formulario = new FormGroup({
    cargo: new FormControl<Cargo>('Alumno', { nonNullable: true, validators: [Validators.required] }),
    nombres: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    apellidoPaterno: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    apellidoMaterno: new FormControl('', { nonNullable: true }),
    genero: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    numeroControl: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    carrera: new FormControl('Ninguna', { nonNullable: true }),
    correoInstitucional: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    correoOpcional: new FormControl('', { nonNullable: true, validators: [Validators.email] }),
    numeroTelefonico: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{10}$/)],
    }),
    contrasena: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  constructor() {
    // Número de control y carrera solo aplican a alumnos
    this.formulario.controls.cargo.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cargo) => this.ajustarCamposPorCargo(cargo));
    this.ajustarCamposPorCargo(this.formulario.controls.cargo.value);
  }

  private ajustarCamposPorCargo(cargo: Cargo): void {
    const { numeroControl, carrera } = this.formulario.controls;
    if (cargo === 'Alumno') {
      numeroControl.enable();
      carrera.enable();
    } else {
      numeroControl.reset('');
      carrera.reset('Ninguna');
      numeroControl.disable();
      carrera.disable();
    }
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const payload = this.formulario.getRawValue();

    // TODO: conectar con tu servicio HTTP, por ejemplo:
    // this.usuarioService.crear(payload).subscribe({ next: ..., error: ... });
    console.log('Registrar usuario:', payload);
  }

  cerrarSesion(): void {
    // TODO: limpiar sesión y redirigir al inicio de sesión
  }
}