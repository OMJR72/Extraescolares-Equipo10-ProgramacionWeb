import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

type DiaClave = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';
type ModoModal = 'crear' | 'editar';
type CampoFiltro = 'todos' | 'clave' | 'nivel' | 'encargado' | 'genero' | 'lugar';

interface Grupo {
  id: number;
  clave: string;
  nivel: string; // '' = "Ninguno (no tiene)"
  dias: DiaClave[];
  horaInicio: number;
  horaFin: number;
  encargado: string;
  cupoActual: number; // alumnos inscritos
  cupoMinimo: number;
  cupoMaximo: number;
  genero: string;
  lugar: string;
  requisitos: string;
}

const DIAS: { clave: DiaClave; etiqueta: string; nombre: string }[] = [
  { clave: 'lunes', etiqueta: 'Lunes', nombre: 'lunes' },
  { clave: 'martes', etiqueta: 'Martes', nombre: 'martes' },
  { clave: 'miercoles', etiqueta: 'Miércoles', nombre: 'miércoles' },
  { clave: 'jueves', etiqueta: 'Jueves', nombre: 'jueves' },
  { clave: 'viernes', etiqueta: 'Viernes', nombre: 'viernes' },
  { clave: 'sabado', etiqueta: 'Sábado', nombre: 'sábado' },
  { clave: 'domingo', etiqueta: 'Domingo', nombre: 'domingo' },
];

/** Validación a nivel de formulario: días, horas y cupos. */
function validarGrupo(control: AbstractControl): ValidationErrors | null {
  const v = control.value;
  const errores: ValidationErrors = {};

  if (!Object.values(v.dias as Record<string, boolean>).some(Boolean)) {
    errores['sinDias'] = true;
  }
  if (Number(v.horaFin) <= Number(v.horaInicio)) {
    errores['horaInvalida'] = true;
  }
  if (Number(v.cupoMaximo) < Number(v.cupoMinimo)) {
    errores['cupoInvalido'] = true;
  }
  return Object.keys(errores).length ? errores : null;
}

@Component({
  selector: 'app-grupos-actividad',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './grupos-actividad.html',
  styleUrl: './grupos-actividad.css',
})
export class GruposActividad {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  // ===== Parámetros de ruta: /actividades/:categoria/:actividadId/grupos =====
  private readonly params = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  readonly categoria = computed(() => this.params().get('categoria') ?? '');
  readonly actividadId = computed(() => this.params().get('actividadId') ?? '');

  // TODO: obtener el nombre real con el servicio de actividades usando actividadId().
  readonly nombreActividad = signal('Natación');

  // ===== Catálogos =====
  readonly dias = DIAS;
  readonly niveles = ['Básico', 'Intermedio', 'Avanzado'];
  readonly generos = ['Mixto', 'Femenil', 'Varonil'];
  // TODO: cargar encargados desde el servicio de usuarios (cargo = Encargado).
  readonly encargados = signal<string[]>(['Luis Enrique Martínez García']);
  readonly opcionesFiltro: { valor: CampoFiltro; etiqueta: string }[] = [
    { valor: 'todos', etiqueta: 'Todos los campos' },
    { valor: 'clave', etiqueta: 'Clave' },
    { valor: 'nivel', etiqueta: 'Nivel' },
    { valor: 'encargado', etiqueta: 'Encargado' },
    { valor: 'genero', etiqueta: 'Género' },
    { valor: 'lugar', etiqueta: 'Lugar' },
  ];

  // ===== Estado de la UI (signals) =====
  readonly mostrarModal = signal(false);
  readonly mostrarExito = signal(false);
  readonly mostrarConfirmarEliminar = signal(false);
  readonly mensajeExito = signal('');
  readonly modo = signal<ModoModal>('crear');
  readonly intentoEnvio = signal(false);
  readonly menuFiltro = signal(false);

