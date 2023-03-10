import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlumnoAdicionalesDTO } from '../interfaces/alumnoAdicionales';

@Injectable({
  providedIn: 'root'
})
export class AdicionalesService {

  constructor(private http: HttpClient) { }

  private API = environment.ApiUlr + 'adicionales';
  private APIConsultas = environment.ApiUlr + 'Consultas';

  /// GET
  public obtenerAlumnoByNofolio(value: string, entidad: string): Observable<AlumnoAdicionalesDTO> {
    return this.http.get<AlumnoAdicionalesDTO>(`${this.APIConsultas}/AlumnoByNofolio/?value=${value}&entidad=${entidad}`);
  }


  /// UPDATE
  public actualizarAdicionales(alumno: AlumnoAdicionalesDTO) {
    return this.http.put(this.API + '/actualizarAdicionales', alumno);
  }

  /// DELETE


}
