import { Generico } from "./generico";

export class Conductor extends Generico{
    id!: number;
    numeroCedula!: number;
    primerNombre!: string;
    segundoNombre!: string;
    apellidos!: string;
    direccion!: string;
    telefono!: number;
    ciudad!: string;
}
