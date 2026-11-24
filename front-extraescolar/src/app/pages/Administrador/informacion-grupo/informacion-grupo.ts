import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

type Campo = 'todos' | 'nombre' | 'numeroControl' | 'carrera';
type ModalActivo = 'inscribir' | 'encargado' | null;
type ModoTabla = 'quitar' | 'inscribir' | 'asignar';

interface Persona {
  id: number;
  nombre: string;
  numeroControl: string;
  telefono: string;
  email: string;
  carrera?: string;
}

interface Confirmacion {
  tipo: 'alumno' | 'encargado';
  persona: Persona;
}

/** Lista con búsqueda, filtro por campo y paginación (reutilizada en la vista y en los 2 modales). */
export class ListaPaginada {
  readonly tamanoPagina = 5;
  readonly campos: { valor: Campo; etiqueta: string }[] = [
    { valor: 'todos', etiqueta: 'Todos los campos' },
    { valor: 'nombre', etiqueta: 'Nombre' },
    { valor: 'numeroControl', etiqueta: 'N. de control' },
    { valor: 'carrera', etiqueta: 'Carrera' },
  ];

  busqueda = signal('');
  campo = signal<Campo>('todos');
  pagina = signal(1);
  menuAbierto = signal(false);

  private readonly origen: () => Persona[];

  constructor(origen: () => Persona[]) {
    this.origen = origen;
  }

  filtrados = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    const lista = this.origen();
    if (!texto) return lista;
    const campo = this.campo();
    return lista.filter((p) => {
      const valores =
        campo === 'todos'
          ? [p.nombre, p.numeroControl, p.telefono, p.email, p.carrera ?? '']
          : [String(p[campo] ?? '')];
      return valores.some((v) => v.toLowerCase().includes(texto));
    });
  });

  totalPaginas = computed(() => Math.max(1, Math.ceil(this.filtrados().length / this.tamanoPagina)));
  paginaActual = computed(() => Math.min(this.pagina(), this.totalPaginas()));

  visibles = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.tamanoPagina;
    return this.filtrados().slice(inicio, inicio + this.tamanoPagina);
  });

  /** Números de página con "…" en los saltos (ej. 1 2 3 … 67 68). */
  paginas = computed<(number | '…')[]>(() => {
    const total = this.totalPaginas();
    const actual = this.paginaActual();
    const base = [1, 2, actual - 1, actual, actual + 1, total - 1, total]
      .filter((n) => n >= 1 && n <= total);
    const unicas = [...new Set(base)].sort((a, b) => a - b);
    const resultado: (number | '…')[] = [];
    unicas.forEach((n, i) => {
      if (i > 0 && n - unicas[i - 1] > 1) resultado.push('…');
      resultado.push(n);
    });
    return resultado;
  });

  buscar(texto: string): void {
    this.busqueda.set(texto);
    this.pagina.set(1);
  }

  elegirCampo(campo: Campo): void {
    this.campo.set(campo);
    this.menuAbierto.set(false);
    this.pagina.set(1);
  }

  irA(n: number | '…'): void {
    if (typeof n === 'number') this.pagina.set(n);
  }

  reiniciar(): void {
    this.busqueda.set('');
    this.campo.set('todos');
    this.pagina.set(1);
    this.menuAbierto.set(false);
  }
}

@Component({
  selector: 'app-informacion-grupo',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink],
  templateUrl: './informacion-grupo.html',
  styleUrl: './informacion-grupo.css',
})
export class InformacionGrupo {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // Parámetros de ruta: /actividades/:categoria/:actividadId/grupos/:grupoId
  readonly categoria = this.route.snapshot.paramMap.get('categoria') ?? '';
  readonly actividadId = this.route.snapshot.paramMap.get('actividadId') ?? '';
  readonly grupoId = this.route.snapshot.paramMap.get('grupoId') ?? '';

  // TODO: cargar el grupo (clave y nombre de la actividad) desde el servicio HTTP con grupoId.
  grupo = signal({ clave: '43SA', actividad: 'Natación' });

  // TODO: reemplazar los datos de ejemplo por los del servicio HTTP.
  estudiantes = signal<Persona[]>(
    this.crearAlumnos(['Ruben Doblas Gundersen', 'Ana Lucía Martínez Ruiz'], 1),
  );
  encargado = signal<Persona | null>({
    id: 100,
    nombre: 'Ruben Doblas Gundersen',
    numeroControl: '23155776',
    telefono: '9531670988',
    email: 'ruben@itoxaca.edu.mx',
  });

