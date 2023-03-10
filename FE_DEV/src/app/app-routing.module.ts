import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
import { RouterModule, Routes } from '@angular/router'
import { AlumnoAcademicosComponent } from './Alumnos/alumno-academicos/alumno-academicos.component';
import { AlumnoAdicionalesComponent } from './Alumnos/alumno-adicionales/alumno-adicionales.component';
import { AlumnoDomicilioComponent } from './Alumnos/alumno-domicilio/alumno-domicilio.component';
import { AlumnoPadresComponent } from './Alumnos/alumno-padres/alumno-padres.component';
import { AlumnoPrincipalesComponent } from './Alumnos/alumno-principales/alumno-principales.component';
import { ReinscripcionComponent } from './AlumnosInscripcion/reinscripcion/reinscripcion.component';
import { PreinscripcionComponent } from './alumnospreinscripcion/preinscripcion/preinscripcion.component';
import { ConsultaAlumnoComponent } from './Consultas/consulta-alumno/consulta-alumno.component';
import { IndexComponent } from './index/index.component';
import { ListadoGeneralComponent } from './reportes/listado-general/listado-general.component';
import { LoginComponent } from './security/login/login.component';

const routes: Routes = [
  //{ path: '', component: LoginComponent },
  { path: '', component: IndexComponent },
  { path: 'alumnos/principales', component: AlumnoPrincipalesComponent }, // Top Menu
  { path: 'alumnos/principales/:nuevo/:superior', component: AlumnoPrincipalesComponent },

  { path: 'alumnos/domicilio', component: AlumnoDomicilioComponent }, // Top Menu
  { path: 'alumnos/domicilio/:folio', component: AlumnoDomicilioComponent },

  { path: 'alumnos/papas/:padre', component: AlumnoPadresComponent }, // Top Menu
  { path: 'alumnos/papas/:folio/:padre', component: AlumnoPadresComponent },

  { path: 'alumnos/academicos', component: AlumnoAcademicosComponent }, // Top Menu
  { path: 'alumnos/academicos/:folio', component: AlumnoAcademicosComponent },

  { path: 'alumnos/adicional', component: AlumnoAdicionalesComponent }, // Top Menu
  { path: 'alumnos/adicional/:folio', component: AlumnoAdicionalesComponent },

  { path: 'alumnos/listageneral', component: ListadoGeneralComponent }, // Top Menu
  { path: 'alumnos/consultaAlumno', component: ConsultaAlumnoComponent},

  { path: 'alumnos/preinscripcion', component: PreinscripcionComponent }, // Top Menu
  { path: 'alumnos/inscripcion', component: ReinscripcionComponent }, // Top Menu



  { path: '**', component: IndexComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
