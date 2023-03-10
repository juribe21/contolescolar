import { Component, Input, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { alumnoPrincipalesDTO } from 'src/app/interfaces/alumnoPrincipalDTO';
import { AlumnosService } from 'src/app/Servicios/alumnoservicio.service';
import { PrincipalesService } from 'src/app/Servicios/principales.service';
import { ListasService } from 'src/app/ServiciosListas/listas.service';

@Component({
  selector: 'app-alumno-principales',
  templateUrl: './alumno-principales.component.html',
  styleUrls: ['./alumno-principales.component.css']
})
export class AlumnoPrincipalesComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private alumnoServicio: AlumnosService, private router: Router,
    private princpalesServicio: PrincipalesService, private listasService: ListasService) { }

  @Input() alumnos;

  //@Output() onSubmit: EventEmitter<alumnoPrincipalesDTO> = new EventEmitter<alumnoPrincipalesDTO>();

  alumnoNuevo: alumnoPrincipalesDTO;

  editar: boolean = false;
  form: FormGroup;
  searchFolio: string;
  searchNombre: string;
  folio: number = 0;
  estadosAlumnos;
  sexos;
  ciudades;
  estadosNacimiento;
  paises;
  nivelSuperior: boolean = false; // para manipular el flujo de nivel superior

  ngOnInit(): void {

    //this.obtenerAlumnoById(10);

    this.cargaEstadosAlumnos();
    this.cargarCiudades();
    this.cargarSexos();
    this.cargarEstadosNacimiento();
    this.cargarPaies();

    this.creaFormulario();

    // En OnInit evaluamos si es edicion o es Nuevo
    this.activatedRoute.params.subscribe(params => {
      if (!params.nuevo) {
        this.editar = true;
        //this.obtenerAlumnoById();
      }

      // Control de flujo Nivel Superior
       if(params.superior){
        this.nivelSuperior = true;
      }
    })
  }

  remover(indice: number) {
    this.alumnos.splice(indice, 1);
  }

  creaFormulario() {
    this.form = this.formBuilder.group({
      folio: 0,
      noControl: '--',
      noFolio: '--',
      nombreAlumno: '--',
      apellidoPaterno: '--',
      apellidoMaterno: '--',
      sexoId: 0,
      estadoAlumnoId: 0,
      edadAlumno: 0,
      fecha: '',
      ciudadId: 0,
      entidadFederativaId: 0,
      paisId: 0,
      gobierno: false,

    });
  }

  obtenerAlumnoById(folio: number) {

    this.princpalesServicio.obtenerAlumnoById(folio)
      .subscribe(alumno => {
        this.alumnoNuevo = alumno;
        this.form.patchValue(this.alumnoNuevo);
        console.log(this.form.value);
      }, error => console.log(error));
  }

  buscarAlumno(value: string) {
    this.listasService.obtenerAlumnoByNofolio(value, 'principales')
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


  guardarCambios(formValues) { //alumno: alumnoPrincipalesDTO

    this.alumnoNuevo = <alumnoPrincipalesDTO>formValues;

    if (this.editar) {
      this.princpalesServicio.actualizarAlumno(this.alumnoNuevo).subscribe(data => {
        console.log('databack ' + data)
        this.router.navigate(['']);
      }, error => console.log(error));

    }// TODO: PASAR PARAMETRO de nivelSuperior
    else {
      this.alumnoServicio.guardarAlumno(this.alumnoNuevo).subscribe(data => {
        this.folio = <number>data;
        this.router.navigate(['alumnos/domicilio', this.folio]) // pasar el folio
      }, error => console.log(error));
    }
  }


  ///// ***  Dropdowns *** /////
  cargaEstadosAlumnos() {
    this.listasService.obtenerEstadosAlumnos().subscribe(data => {
      this.estadosAlumnos = data;
    }, error => console.log(error))
  }

  cargarSexos() {
    this.listasService.obtenerSexos().subscribe(data => {
      this.sexos = data;
    }, error => console.log(error))
  }

  cargarCiudades() {
    this.listasService.obtenerCiudades().subscribe(data => {
      this.ciudades = data;
    }, error => console.log(error))
  }

  cargarEstadosNacimiento() {
    this.listasService.obtenerEstadosNacimiento().subscribe(data => {
      this.estadosNacimiento = data;
    }, error => console.log(error))
  }

  cargarPaies() {
    this.listasService.obtenerPaises().subscribe(data => {
      this.paises = data;
    }, error => console.log(error))
  }


}