  // Catálogos para los modales (el servicio debe excluir a los ya inscritos/asignados).
  private readonly catalogoAlumnos = signal<Persona[]>(
    this.crearAlumnos(
      [
        'Carlos Hernández López',
        'María Fernanda Cruz Santiago',
        'Luis Ángel Ramírez Torres',
        'Sofía Guadalupe Vásquez Ortiz',
        'Diego Antonio Mendoza Reyes',
        'Valeria Jiménez Cruz',
        'Jorge Alberto Pérez Sánchez',
        'Daniela Ruiz Morales',
      ],
      10,
    ),
  );
  private readonly catalogoEncargados = signal<Persona[]>([
    this.crearEncargado(201, 'Patricia Gómez Hernández', '22110045'),
    this.crearEncargado(202, 'Roberto Cruz Matías', '21100872'),
    this.crearEncargado(203, 'Elena Santiago Pérez', '20090311'),
    this.crearEncargado(204, 'Miguel Ángel Torres Luna', '19080527'),
  ]);

  alumnosDisponibles = computed(() => {
    const inscritos = new Set(this.estudiantes().map((e) => e.id));
    return this.catalogoAlumnos().filter((a) => !inscritos.has(a.id));
  });
  encargadosDisponibles = computed(() => {
    const actual = this.encargado()?.id;
    return this.catalogoEncargados().filter((e) => e.id !== actual);
  });

  // Listas con búsqueda / filtro / paginación
  listaEstudiantes = new ListaPaginada(() => this.estudiantes());
  listaInscribir = new ListaPaginada(() => this.alumnosDisponibles());
  listaEncargados = new ListaPaginada(() => this.encargadosDisponibles());

  // Estado de la UI
  modalActivo = signal<ModalActivo>(null);
  confirmacion = signal<Confirmacion | null>(null);
  mostrarExito = signal(false);
  mensajeExito = signal('');

  // ---------- Navegación ----------
  volver(): void {
    this.router.navigate(['/actividades', this.categoria, this.actividadId, 'grupos']);
  }

  cerrarSesion(): void {
    // TODO: conectar con el servicio de autenticación.
    this.router.navigate(['/']);
  }

  // ---------- Modales ----------
  abrirModal(modal: Exclude<ModalActivo, null>): void {
    if (modal === 'inscribir') this.listaInscribir.reiniciar();
    else this.listaEncargados.reiniciar();
    this.modalActivo.set(modal);
  }

  cerrarModal(): void {
    this.modalActivo.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.confirmacion()) this.confirmacion.set(null);
    else if (this.mostrarExito()) this.aceptarExito();
    else if (this.modalActivo()) this.cerrarModal();
  }

  // ---------- Acciones de fila ----------
  accionFila(modo: ModoTabla, persona: Persona): void {
    switch (modo) {
      case 'quitar':
        this.confirmacion.set({ tipo: 'alumno', persona });
        break;
      case 'inscribir':
        this.inscribirAlumno(persona);
        break;
      case 'asignar':
        this.asignarEncargado(persona);
        break;
    }
  }

  quitarEncargado(): void {
    const actual = this.encargado();
    if (actual) this.confirmacion.set({ tipo: 'encargado', persona: actual });
  }

  private inscribirAlumno(alumno: Persona): void {
    // TODO: conectar con el servicio HTTP (POST inscripción del alumno al grupo).
    this.estudiantes.update((lista) => [...lista, alumno]);
    this.modalActivo.set(null);
    this.notificarExito('El alumno fue inscrito correctamente.');
  }

  private asignarEncargado(encargado: Persona): void {
    // TODO: conectar con el servicio HTTP (PUT encargado del grupo).
    this.encargado.set(encargado);
    this.modalActivo.set(null);
    this.notificarExito('El encargado fue asignado correctamente.');
  }

  confirmarQuitar(): void {
    const c = this.confirmacion();
    if (!c) return;
    // TODO: conectar con el servicio HTTP (DELETE inscripción / encargado).
    if (c.tipo === 'alumno') {
      this.estudiantes.update((lista) => lista.filter((e) => e.id !== c.persona.id));
      this.notificarExito('El alumno fue retirado del grupo.');
    } else {
      this.encargado.set(null);
      this.notificarExito('El encargado fue retirado del grupo.');
    }
    this.confirmacion.set(null);
  }

  private notificarExito(mensaje: string): void {
    this.mensajeExito.set(mensaje);
    this.mostrarExito.set(true);
  }

  aceptarExito(): void {
    this.mostrarExito.set(false);
  }

  // ---------- Utilidades de datos de ejemplo ----------
  private crearAlumnos(nombres: string[], idInicial: number): Persona[] {
    return nombres.map((nombre, i) => ({
      id: idInicial + i,
      nombre,
      numeroControl: String(23155776 - i * 137),
      telefono: '9531670988',
      email: 'ruben@itoxaca.edu.mx',
      carrera: 'Ingeniería en Sistemas Computacionales',
    }));
  }

  private crearEncargado(id: number, nombre: string, numeroControl: string): Persona {
    return { id, nombre, numeroControl, telefono: '9531670988', email: 'ruben@itoxaca.edu.mx' };
  }
}