  // ===== Datos, búsqueda, selección y paginación =====
  // TODO: reemplazar por la carga desde el servicio HTTP (grupos de actividadId()).
  readonly grupos = signal<Grupo[]>([
    {
      id: 1, clave: '43SA', nivel: 'Avanzado', dias: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
      horaInicio: 10, horaFin: 12, encargado: 'Luis Enrique Martínez García', cupoActual: 3,
      cupoMinimo: 10, cupoMaximo: 30, genero: 'Mixto', lugar: 'Estadio', requisitos: 'Dominar los 4 estilos de natacion',
    },
    {
      id: 2, clave: '43SB', nivel: 'Avanzado', dias: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
      horaInicio: 10, horaFin: 12, encargado: 'Luis Enrique Martínez García', cupoActual: 30,
      cupoMinimo: 10, cupoMaximo: 30, genero: 'Mixto', lugar: 'Estadio', requisitos: 'Dominar los 4 estilos de natacion',
    },
  ]);

  readonly busqueda = signal('');
  readonly campoFiltro = signal<CampoFiltro>('todos');
  readonly seleccionados = signal<ReadonlySet<number>>(new Set());
  readonly paginaActual = signal(1);
  readonly tamanoPagina = 10;

  readonly gruposFiltrados = computed(() => {
    const texto = this.normalizar(this.busqueda().trim());
    if (!texto) return this.grupos();
    const campo = this.campoFiltro();

    return this.grupos().filter((g) => {
      const valores =
        campo === 'todos'
          ? [g.clave, g.nivel, this.formatearHorario(g), g.encargado, `${g.cupoActual}/${g.cupoMaximo}`, g.genero, g.lugar, g.requisitos]
          : [g[campo]];
      return valores.some((v) => this.normalizar(v).includes(texto));
    });
  });

  readonly totalPaginas = computed(() => Math.max(1, Math.ceil(this.gruposFiltrados().length / this.tamanoPagina)));

  readonly gruposPagina = computed(() => {
    const pagina = Math.min(this.paginaActual(), this.totalPaginas());
    const inicio = (pagina - 1) * this.tamanoPagina;
    return this.gruposFiltrados().slice(inicio, inicio + this.tamanoPagina);
  });

  readonly paginasVisibles = computed(() => {
    const total = this.totalPaginas();
    const actual = Math.min(this.paginaActual(), total);
    let numeros: number[];

    if (total <= 7) {
      numeros = Array.from({ length: total }, (_, i) => i + 1);
    } else {
      numeros = [...new Set([1, 2, actual - 1, actual, actual + 1, total - 1, total])]
        .filter((n) => n >= 1 && n <= total)
        .sort((a, b) => a - b);
    }

    const resultado: { valor: number; puntos: boolean }[] = [];
    let anterior = 0;
    for (const n of numeros) {
      if (n - anterior > 1) resultado.push({ valor: -n, puntos: true });
      resultado.push({ valor: n, puntos: false });
      anterior = n;
    }
    return resultado;
  });

  // Editar y Ver: exactamente un grupo. Eliminar: uno o varios.
  readonly puedeEditar = computed(() => this.seleccionados().size === 1);
  readonly puedeVer = computed(() => this.seleccionados().size === 1);
  readonly puedeEliminar = computed(() => this.seleccionados().size >= 1);

  // ===== Formulario compartido (crear / modificar) =====
  readonly formulario = this.fb.nonNullable.group(
    {
      clave: ['', [Validators.required, Validators.maxLength(10)]],
      dias: this.fb.nonNullable.group({
        lunes: true,
        martes: true,
        miercoles: true,
        jueves: true,
        viernes: true,
        sabado: true,
        domingo: true,
      }),
      horaInicio: [10, [Validators.required, Validators.min(0), Validators.max(23)]],
      horaFin: [11, [Validators.required, Validators.min(0), Validators.max(23)]],
      nivel: [''],
      encargado: ['', Validators.required],
      cupoMinimo: [10, [Validators.required, Validators.min(1)]],
      cupoMaximo: [36, [Validators.required, Validators.min(1)]],
      genero: ['Mixto', Validators.required],
      lugar: ['', Validators.required],
      requisitos: [''],
    },
    { validators: validarGrupo },
  );

