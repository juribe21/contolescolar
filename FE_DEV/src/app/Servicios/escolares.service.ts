import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlumnoAcademicoDTO } from '../interfaces/alumnoAcademicoDTO';

@Injectable({
  providedIn: 'root'
})
export class EscolaresService {

  constructor(private http: HttpClient) { }

  private API = environment.ApiUlr + 'escolar';
  private APIConsultas = environment.ApiUlr + 'Consultas';


  /// GET


  /// UPDATE
  public actualizarEscolares(alumno: AlumnoAcademicoDTO) {
    return this.http.put(`${this.API}/${alumno.folio}`, alumno);
  }

  /// GET
  // public obtenerAlumnoByNofolio(value: string, entidad: string): Observable<AlumnoAcademicoDTO> {
  //   return this.http.get<AlumnoAcademicoDTO>(`${this.APIConsultas}/AlumnoByNofolio/?value=${value}&entidad=${entidad}`);
  // }



  /// DELETE

}
