import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { ReporteGeneralDTO } from '../DTOS/reportegeneralDTO';
import { ReportesService } from '../reportes.service';

@Component({
  selector: 'app-listado-general',
  templateUrl: './listado-general.component.html',
  styleUrls: ['./listado-general.component.css']
})
export class ListadoGeneralComponent implements OnInit {

  constructor(private router: Router, private reportesServicio: ReportesService) { }
  reporteGeneral: ReporteGeneralDTO[];
  columnas = ['noFolio', 'nombreAlumno', 'apellidoPaterno', 'apellidoMaterno', 'edoAlumno', 'sexo', 'telefonoAlumno', 'celularAlumno',
    'direccionAlumno', 'colonia', 'nombreCiudad', 'nombrePais', 'gobierno', 'email','curp', 'acciones'];

    lista: Observable<ReporteGeneralDTO[]>;
    alumonos$:Observable<ReporteGeneralDTO[]>;

  ngOnInit(): void {
    this.cargarReporteGeneralII();
    this.cargarReporteGeneralFrom();

  }

  cargarReporteGeneral() {
    this.reportesServicio.reporteGeneral()
    // .subscribe((response: HttpResponse<ReporteGeneralDTO[]>) => {
      .subscribe(response => {
        this.reporteGeneral = response;
        console.log(response);
      }, error => console.log(error));
  }

  // ---------------

  cargarReporteGeneralII() {
    this.lista = this.reportesServicio.reporteGeneral();
    //   this.lista.subscribe(data => {
    //     this.reporteGeneral = data
    // });
  }


  cargarReporteGeneralFrom() {
    //this.lista = this.reportesServicio.reporteGeneral();

    this.alumonos$ = from(this.lista);
    
    this.alumonos$.subscribe(data => {
        this.reporteGeneral = data
    });

  }

}
