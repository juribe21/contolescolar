import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoAdicionalesDTO } from 'src/app/interfaces/alumnoAdicionales';
import { AdicionalesService } from 'src/app/Servicios/adicionales.service';
import { AlumnosService } from 'src/app/Servicios/alumnoservicio.service';
import { ListasService } from 'src/app/ServiciosListas/listas.service';

@Component({
  selector: 'app-alumno-adicionales',
  templateUrl: './alumno-adicionales.component.html',
  styleUrls: ['./alumno-adicionales.component.css']
})
export class AlumnoAdicionalesComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router, private alumnoServicio: AlumnosService,
    private servicioAdicionales: AdicionalesService, private listasService: ListasService) { }

  editar: boolean = false;
  alumnoNuevo: AlumnoAdicionalesDTO;
  folio: number = 0;
  form: FormGroup;
  polizas;

  ngOnInit(): void {

    this.cargarPolizasSeguros();
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
      polizaSeguroId: '1',
      enfermedad: 'NA',
      vigencia: 'JULIO  2023',
      email: 'EMAIL@EMAIL.COM',
      estadoCivilId: '1',
      nombreConyuge: 'ESPOSA',
      religion: 'SIN RELIGION',
      tipoSangre: 'CO2',
      curp: 'UIPJ89523HBCRRRR02'
    });
  }

  guardarCambios(formValues) {

    this.alumnoNuevo = <AlumnoAdicionalesDTO>formValues;
    this.alumnoNuevo.folio = this.folio;

    if (this.editar) {
      //this.alumnoServicio.actualizarAlumno...
      this.router.navigate(['']);
    }
    else {
      this.alumnoServicio.guardarAlumnoAdicionales(this.alumnoNuevo).subscribe(() => {
        if (this.editar) {
          this.router.navigate(['']);
        }
        this.router.navigate(['', this.folio]); // Debe ser redirigido a Pre Inscripcion
      }, error => console.log(error));
    }
  }

  buscarAlumno(value: string) {
    this.listasService.obtenerAlumnoByNofolio(value, 'adicionales')
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

  cargarPolizasSeguros() {
    this.listasService.obtenerPolizasSeguros().subscribe(data => {
      this.polizas = data;
    }, error => console.log(error))
  }

}
