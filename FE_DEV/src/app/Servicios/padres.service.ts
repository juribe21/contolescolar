import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { alumnoFamiliarDTO } from '../interfaces/alumnoFamiliarDTO';

@Injectable({
  providedIn: 'root'
})
export class PadresService {

  constructor(private http: HttpClient) { }

  private API = environment.ApiUlr + 'familiares';
  private APIConsultas = environment.ApiUlr + 'Consultas';


  /// GET
  // public obtenerAlumnoByNofolio(value: string, entidad: string, tipoFamiliar: number): Observable<alumnoFamiliarDTO> {
  //   return this.http.get<alumnoFamiliarDTO>(`${this.APIConsultas}/AlumnoByNofolio/?value=${value}&entidad=${entidad}&tipo=${tipoFamiliar}`);
  // }



  /// UPDATE
  public actualizarFamiliar(alumno: alumnoFamiliarDTO) {
    return this.http.put(`${this.API}/${alumno.familiarId}`, alumno);
  }

  /// DELETE
}
