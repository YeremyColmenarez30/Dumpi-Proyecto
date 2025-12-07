export default class Cl_vDashboard {
    constructor() {
        this.btnVistaRegistro = document.getElementById("btnVistaRegistro");
        this.btnVistaCategoria = document.getElementById("btnVistaCategoria");
        this.vistaRegistro = document.getElementById("vistaRegistro");
        this.vistaCategoria = document.getElementById("vistaCategoria");
        // Eventos de los botones
        this.btnVistaRegistro.addEventListener("click", () => this.mostrarVista("registro"));
        this.btnVistaCategoria.addEventListener("click", () => this.mostrarVista("categoria"));
    }
    mostrarVista(vista) {
        if (vista === "registro") {
            this.vistaRegistro.style.display = "block";
            this.vistaCategoria.style.display = "none";
        }
        else {
            this.vistaRegistro.style.display = "none";
            this.vistaCategoria.style.display = "block";
        }
    }
}
