import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { alumnoFamiliarDTO } from 'src/app/interfaces/alumnoFamiliarDTO';
import { AlumnosService } from 'src/app/Servicios/alumnoservicio.service';
import { PadresService } from 'src/app/Servicios/padres.service';
import { ListasService } from 'src/app/ServiciosListas/listas.service';

@Component({
  selector: 'app-alumno-padres',
  templateUrl: './alumno-padres.component.html',
  styleUrls: ['./alumno-padres.component.css']
})
export class AlumnoPadresComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router, private alumnoServicio: AlumnosService, private familairSrv: PadresService,
    private listasService: ListasService
  ) { }

  editar: boolean = false;
  padre: string = '';
  tipoFamiliar: number = 0;
  form: FormGroup;
  alumnoNuevo: alumnoFamiliarDTO;
  formPadreCompleto: boolean = false;
  folio: number = 0;
  familiares;
  famFolioId: any;

  ngOnInit(): void {
    // En OnInit evaluamos si es edicion o es Nuevo
    this.cargarTiposFamilares();
    this.creaFormulario();

    this.activatedRoute.params.subscribe(params => {
      console.log(params.folio);

      if (params.folio === 0 || params.folio === undefined) {
        this.editar = true;
      }
      else {
        this.folio = params.folio;
      }

      if (params.padre === 'papa') {
        this.padre = 'papa';
        this.tipoFamiliar = 1;
      }

      if (params.padre === 'mama') {
        this.padre = 'mama';
        this.tipoFamiliar = 2;
        this.formPadreCompleto = true;
      }
    })
  }

  creaFormulario() {
    this.form = this.formBuilder.group({
      familiarId: 0,
      folioId: 0,
      nombreFamiliar: '',
      apPaternoFamiliar: '',
      apMaternoFamiliar: '',
      tipoFamiliarId: 1,
      observaciones: '',
      tutor: false
    });
  }

  buscarAlumno(value: string) {
    this.listasService.obtenerFamAlumnoByNofolio(value, 'familiar', this.tipoFamiliar)
      .subscribe(alumno => {
        if (alumno.familiarId) {
          this.alumnoNuevo = alumno;
          this.form.patchValue(this.alumnoNuevo);
        }
        if (alumno && alumno.familiarId === undefined) {
          this.creaFormulario();
          this.famFolioId = alumno;
        }
        // else {
        //   this.creaFormulario();
        // }
      }, error => console.log(error));
  }

  guardarCambios(formValues) {
    this.alumnoNuevo = <alumnoFamiliarDTO>formValues;

    if (this.alumnoNuevo.familiarId === 0) {
      this.alumnoNuevo.folioId = this.famFolioId;
      this.editar = false;
    }

    if (this.editar) {
      this.editarInformacion();
    }
    if (!this.editar) {
      this.guardarNuevo();
    }

  }

  guardarNuevo() {
    if (!this.formPadreCompleto) {
      this.alumnoServicio.guardarFamiliar(this.alumnoNuevo).subscribe(() => {
        this.router.navigate(['alumnos/papas', this.folio, 'mama']);
        this.creaFormulario();
      }, error => console.log(error));

    }
    else {
      this.alumnoServicio.guardarFamiliar(this.alumnoNuevo).subscribe(() => {
        this.router.navigate(['alumnos/academicos/', this.folio]);
      }, error => console.log(error));
    }
  }

  editarInformacion() {
    this.familairSrv.actualizarFamiliar(this.alumnoNuevo).subscribe(data => {
      console.log('databack ' + data);
      this.router.navigate(['']);
    }, error => console.log(error));
  }


  cargarTiposFamilares() {
    this.listasService.obtenerTiposFamiliares().subscribe(data => {
      this.familiares = data;
    }, error => console.log(error))
  }


}
