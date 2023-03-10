export interface alumnoPrincipalesDTO {
    folio: number;
    noControl: string;
    noFolio: string;
    nombreAlumno: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    sexoId: number;
    edadAlumno: number;
    fechaInscripcion: Date;
    foto: string;
    estadoAlumnoId: number;
    fecha: Date; //fechaNacimiento
    entidadFederativaId: number;
    ciudadId: any;
    modifyBy: number // mover a un event source process
    //fecha: Date;
    paisId: number;
    gobierno: boolean;
    factura: boolean;
    usuarioId: number;
    alumnosGenerales: alumnosGeneralesDTO;

}

interface alumnosGeneralesDTO {
    fechaNacimiento: Date;
    ciudadNacimientoId: number
    NacionaliadadId: number;
}