export default class Cl_vDashboard {
    constructor() {
        // 🔑 pila de historial
        this.historial = [];
        this.btnVistaRegistro = document.getElementById("btnVistaRegistro");
        this.btnVistaCategoria = document.getElementById("btnVistaCategoria");
        this.vistaRegistro = document.getElementById("vistaRegistro");
        this.vistaCategoria = document.getElementById("vistaCategoria");
        this.dashboard = document.getElementById("Dashboard");
        this.btnVolver = document.getElementById("btnVolver");
        this.btnHome = document.getElementById("btnHome");
        // Eventos
        this.btnVistaRegistro.addEventListener("click", (e) => {
            e.preventDefault();
            this.mostrarVista("registro");
        });
        this.btnVistaCategoria.addEventListener("click", (e) => {
            e.preventDefault();
            this.mostrarVista("categoria");
        });
        this.btnVolver.addEventListener("click", (e) => {
            e.preventDefault();
            this.volverVista();
        });
        this.btnHome.addEventListener("click", (e) => {
            e.preventDefault();
            this.mostrarDashboard();
        });
    }
    mostrarVista(vista) {
        // Guardar la vista actual en historial
        const actual = this.obtenerVistaActual();
        if (actual)
            this.historial.push(actual);
        // Ocultar dashboard
        this.dashboard.style.display = "none";
        if (vista === "registro") {
            this.vistaRegistro.style.display = "block";
            this.vistaCategoria.style.display = "none";
        }
        else {
            this.vistaRegistro.style.display = "none";
            this.vistaCategoria.style.display = "block";
        }
    }
    mostrarDashboard() {
        const actual = this.obtenerVistaActual();
        if (actual)
            this.historial.push(actual);
        this.dashboard.style.display = "block";
        this.vistaRegistro.style.display = "none";
        this.vistaCategoria.style.display = "none";
    }
    volverVista() {
        const ultima = this.historial.pop();
        if (!ultima) {
            // si no hay historial, volvemos al dashboard
            this.mostrarDashboard();
            return;
        }
        if (ultima === "registro") {
            this.vistaRegistro.style.display = "block";
            this.vistaCategoria.style.display = "none";
            this.dashboard.style.display = "none";
        }
        else if (ultima === "categoria") {
            this.vistaRegistro.style.display = "none";
            this.vistaCategoria.style.display = "block";
            this.dashboard.style.display = "none";
        }
        else if (ultima === "dashboard") {
            this.mostrarDashboard();
        }
    }
    obtenerVistaActual() {
        if (this.dashboard.style.display !== "none")
            return "dashboard";
        if (this.vistaRegistro.style.display !== "none")
            return "registro";
        if (this.vistaCategoria.style.display !== "none")
            return "categoria";
        return null;
    }
}
