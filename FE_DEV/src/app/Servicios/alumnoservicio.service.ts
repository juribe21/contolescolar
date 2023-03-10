import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlumnoAcademicoDTO } from '../interfaces/alumnoAcademicoDTO';
import { alumnoFamiliarDTO } from '../interfaces/alumnoFamiliarDTO';
import { alumnoPrincipalesDTO } from '../interfaces/alumnoPrincipalDTO';
import { alumnoDomicilioDTO } from '../interfaces/alumnosDomicilioDTO';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(private http: HttpClient) { }

  private API = environment.ApiUlr + 'alumnos';


  public guardarAlumno(alumno: alumnoPrincipalesDTO) {
    return this.http.post(this.API + '/GuardarPrincipales', alumno);
  }

  public guardarAlumnoDomicilio(alumno: alumnoDomicilioDTO) {
    return this.http.post(this.API + '/GuardarDomicilio', alumno);
  }

  public guardarFamiliar(alumno: alumnoFamiliarDTO) {
    return this.http.post(this.API + '/GuardarFamiliar', alumno);
  }

  public guardarAlumnoEscolares(alumno: AlumnoAcademicoDTO) {
    return this.http.post(this.API + '/GuardarEscolares', alumno);
  }

  public guardarAlumnoAdicionales(alumno: any) {
    return this.http.post(this.API + '/GuardarAdicionales', alumno);
  }

}
