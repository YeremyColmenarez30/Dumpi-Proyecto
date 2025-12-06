import { iCategoria } from "./Cl_mCategorias.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";


export default class Cl_vCategoria extends Cl_vGeneral{
    private inNombre!: HTMLInputElement 
    private btGuardarCategoria!: HTMLButtonElement
    private btCancelar!: HTMLButtonElement
    constructor() {
        super({ formName: "formCategoria" })
        this.inNombre = document.getElementById("inNombre") as HTMLInputElement;

        // botonees
        this.btGuardarCategoria = document.getElementById("btGuardar") as HTMLButtonElement
        this.btCancelar = document.getElementById("btCancelar") as HTMLButtonElement
    }
}