  // ===== Búsqueda, filtro y paginación =====
  onBuscar(evento: Event): void {
    this.busqueda.set((evento.target as HTMLInputElement).value);
    this.paginaActual.set(1);
    this.seleccionados.set(new Set());
  }

  alternarMenuFiltro(): void {
    this.menuFiltro.update((v) => !v);
  }

  elegirCampoFiltro(campo: CampoFiltro): void {
    this.campoFiltro.set(campo);
    this.menuFiltro.set(false);
    this.paginaActual.set(1);
    this.seleccionados.set(new Set());
  }

  irAPagina(pagina: number): void {
    this.paginaActual.set(pagina);
  }

  // ===== Selección =====
  estaSeleccionado(id: number): boolean {
    return this.seleccionados().has(id);
  }

  alternarSeleccion(id: number): void {
    this.seleccionados.update((actual) => {
      const nuevo = new Set(actual);
      if (nuevo.has(id)) nuevo.delete(id);
      else nuevo.add(id);
      return nuevo;
    });
  }

  // ===== Presentación =====
  /** Ej.: "lunes-viernes 10:00 - 12:00" o "lunes, miércoles, viernes 08:00 - 09:00". */
  formatearHorario(g: Grupo): string {
    const indices = g.dias.map((d) => DIAS.findIndex((x) => x.clave === d)).sort((a, b) => a - b);
    const consecutivos = indices.every((n, i) => i === 0 || n === indices[i - 1] + 1);
    let texto: string;

    if (indices.length >= 3 && consecutivos) {
      texto = `${DIAS[indices[0]].nombre}-${DIAS[indices[indices.length - 1]].nombre}`;
    } else {
      texto = indices.map((i) => DIAS[i].nombre).join(', ');
    }
    return `${texto} ${this.hora(g.horaInicio)} - ${this.hora(g.horaFin)}`;
  }

  private hora(n: number): string {
    return `${String(n).padStart(2, '0')}:00`;
  }

