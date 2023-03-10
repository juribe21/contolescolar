import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnobuscarComponent } from './utilidades/alumnobuscar/alumnobuscar.component';
import { AlumnoPrincipalesComponent } from './Alumnos/alumno-principales/alumno-principales.component';
import { AlumnoDomicilioComponent } from './Alumnos/alumno-domicilio/alumno-domicilio.component';
import { AlumnoPadresComponent } from './Alumnos/alumno-padres/alumno-padres.component';
import { AlumnoAcademicosComponent } from './Alumnos/alumno-academicos/alumno-academicos.component';
import { AlumnoAdicionalesComponent } from './Alumnos/alumno-adicionales/alumno-adicionales.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MaterialModule } from './material/material.module';
import { TopmenuComponent } from './menus/topmenu/topmenu.component';
import { SidemenuComponent } from './menus/sidemenu/sidemenu.component';
import { IndexComponent } from './index/index.component';
import { ListadoGeneralComponent } from './reportes/listado-general/listado-general.component';
import { PreinscripcionComponent } from './alumnospreinscripcion/preinscripcion/preinscripcion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './security/login/login.component';
import { ConsultaAlumnoComponent } from './Consultas/consulta-alumno/consulta-alumno.component';
import { ReinscripcionComponent } from './AlumnosInscripcion/reinscripcion/reinscripcion.component';


@NgModule({
  declarations: [
    AppComponent,
    AlumnoPrincipalesComponent,
    AlumnoDomicilioComponent,
    AlumnoPadresComponent,
    AlumnoAcademicosComponent,
    AlumnoAdicionalesComponent,
    TopmenuComponent,
    SidemenuComponent,
    IndexComponent,
    ListadoGeneralComponent,
    PreinscripcionComponent,
    AlumnobuscarComponent,
    LoginComponent,
    ConsultaAlumnoComponent,
    ReinscripcionComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
