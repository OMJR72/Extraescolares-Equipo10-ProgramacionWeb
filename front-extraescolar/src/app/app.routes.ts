import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login')
        .then(m => m.LoginComponent)
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
  }
];