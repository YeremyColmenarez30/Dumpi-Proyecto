/**
 * 🖥️ Cl_vDashboard
 * -----------------
 * Vista principal que controla la navegación entre:
 *  - Dashboard (pantalla inicial)
 *  - Vista de registros
 *  - Vista de categorías
 *
 * Funcionalidades:
 *  - Maneja botones de navegación (registro, categoría, volver, home).
 *  - Controla qué vista se muestra en pantalla.
 *  - Mantiene un historial de navegación para poder volver atrás.
 */
export default class Cl_vDashboard {
  // --- Referencias a elementos del DOM ---
  private btnVistaRegistro: HTMLButtonElement;   // Botón para ir a la vista de registros
  private btnVistaCategoria: HTMLButtonElement;  // Botón para ir a la vista de categorías
  private vistaRegistro: HTMLElement;            // Contenedor de la vista de registros
  private vistaCategoria: HTMLElement;           // Contenedor de la vista de categorías
  private dashboard: HTMLElement;                // Contenedor del dashboard principal
  private btnVolver: HTMLAnchorElement;          // Botón para volver a la vista anterior
  private btnHome: HTMLAnchorElement;            // Botón para regresar al dashboard

  // 🔑 Pila de historial de navegación (últimas vistas visitadas)
  private historial: string[] = [];

  constructor() {
    // --- Captura de elementos del DOM ---
    this.btnVistaRegistro = document.getElementById("btnVistaRegistro") as HTMLButtonElement;
    this.btnVistaCategoria = document.getElementById("btnVistaCategoria") as HTMLButtonElement;
    this.vistaRegistro = document.getElementById("vistaRegistro") as HTMLElement;
    this.vistaCategoria = document.getElementById("vistaCategoria") as HTMLElement;
    this.dashboard = document.getElementById("Dashboard") as HTMLElement;

    this.btnVolver = document.getElementById("btnVolver") as HTMLAnchorElement;
    this.btnHome = document.getElementById("btnHome") as HTMLAnchorElement;

    // --- Asignación de eventos ---
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

  /**
   * 📂 Mostrar una vista específica (registro o categoría)
   * - Guarda la vista actual en el historial.
   * - Oculta el dashboard.
   * - Muestra la vista seleccionada.
   */
  mostrarVista(vista: "registro" | "categoria") {
    const actual = this.obtenerVistaActual();
    if (actual) this.historial.push(actual);

    this.dashboard.style.display = "none";

    if (vista === "registro") {
      this.vistaRegistro.style.display = "block";
      this.vistaCategoria.style.display = "none";
    } else {
      this.vistaRegistro.style.display = "none";
      this.vistaCategoria.style.display = "block";
    }
  }

  /**
   * 🏠 Mostrar el dashboard principal
   * - Guarda la vista actual en el historial.
   * - Oculta las demás vistas.
   * - Muestra el dashboard.
   */
  mostrarDashboard() {
    const actual = this.obtenerVistaActual();
    if (actual) this.historial.push(actual);

    this.dashboard.style.display = "block";
    this.vistaRegistro.style.display = "none";
    this.vistaCategoria.style.display = "none";
  }

  /**
   * ⬅️ Volver a la vista anterior
   * - Recupera la última vista del historial.
   * - Si no hay historial, vuelve al dashboard.
   * - Muestra la vista correspondiente.
   */
  volverVista() {
    const ultima = this.historial.pop();
    if (!ultima) {
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

  /**
   * 🔎 Obtener la vista actual
   * - Devuelve un string con el nombre de la vista activa.
   * - Si ninguna está activa, devuelve null.
   */
  private obtenerVistaActual(): string | null {
    if (this.dashboard.style.display !== "none") return "dashboard";
    if (this.vistaRegistro.style.display !== "none") return "registro";
    if (this.vistaCategoria.style.display !== "none") return "categoria";
    return null;
  }
}