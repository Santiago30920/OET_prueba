import { Generico } from "./generico";

export class Vehiculo extends Generico{
    id!: number;
    placa!: string;
    color!: string;
    marca!: string;
    tipo!: string;
    conductor!: string;
    propietario!: string;
}
