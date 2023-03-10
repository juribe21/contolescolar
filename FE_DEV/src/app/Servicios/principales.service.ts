import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { alumnoPrincipalesDTO } from '../interfaces/alumnoPrincipalDTO';


@Injectable({
  providedIn: 'root'
})
export class PrincipalesService {

  constructor(private http: HttpClient) { }

  private API = environment.ApiUlr + 'principales';
  private APIConsultas = environment.ApiUlr + 'Consultas';

  /// GET
  public obtenerAlumnoById(folio: number): Observable<alumnoPrincipalesDTO> {
    return this.http.get<alumnoPrincipalesDTO>(`${this.API}/Alumno/${folio}`);
  }

  //   public obtenerAlumnoByNofolio(value: string, entidad: string): Observable<alumnoPrincipalesDTO> {    
  //   return this.http.get<alumnoPrincipalesDTO>(`${this.APIConsultas}/AlumnoByNofolio/?value=${value}&entidad=${entidad}`);
  // }

  /// UPDATE
  public actualizarAlumno(alumno: alumnoPrincipalesDTO) {
    return this.http.put(`${this.API}/${alumno.folio}`, alumno);
  }


  /// DELETE


}
