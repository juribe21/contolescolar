import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { consultaAlumnoDTO } from '../interfaces/consultaAlumnoDTO';
import { listaFamiiaresDTO } from '../interfaces/listaFamiiaresDTO';

@Injectable({
  providedIn: 'root'
})
export class ConsultaAlumnoService {

  constructor(private http: HttpClient) { }

  private APIConsultas = environment.ApiUlr + 'consultas';

/// Consulta de Alumno por Nofolio o por Nombre
public obtenerAlumnoByNofolio(value: string, entidad: string): Observable<consultaAlumnoDTO> {
    return this.http.get<consultaAlumnoDTO>(`${this.APIConsultas}/ConsultaAlumno/?value=${value}&entidad=${entidad}`);
}

/// Carga lista de Familiares
  public datosFamiliar(folio: number): Observable<listaFamiiaresDTO[]> {
    return this.http.get<listaFamiiaresDTO[]>(`${this.APIConsultas}/ListaFamiliaresAlumno/?folio=${folio}`);
  }



}

