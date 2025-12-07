export default class Cl_vDashboard {
  private btnVistaRegistro: HTMLButtonElement;
  private btnVistaCategoria: HTMLButtonElement;
  private vistaRegistro: HTMLElement;
  private vistaCategoria: HTMLElement;
  private dashboard: HTMLElement;
  private btnVolver: HTMLAnchorElement;
  private btnHome: HTMLAnchorElement;

  // 🔑 pila de historial
  private historial: string[] = [];

  constructor() {
    this.btnVistaRegistro = document.getElementById("btnVistaRegistro") as HTMLButtonElement;
    this.btnVistaCategoria = document.getElementById("btnVistaCategoria") as HTMLButtonElement;
    this.vistaRegistro = document.getElementById("vistaRegistro") as HTMLElement;
    this.vistaCategoria = document.getElementById("vistaCategoria") as HTMLElement;
    this.dashboard = document.getElementById("Dashboard") as HTMLElement;

    this.btnVolver = document.getElementById("btnVolver") as HTMLAnchorElement;
    this.btnHome = document.getElementById("btnHome") as HTMLAnchorElement;

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

  mostrarVista(vista: "registro" | "categoria") {
    // Guardar la vista actual en historial
    const actual = this.obtenerVistaActual();
    if (actual) this.historial.push(actual);

    // Ocultar dashboard
    this.dashboard.style.display = "none";

    if (vista === "registro") {
      this.vistaRegistro.style.display = "block";
      this.vistaCategoria.style.display = "none";
    } else {
      this.vistaRegistro.style.display = "none";
      this.vistaCategoria.style.display = "block";
    }
  }

  mostrarDashboard() {
    const actual = this.obtenerVistaActual();
    if (actual) this.historial.push(actual);

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
    } else if (ultima === "categoria") {
      this.vistaRegistro.style.display = "none";
      this.vistaCategoria.style.display = "block";
      this.dashboard.style.display = "none";
    } else if (ultima === "dashboard") {
      this.mostrarDashboard();
    }
  }

  private obtenerVistaActual(): string | null {
    if (this.dashboard.style.display !== "none") return "dashboard";
    if (this.vistaRegistro.style.display !== "none") return "registro";
    if (this.vistaCategoria.style.display !== "none") return "categoria";
    return null;
  }
}