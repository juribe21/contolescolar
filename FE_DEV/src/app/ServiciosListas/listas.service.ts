import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  constructor(private http: HttpClient) { }

  //private API = environment.ApiUlr + 'principales';
  private APICatalog = environment.ApiUlr + 'catalog';

  /// GET
  public obtenerAlumnoByNofolio(value: string, entidad: string): Observable<any> {
    return this.http.get<any>(`${this.APICatalog}/AlumnoByNofolio/?value=${value}&entidad=${entidad}`);
  }

  /// Get Familiares
  public obtenerFamAlumnoByNofolio(value: string, entidad: string, tipoFamiliar: number): Observable<any> {
    return this.http.get<any>(`${this.APICatalog}/AlumnoByNofolio/?value=${value}&entidad=${entidad}&tipo=${tipoFamiliar}`);
  }


  public obtenerEstadosAlumnos(): Observable<any[]> {
    return this.http.get<any[]>(this.APICatalog + '/estadosAlumnos');
  }

  public obtenerSexos(): Observable<any[]> {
    return this.http.get<any[]>(this.APICatalog + '/sexos');
  }

  public obtenerCiudades(): Observable<any[]> {
    return this.http.get<any[]>(this.APICatalog + '/ciudades');
  }

  public obtenerEstadosNacimiento(): Observable<any[]> {
    return this.http.get<any[]>(this.APICatalog + '/estadosNacimiento');
  }

  public obtenerPaises(): Observable<any[]> {
    return this.http.get<any[]>(this.APICatalog + '/paises');
  }
  //obtenerTiposFamiliares
  public obtenerTiposFamiliares(): Observable<any[]> {
    return this.http.get<any[]>(this.APICatalog + '/familiares');
  }

  public obtenerPolizasSeguros(): Observable<any[]> {
    return this.http.get<any[]>(this.APICatalog + '/polizas');
  }

  public obtenerNivelesEscolares(): Observable<any[]> {
    return this.http.get<any[]>(this.APICatalog + '/nivelesscolares');
  }


}
