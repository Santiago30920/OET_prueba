export enum EConductor {
    LABEL_ID = 'id',
    LABEL_NUMERO_CEDULA = 'numeroCedula',
    LABEL_PRIMER_NOMBRE = 'primerNombre',
    LABEL_SEGUNDO_NOMBRE = 'segundoNombre',
    LABEL_APELLIDOS = 'apellidos',
    LABEL_DIRECCION = 'direccion',
    LABEL_TELEFONO = 'telefono',
    LABEL_CIUDAD = 'ciudad',
    LABEL_ACCCION = 'accion',

    CONDUCTOR_PERSISTIR = 'http://127.0.0.1:8000/api/conductor/crear',
    CONDUCTOR_EDITAR = 'http://127.0.0.1:8000/api/conductor/editar',
    CONDUCTOR_LISTAR = 'http://127.0.0.1:8000/api/conductor/consultar',
}