  private normalizar(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  // ===== Contadores del formulario =====
  ajustar(campo: 'horaInicio' | 'horaFin' | 'cupoMinimo' | 'cupoMaximo', delta: number, min: number, max: number): void {
    const control = this.formulario.controls[campo];
    const valor = Math.min(max, Math.max(min, Number(control.value || 0) + delta));
    control.setValue(valor);
    control.markAsDirty();
  }

  invalido(nombre: 'clave' | 'encargado' | 'lugar'): boolean {
    const c = this.formulario.controls[nombre];
    return c.invalid && (c.touched || this.intentoEnvio());
  }

  // ===== Modal crear / modificar =====
  abrirCrear(): void {
    this.modo.set('crear');
    this.formulario.reset({
      clave: '',
      dias: { lunes: true, martes: true, miercoles: true, jueves: true, viernes: true, sabado: true, domingo: true },
      horaInicio: 10,
      horaFin: 11,
      nivel: '',
      encargado: '',
      cupoMinimo: 10,
      cupoMaximo: 36,
      genero: 'Mixto',
      lugar: '',
      requisitos: '',
    });
    this.intentoEnvio.set(false);
    this.mostrarModal.set(true);
  }

  abrirEditar(): void {
    const grupo = this.grupoSeleccionado();
    if (!grupo) return;

    this.modo.set('editar');
    this.formulario.reset({
      clave: grupo.clave,
      dias: {
        lunes: grupo.dias.includes('lunes'),
        martes: grupo.dias.includes('martes'),
        miercoles: grupo.dias.includes('miercoles'),
        jueves: grupo.dias.includes('jueves'),
        viernes: grupo.dias.includes('viernes'),
        sabado: grupo.dias.includes('sabado'),
        domingo: grupo.dias.includes('domingo'),
      },
      horaInicio: grupo.horaInicio,
      horaFin: grupo.horaFin,
      nivel: grupo.nivel,
      encargado: grupo.encargado,
      cupoMinimo: grupo.cupoMinimo,
      cupoMaximo: grupo.cupoMaximo,
      genero: grupo.genero,
      lugar: grupo.lugar,
      requisitos: grupo.requisitos,
    });
    this.intentoEnvio.set(false);
    this.mostrarModal.set(true);
  }

  cerrarModal(): void {
    this.mostrarModal.set(false);
  }

  onSubmit(): void {
    this.intentoEnvio.set(true);
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const v = this.formulario.getRawValue();
    const datos = {
      clave: v.clave.trim(),
      nivel: v.nivel,
      dias: DIAS.filter((d) => v.dias[d.clave]).map((d) => d.clave),
      horaInicio: Number(v.horaInicio),
      horaFin: Number(v.horaFin),
      encargado: v.encargado,
      cupoMinimo: Number(v.cupoMinimo),
      cupoMaximo: Number(v.cupoMaximo),
      genero: v.genero,
      lugar: v.lugar.trim(),
      requisitos: v.requisitos.trim(),
    };

    // TODO: conectar el servicio HTTP (POST al crear, PUT al modificar, con actividadId()).
    // TODO: validar clave única y que cupoMaximo no sea menor a los alumnos ya inscritos.
    if (this.modo() === 'crear') {
      const id = Math.max(0, ...this.grupos().map((g) => g.id)) + 1;
      this.grupos.update((lista) => [...lista, { id, cupoActual: 0, ...datos }]);
      this.mensajeExito.set('El grupo se creó correctamente');
    } else {
      const grupo = this.grupoSeleccionado();
      if (!grupo) return;
      this.grupos.update((lista) => lista.map((g) => (g.id === grupo.id ? { ...g, ...datos } : g)));
      this.mensajeExito.set('El grupo se modificó correctamente');
    }

    this.cerrarModal();
    this.mostrarExito.set(true);
  }

  // ===== Eliminar =====
  pedirConfirmacionEliminar(): void {
    if (this.puedeEliminar()) this.mostrarConfirmarEliminar.set(true);
  }

  cerrarConfirmarEliminar(): void {
    this.mostrarConfirmarEliminar.set(false);
  }

  confirmarEliminar(): void {
    const ids = this.seleccionados();
    const cantidad = ids.size;

    // TODO: conectar el servicio HTTP (DELETE de cada grupo o endpoint por lote).
    this.grupos.update((lista) => lista.filter((g) => !ids.has(g.id)));
    this.seleccionados.set(new Set());
    this.paginaActual.set(Math.min(this.paginaActual(), this.totalPaginas()));

    this.mostrarConfirmarEliminar.set(false);
    this.mensajeExito.set(cantidad === 1 ? 'El grupo se eliminó correctamente' : 'Los grupos se eliminaron correctamente');
    this.mostrarExito.set(true);
  }

  // ===== Éxito =====
  cerrarExito(): void {
    this.mostrarExito.set(false);
  }

  // ===== Navegación =====
  /** Ojo: abre la vista de información del grupo seleccionado (vista pendiente). */
  verGrupo(): void {
    const grupo = this.grupoSeleccionado();
    if (!grupo) return;
    this.router.navigate(['/actividades', this.categoria(), this.actividadId(), 'grupos', grupo.id]);
  }

  cerrarSesion(): void {
    // TODO: limpiar la sesión con el servicio de autenticación.
    this.router.navigate(['/inicio-sesion']);
  }

  private grupoSeleccionado(): Grupo | undefined {
    if (this.seleccionados().size !== 1) return undefined;
    const [id] = this.seleccionados();
    return this.grupos().find((g) => g.id === id);
  }

  // ===== Teclado: Esc cierra lo que esté abierto (primero lo más superior) =====
  @HostListener('document:keydown.escape')
  alPresionarEsc(): void {
    if (this.mostrarExito()) this.cerrarExito();
    else if (this.mostrarConfirmarEliminar()) this.cerrarConfirmarEliminar();
    else if (this.mostrarModal()) this.cerrarModal();
    else if (this.menuFiltro()) this.menuFiltro.set(false);
  }
}