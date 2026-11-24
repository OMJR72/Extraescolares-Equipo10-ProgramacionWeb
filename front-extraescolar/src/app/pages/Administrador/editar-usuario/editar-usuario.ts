import { Component, DestroyRef, HostListener, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export type Cargo = 'Alumno' | 'Encargado' | 'Administrador';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-editar-usuario',
  styleUrl: './editar-usuario.css',
  templateUrl: './editar-usuario.html',
})
export class EditarUsuario {
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
    'Arquitectura',
  ];

  // ---------- Estado de la UI ----------
  /** Menú desplegable del split button de cargo */
  readonly menuCargoAbierto = signal(false);
  /** Ventana de confirmación (solo se usa si requiereConfirmacion = true) */
  readonly mostrarModal = signal(false);
  /** Ventana "¡Usuario Guardado!" */
  readonly mostrarExito = signal(false);
  /** Cargo actual (para mostrar/ocultar Carrera en la plantilla) */
  readonly cargoActual = signal<Cargo>('Alumno');

  /**
   * false: "Guardar" abre directamente la ventana de éxito (como en el diseño).
   * true: "Guardar" abre primero una ventana de confirmación con "Cancelar" y "X".
   */
  readonly requiereConfirmacion = false;

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
    // En edición la contraseña es opcional: solo se envía si se escribe una nueva
    contrasena: new FormControl('', { nonNullable: true, validators: [Validators.minLength(6)] }),
  });

  constructor() {
    this.formulario.controls.cargo.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cargo) => this.ajustarCamposPorCargo(cargo));
    this.ajustarCamposPorCargo(this.formulario.controls.cargo.value);

    // TODO: cargar el usuario a editar (por ejemplo, con el id de la ruta):
    // this.usuarioService.obtener(id).subscribe((u) => this.formulario.patchValue(u));
  }

  /** Carrera solo aplica (y es visible) cuando el cargo es Alumno */
  private ajustarCamposPorCargo(cargo: Cargo): void {
    this.cargoActual.set(cargo);
    const { carrera } = this.formulario.controls;
    if (cargo === 'Alumno') {
      carrera.enable({ emitEvent: false });
    } else {
      carrera.reset('Ninguna', { emitEvent: false });
      carrera.disable({ emitEvent: false });
    }
  }

  // ---------- Split button de cargo ----------
  alternarMenuCargo(): void {
    this.menuCargoAbierto.update((abierto) => !abierto);
  }

  seleccionarCargo(cargo: Cargo): void {
    this.formulario.controls.cargo.setValue(cargo);
    this.menuCargoAbierto.set(false);
  }

  @HostListener('document:click', ['$event'])
  cerrarMenuAlHacerClicAfuera(evento: Event): void {
    const objetivo = evento.target as HTMLElement | null;
    if (this.menuCargoAbierto() && !objetivo?.closest('.split')) {
      this.menuCargoAbierto.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  alPresionarEscape(): void {
    this.menuCargoAbierto.set(false);
    if (this.mostrarModal()) {
      this.cerrarModal();
    }
  }

  // ---------- Envío ----------
  /** Click en "Guardar" */
  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    if (this.requiereConfirmacion) {
      this.mostrarModal.set(true);
      return;
    }

    this.guardar();
  }

  /** Botón "Confirmar" de la ventana de confirmación */
  confirmarGuardado(): void {
    this.mostrarModal.set(false);
    this.guardar();
  }

  private guardar(): void {
    const payload = this.formulario.getRawValue();

    // TODO: conectar con tu servicio HTTP; muestra el éxito dentro del next:
    // this.usuarioService.actualizar(id, payload).subscribe({
    //   next: () => this.mostrarExito.set(true),
    //   error: (err) => { ... },
    // });
    console.log('Guardar usuario:', payload);
    this.mostrarExito.set(true);
  }

  cerrarModal(): void {
    this.mostrarModal.set(false);
  }

  /** Botón "Aceptar" del mensaje de éxito */
  cerrarExito(): void {
    this.mostrarExito.set(false);
    // TODO: navegar de regreso a "Administrar Usuario"
  }

  cerrarSesion(): void {
    // TODO: limpiar sesión y redirigir al inicio de sesión
  }
}