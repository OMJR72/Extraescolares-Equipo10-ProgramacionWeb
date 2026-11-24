import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login')
        .then(m => m.LoginComponent)
  },

  {
    path: 'alumno',
    loadComponent: () =>
      import('./components/Alumno/alumno-layout/alumno-layout')
        .then(m => m.AlumnoLayoutComponent),

    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        loadComponent: () =>
          import('./pages/Alumno/inicio-alumno/inicio-alumno')
            .then(m => m.InicioAlumnoComponent)
      },
      {
        path: 'actividades',
        loadComponent: () =>
          import('./pages/Alumno/actividades/actividades')
            .then(m => m.Actividades)
      },
      {
        path: 'grupo',
        loadComponent: () =>
          import('./pages/Alumno/mi-grupo/mi-grupo')
            .then(m => m.MiGrupo)
      },
      {
        path: 'mi-grupo',
        loadComponent: () =>
          import('./pages/Alumno/mi-grupo/mi-grupo')
            .then(m => m.MiGrupo)
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./pages/Alumno/mi-perfil/mi-perfil')
            .then(m => m.MiPerfil)
      },
      {
        path: 'mi-perfil',
        loadComponent: () =>
          import('./pages/Alumno/mi-perfil/mi-perfil')
            .then(m => m.MiPerfil)
      },
      {
        path: 'editar-informacion',
        loadComponent: () =>
          import('./pages/Alumno/editar-informacion/editar-informacion')
            .then(m => m.EditarInformacion)
      },
      {
        path: 'cambiar-contrasena',
        loadComponent: () =>
          import('./pages/Alumno/cambiar-contrasena/cambiar-contrasena')
            .then(m => m.CambiarContrasena)
      },
      {
        path: 'editar-foto',
        loadComponent: () =>
          import('./pages/Alumno/editar-foto/editar-foto')
            .then(m => m.EditarFoto)
      },
      {
        path: 'foro',
        loadComponent: () =>
          import('./pages/Alumno/foro/foro')
            .then(m => m.Foro)
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];