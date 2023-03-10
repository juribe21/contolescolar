import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReporteGeneralDTO } from './DTOS/reportegeneralDTO';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient) { }

  private API = environment.ApiUlr + 'alumnos';

  public reporteGeneral(): Observable<ReporteGeneralDTO[]> {
    return this.http.get<ReporteGeneralDTO[]>(this.API);//+ '/GetAlumnos'
  }

}
