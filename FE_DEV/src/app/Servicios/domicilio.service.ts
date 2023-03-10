import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { alumnoDomicilioDTO } from '../interfaces/alumnosDomicilioDTO';

@Injectable({
  providedIn: 'root'
})
export class DomicilioService {

  constructor(private http: HttpClient) { }

  private API = environment.ApiUlr + 'domicilios';
  private APIConsultas = environment.ApiUlr + 'Consultas';


  /// GET
  // public obtenerAlumnoByNofolio(value: string, entidad: string): Observable<alumnoDomicilioDTO> {
  //   return this.http.get<alumnoDomicilioDTO>(`${this.APIConsultas}/AlumnoByNofolio/?value=${value}&entidad=${entidad}`);
  // }


  /// UPDATE
  public actualizarDomicilio(alumno: alumnoDomicilioDTO) {
    return this.http.put(`${this.API}/${alumno.folio}`, alumno);
  }

  /// DELETE
}


