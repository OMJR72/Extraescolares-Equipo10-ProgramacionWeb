import { Component, HostListener, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export interface Actividad {
  id: number;
  nombre: string;
  creditos: number;
  /** 'Ninguna' significa que está abierta a todos los alumnos */
  carrera: string;
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-actividades-deportivas',
  styleUrl: './actividades-deportivas.css',
  templateUrl: './actividades-deportivas.html',
})
export class ActividadesDeportivas {
  /** Título de la vista */
  readonly titulo = 'Actividades Deportivas';

  /** Categoría que se enviará/consultará en el backend */
  readonly categoria = 'deportivas';

  private readonly router = inject(Router);

  readonly creditosMin = 1;
  readonly creditosMax = 10;

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

  // Datos de ejemplo: reemplázalos con la respuesta de tu servicio HTTP
  readonly actividades = signal<Actividad[]>([
    { id: 1, nombre: 'Natación', creditos: 2, carrera: 'Ninguna' },
    { id: 2, nombre: 'Fútbol', creditos: 2, carrera: 'Ninguna' },
    { id: 3, nombre: 'Baseball', creditos: 2, carrera: 'Ninguna' },
  ]);

  // Paginación (los "..." son solo visuales)
  readonly paginas: (number | string)[] = ['...', 1, 2, 3, 67, 68];
  readonly paginaActual = signal<number>(1);

  // ---------- Estado de las ventanas flotantes ----------
  readonly mostrarModalCrear = signal(false);
  readonly mostrarModalEditar = signal(false);
  readonly mostrarExito = signal(false);
  readonly mensajeExito = signal('¡Actividad Guardada!');

  /** Id de la actividad en edición */
  private actividadEnEdicion: number | null = null;

  // ---------- Formularios ----------
  readonly formularioBusqueda = new FormGroup({
    busqueda: new FormControl('', { nonNullable: true }),
  });

  readonly formulario = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    carrera: new FormControl('Ninguna', { nonNullable: true }),
    creditos: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(this.creditosMin), Validators.max(this.creditosMax)],
    }),
  });

  // ---------- Búsqueda y paginación ----------
  buscar(): void {
    const { busqueda } = this.formularioBusqueda.getRawValue();
    // TODO: conectar con tu servicio HTTP, por ejemplo:
    // this.actividadService.buscar(this.categoria, busqueda, this.paginaActual()).subscribe(...)
    console.log('Buscar actividades:', this.categoria, busqueda);
  }

  irAPagina(pagina: number | string): void {
    if (typeof pagina !== 'number') return;
    this.paginaActual.set(pagina);
    this.buscar();
  }

  filtrar(): void {
    // TODO: abrir menú/opciones de filtro
  }

  verGrupos(actividad: Actividad): void {
    this.router.navigate(['/actividades', this.categoria, actividad.id, 'grupos']);
  }

  eliminar(actividad: Actividad): void {
    // TODO: confirmar y llamar al servicio HTTP de eliminación
    console.log('Eliminar', actividad);
  }

  // ---------- Abrir / cerrar modales ----------
  /** Botón "+" */
  abrirModalCrear(): void {
    this.formulario.reset({ nombre: '', carrera: 'Ninguna', creditos: 1 });
    this.mostrarModalEditar.set(false);
    this.mostrarModalCrear.set(true);
  }

  /** Botón del lápiz */
  abrirModalEditar(actividad: Actividad): void {
    this.actividadEnEdicion = actividad.id;
    this.formulario.reset({
      nombre: actividad.nombre,
      carrera: actividad.carrera,
      creditos: actividad.creditos,
    });
    this.mostrarModalCrear.set(false);
    this.mostrarModalEditar.set(true);
  }

  /** "Cancelar" o "X" */
  cerrarModal(): void {
    this.mostrarModalCrear.set(false);
    this.mostrarModalEditar.set(false);
    this.actividadEnEdicion = null;
  }

  /** Botón "Aceptar" del mensaje de éxito */
  cerrarExito(): void {
    this.mostrarExito.set(false);
  }

  @HostListener('document:keydown.escape')
  alPresionarEscape(): void {
    if (this.mostrarExito()) {
      this.cerrarExito();
    } else if (this.mostrarModalCrear() || this.mostrarModalEditar()) {
      this.cerrarModal();
    }
  }

  // ---------- Contador de créditos ----------
  incrementarCreditos(): void {
    const { creditos } = this.formulario.controls;
    creditos.setValue(Math.min(this.creditosMax, (Number(creditos.value) || 0) + 1));
  }

  decrementarCreditos(): void {
    const { creditos } = this.formulario.controls;
    creditos.setValue(Math.max(this.creditosMin, (Number(creditos.value) || 0) - 1));
  }

  // ---------- Envío ----------
  /** Botón "Crear" / "Guardar" de la ventana flotante */
  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const payload = { ...this.formulario.getRawValue(), categoria: this.categoria };
    const editando = this.mostrarModalEditar();

    // TODO: conectar con tu servicio HTTP; muestra el éxito dentro del next:
    // const peticion = editando
    //   ? this.actividadService.actualizar(this.actividadEnEdicion!, payload)
    //   : this.actividadService.crear(payload);
    // peticion.subscribe({ next: () => { ... }, error: (err) => { ... } });
    console.log(editando ? 'Modificar actividad:' : 'Crear actividad:', this.actividadEnEdicion, payload);

    this.mensajeExito.set(editando ? '¡Actividad Guardada!' : '¡Actividad Creada!');
    this.cerrarModal();
    this.mostrarExito.set(true);
  }

  cerrarSesion(): void {
    // TODO: limpiar sesión y redirigir al inicio de sesión
  }
}