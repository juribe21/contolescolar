import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-alumnobuscar',
  templateUrl: './alumnobuscar.component.html',
  styleUrls: ['./alumnobuscar.component.css']
})
export class AlumnobuscarComponent implements OnInit {

  constructor() { }

  @Output() xnofolio: EventEmitter<string> = new EventEmitter<string>();
  @Output() xnombre: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('sFolio') inputFolio;
  @ViewChild('sNombre') inputName;

  ngOnInit(): void {
  }

  buscarAlumnoFolio(value) {
    console.log(value.target.value);
    this.xnofolio.emit(value.target.value);
    this.inputFolio.nativeElement.value = '';
  }

  buscarAlumnoNombre(value) {
    console.log(value.target.value);
    this.xnombre.emit(value.target.value);
    this.inputName.nativeElement.value = '';
  }

}
