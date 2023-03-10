import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { nuevaInscripcionDTO } from 'src/app/Reportes/DTOS/nuevaInscripcionDTO';
import { AlumnosService } from 'src/app/Servicios/alumnoservicio.service';
import { PrincipalesService } from 'src/app/Servicios/principales.service';
import { ListasService } from 'src/app/ServiciosListas/listas.service';

@Component({
  selector: 'app-preinscripcion',
  templateUrl: './preinscripcion.component.html',
  styleUrls: ['./preinscripcion.component.css']
})
export class PreinscripcionComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private alumnoService: AlumnosService, private router: Router,
    private princpalesServicio: PrincipalesService, private listasService: ListasService) { }

nuevaInscripcion: nuevaInscripcionDTO;

  editar: boolean = false;
  form: FormGroup;
  searchFolio: string;
  searchNombre: string;
  folio: number = 0;

  niveles;

  ngOnInit(): void {

    this.creaFormulario();
    this.cargarNivelesEscolares();

  }

  creaFormulario() {
    this.form = this.formBuilder.group({
      // folio: 0,
      // noControl: '--',
      // noFolio: '--',
      nivelId:0,
      gradoId: 0,
      cicloId: 0,
      turnoId: 0,
      mesInscriipcionId: 0,
      carreraId: 0

    });
  }

   buscarAlumno(value: string) {
    this.listasService.obtenerAlumnoByNofolio(value, 'principales')
      .subscribe(alumno => {

        if (alumno) {
          this.nuevaInscripcion = alumno;
          this.form.patchValue(this.nuevaInscripcion);
        }
        else {
          this.creaFormulario();
        }

      }, error => console.log(error));
  }

  guardarPreinscripcion(formValues){
    this.nuevaInscripcion = <nuevaInscripcionDTO>formValues;
  }

  cargarNivelesEscolares() {
    this.listasService.obtenerNivelesEscolares().subscribe(data => {
      this.niveles = data;
    }, error => console.log(error))
  }


}
