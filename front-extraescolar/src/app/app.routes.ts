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
    path: 'admin/inicio-sesion',
    loadComponent: () =>
      import('./pages/Administrador/inicio-sesion/inicio-sesion')
        .then(m => m.InicioSesion)
  },
  {
  path: 'admin/administrar-usuario',
  loadComponent: () =>
    import('./pages/Administrador/administrar-usuario/administrar-usuario')
      .then(m => m.AdministrarUsuario)
},
{
  path: 'admin/registrar-usuario',
  loadComponent: () =>
    import('./pages/Administrador/registrar-usuario/registrar-usuario')
      .then(m => m.RegistrarUsuario)
},
{
  path: 'admin/editar-usuario',
  loadComponent: () =>
    import('./pages/Administrador/editar-usuario/editar-usuario')
      .then(m => m.EditarUsuario)
},
{
  path: 'admin/administrar-actividades',
  loadComponent: () =>
    import('./pages/Administrador/administrar-actividades/administrar-actividades')
      .then(m => m.AdministrarActividades)
},
{
  path: 'admin/actividades-academicas',
  loadComponent: () =>
    import('./pages/Administrador/actividades-academicas/actividades-academicas')
      .then(m => m.ActividadesAcademicas)
},
{
  path: 'admin/actividades-culturales',
  loadComponent: () =>
    import('./pages/Administrador/actividades-culturales/actividades-culturales')
      .then(m => m.ActividadesCulturales)
},
{
  path: 'admin/actividades-deportivas',
  loadComponent: () =>
    import('./pages/Administrador/actividades-deportivas/actividades-deportivas')
      .then(m => m.ActividadesDeportivas)
},
{
  path: 'actividades/:categoria/:actividadId/grupos',
  loadComponent: () =>
    import('./pages/Administrador/grupos-actividad/grupos-actividad').then(m => m.GruposActividad),
},
{
  path: 'admin/informacion-grupo',
  loadComponent: () =>
    import('./pages/Administrador/informacion-grupo/informacion-grupo')
      .then(m => m.InformacionGrupo)
},

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }

];