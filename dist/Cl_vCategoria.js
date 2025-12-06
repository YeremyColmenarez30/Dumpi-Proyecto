import Cl_vGeneral from "./tools/Cl_vGeneral.js";
export default class Cl_vCategoria extends Cl_vGeneral {
    constructor() {
        super({ formName: "formCategoria" });
        this.inNombre = document.getElementById("inNombre");
        // botonees
        this.btGuardarCategoria = document.getElementById("btGuardar");
        this.btCancelar = document.getElementById("btCancelar");
    }
}
