import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { consultaAlumnoDTO } from 'src/app/interfaces/consultaAlumnoDTO';
import { listaFamiiaresDTO } from 'src/app/interfaces/listaFamiiaresDTO';
import { ConsultaAlumnoService } from 'src/app/ServiciosConsultas/consulta-alumno.service';
import { ListasService } from 'src/app/ServiciosListas/listas.service';

@Component({
  selector: 'app-consulta-alumno',
  templateUrl: './consulta-alumno.component.html',
  styleUrls: ['./consulta-alumno.component.css']
})
export class ConsultaAlumnoComponent implements OnInit {


constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
  private router: Router, private consultaService: ConsultaAlumnoService) {
}

editar: boolean = false;
folio: number;
alumnoConsultado: consultaAlumnoDTO;
listaFamiliares: listaFamiiaresDTO[];
form: FormGroup;
@ViewChild(MatTable) familiaresTable: MatTable<any>;

creaFormulario(){
  this.form = this.formBuilder.group({
    nombreAlumno: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    sexo: '',
    nivel: '',
    grado: '',
    grupo: '',
    turno: '',
    estadoAlumno:'',
    fechaNacimiento: '',
    tipoSangre: '',
    enfermedad: '',
    curp: '',
    email: '',
    becaGobierno: '',
    telCelular: '',
    telefono: '',
    calle: '',
    colonia: '',
    datosAdicionales: '',
  });
}

columnas = ['nombreFamiliar','familiar','telefono','trabajo','tutor'];

ngOnInit(): void{
  this.creaFormulario();
  //this.form.disable();
}

cargaDatosFamiliar(){
  this.consultaService.datosFamiliar(this.folio)
  .subscribe(response =>{
    this.listaFamiliares = response;
  },error => console.log(error));
}

buscarAlumno(value: string) {
  this.familiaresTable = null;
    this.consultaService.obtenerAlumnoByNofolio(value, 'consultaAlumno')
      .subscribe(alumno => {

        if (alumno) {
          this.alumnoConsultado = alumno;
          this.folio = this.alumnoConsultado.folio;
          this.form.patchValue(this.alumnoConsultado);
          this.cargaDatosFamiliar();
        }
        else {
          this.creaFormulario();
          //this.familiaresTable.renderRows();
          this.folio = 0;
          this.listaFamiliares = [];
        }

      }, error => console.log(error));
  }


}
