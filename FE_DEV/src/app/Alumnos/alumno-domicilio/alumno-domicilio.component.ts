import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { alumnoDomicilioDTO } from 'src/app/interfaces/alumnosDomicilioDTO';
import { AlumnosService } from 'src/app/Servicios/alumnoservicio.service';
import { DomicilioService } from 'src/app/Servicios/domicilio.service';
import { PrincipalesService } from 'src/app/Servicios/principales.service';
import { ListasService } from 'src/app/ServiciosListas/listas.service';

@Component({
  selector: 'app-alumno-domicilio',
  templateUrl: './alumno-domicilio.component.html',
  styleUrls: ['./alumno-domicilio.component.css']
})
export class AlumnoDomicilioComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router, private alumnoServicio: AlumnosService,
    private domicilioServicio: DomicilioService, private listasService: ListasService) { }

  editar: boolean = false;
  form: FormGroup;
  alumnoNuevo: alumnoDomicilioDTO;
  folio: number = 0;
  nivelSuperior: boolean = false; // para manipular el flujo de nivel superior

  ngOnInit(): void {

    this.creaFormulario();

    // En OnInit evaluamos si es edicion o es Nuevo
    this.activatedRoute.params.subscribe(params => {
      console.log(params.folio);

      // Control de flujo Nivel Superior
      if(params.superior){
        this.nivelSuperior = true;
      }

      if (params.folio === 0 || params.folio === undefined) {
        this.editar = true;
        this.form.reset();
      }
      else {
        this.folio = params.folio;
      }
    })

  }

  creaFormulario() {
    this.form = this.formBuilder.group({
      folio: 0,
      telefonoAlumno: '--',
      celularAlumno: '664-',
      direccionAlumno: '--',
      colonia: '--',
      codigoPostal: '--',
      observaciones: 'SIN OBS'
    });
  }

  buscarAlumno(value: string) {
    this.listasService.obtenerAlumnoByNofolio(value, 'domicilio')
      .subscribe(alumno => {
        if (alumno) {
          this.alumnoNuevo = alumno;
          this.form.patchValue(this.alumnoNuevo);
        }
        else {
          this.creaFormulario();
        }
      }, error => console.log(error));
  }

  guardarCambios(formValues) {
    this.alumnoNuevo = <alumnoDomicilioDTO>formValues;

    if (this.editar) {
      this.domicilioServicio.actualizarDomicilio(this.alumnoNuevo).subscribe(data => {
        console.log('databack ' + data);
        this.router.navigate(['']);
      }, error => console.log(error));
    }
    else { // TODO: EVALUAR SI nivelSuperior = true Y *AGREGAR PARAMETO O ENVIAR familiar para el titulo?
      this.alumnoServicio.guardarAlumnoDomicilio(this.alumnoNuevo).subscribe(() => {
        if (this.editar) {
          this.router.navigate(['']);
        }
        this.router.navigate(['alumnos/papas', this.folio, 'papa']); // pasar el folio el folio
      }, error => console.log(error));
    }
  }




}
