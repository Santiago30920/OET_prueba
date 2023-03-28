import { Generico } from "./generico";

export class Propietario extends Generico{
    numeroCedula!: number;
    primerNombre!: string;
    segundoNombre!: string;
    apellidos!: string;
    direccion!: string;
    telefono!: number;
    ciudad!: string;
}
