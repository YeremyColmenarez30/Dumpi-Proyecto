export default class Cl_vDashboard {
  private btnVistaRegistro: HTMLButtonElement;
  private btnVistaCategoria: HTMLButtonElement;
  private vistaRegistro: HTMLElement;
  private vistaCategoria: HTMLElement;

  constructor() {
    this.btnVistaRegistro = document.getElementById("btnVistaRegistro") as HTMLButtonElement;
    this.btnVistaCategoria = document.getElementById("btnVistaCategoria") as HTMLButtonElement;
    this.vistaRegistro = document.getElementById("vistaRegistro") as HTMLElement;
    this.vistaCategoria = document.getElementById("vistaCategoria") as HTMLElement;

    // Eventos de los botones
    this.btnVistaRegistro.addEventListener("click", () => this.mostrarVista("registro"));
    this.btnVistaCategoria.addEventListener("click", () => this.mostrarVista("categoria"));
  }

  mostrarVista(vista: "registro" | "categoria") {
    if (vista === "registro") {
      this.vistaRegistro.style.display = "block";
      this.vistaCategoria.style.display = "none";
    } else {
      this.vistaRegistro.style.display = "none";
      this.vistaCategoria.style.display = "block";
    }
  }
}