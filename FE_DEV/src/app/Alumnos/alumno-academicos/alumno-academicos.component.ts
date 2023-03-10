import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoAcademicoDTO } from 'src/app/interfaces/alumnoAcademicoDTO';
import { AlumnosService } from 'src/app/Servicios/alumnoservicio.service';
import { EscolaresService } from 'src/app/Servicios/escolares.service';
import { ListasService } from 'src/app/ServiciosListas/listas.service';

@Component({
  selector: 'app-alumno-academicos',
  templateUrl: './alumno-academicos.component.html',
  styleUrls: ['./alumno-academicos.component.css']
})
export class AlumnoAcademicosComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router, private alumnoServicio: AlumnosService, private listasService: ListasService,
    private escolarService: EscolaresService) { }


  editar: boolean = false;
  alumnoNuevo: AlumnoAcademicoDTO;
  folio: number = 0;
  form: FormGroup;
  estadosNacimiento;

  ngOnInit(): void {
    this.cargarEstadosNacimiento();
    this.creaFormulario();

    // En OnInit evaluamos si es edicion o es Nuevo
    this.activatedRoute.params.subscribe(params => {

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
      escuelaProcedencia: '--',
      clave: '--',
      gradoEscolar: '--',
      nivelAcademico: '--',
      promedio: '0',
      nota: '--',
      estadoProcedenciaId: '0'
    })
  }

  guardarCambios(formValues) {
    this.alumnoNuevo = <AlumnoAcademicoDTO>formValues;
    this.alumnoNuevo.folio = this.folio;

    if (this.editar) {
      this.escolarService.actualizarEscolares
      this.router.navigate(['']);
    }
    else {
      this.alumnoServicio.guardarAlumnoEscolares(this.alumnoNuevo).subscribe(() => {
        if (this.editar) {
          this.router.navigate(['']);
        }
        this.router.navigate(['alumnos/adicional', this.folio]);
      }, error => console.log(error));
    }
  }

  buscarAlumno(value: string) {
    this.listasService.obtenerAlumnoByNofolio(value, 'escolares')
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

  cargarEstadosNacimiento() {
    this.listasService.obtenerEstadosNacimiento().subscribe(data => {
      this.estadosNacimiento = data;
    }, error => console.log(error))
  }

}
