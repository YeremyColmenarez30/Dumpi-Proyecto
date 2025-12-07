import Cl_mCategoria, { iCategoria } from "./Cl_mCategorias.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";

/**
 * 🎨 Cl_vCategoria
 * ----------------
 * Vista encargada de manejar el formulario de **Categorías** en la interfaz.
 * 
 * Responsabilidades:
 *  - Capturar la entrada del usuario (nombre de categoría).
 *  - Gestionar botones de acción (guardar, cancelar, vaciar, seed).
 *  - Mostrar categorías registradas en pantalla.
 *  - Mostrar mensajes de validación o confirmación.
 * 
 * Extiende de `Cl_vGeneral`, que provee utilidades comunes para vistas.
 */
export default class Cl_vCategoria extends Cl_vGeneral {
  // --- Referencias a elementos del DOM ---
  private inNombre!: HTMLInputElement;          // Campo de texto para el nombre de la categoría
  private btGuardarCategoria!: HTMLButtonElement; // Botón para guardar categoría
  private btCancelar!: HTMLButtonElement;       // Botón para cancelar operación
  private btVaciar!: HTMLButtonElement;         // Botón para vaciar todas las categorías
  private btSeed!: HTMLButtonElement;           // Botón para cargar categorías de ejemplo (seed)
  private divCategorias!: HTMLElement;          // Contenedor donde se listan las categorías registradas
  private divMensajes!: HTMLElement;            // Contenedor para mostrar mensajes al usuario

  // Referencia al controlador (inyectado desde Cl_controlador)
  public _controlador: any;

  constructor() {
    // Inicializa la vista con el nombre del formulario
    super({ formName: "formCategoria" });

    // --- Captura de elementos del DOM ---
    this.inNombre = document.getElementById("inNombre") as HTMLInputElement;

    this.btGuardarCategoria = document.getElementById("btGuardar") as HTMLButtonElement;
    this.btCancelar = document.getElementById("btCancelar") as HTMLButtonElement;
    this.btVaciar = document.getElementById("btVaciar") as HTMLButtonElement;
    this.btSeed = document.getElementById("btSeed") as HTMLButtonElement;

    this.divCategorias = document.getElementById("divCategoriasRegistradas")!;
    this.divMensajes = document.getElementById("divMensajes")!;

    // --- Asignación de eventos ---
    if (this.btGuardarCategoria) {
      this.btGuardarCategoria.addEventListener("click", () => this.agregarCategoria());
    }
    if (this.btCancelar) {
      this.btCancelar.addEventListener("click", () => this.cancelar());
    }
    if (this.btVaciar) {
      this.btVaciar.addEventListener("click", () => this.vaciarCategorias());
    }
    if (this.btSeed) {
      this.btSeed.addEventListener("click", () => this.cargarSeed());
    }

    // Render inicial: mostrar categorías ya registradas
    this.mostrarCategoriasRegistradas();
  }

  /**
   * ➕ Agregar nueva categoría
   * - Toma el valor del input.
   * - Valida que no esté vacío.
   * - Llama al controlador para agregar la categoría.
   * - Muestra mensajes de error o éxito.
   */
  agregarCategoria() {
    const nombre = this.inNombre?.value.trim();

    if (!nombre) {
      this.mostrarMensaje("El nombre de la categoría no puede estar vacío.");
      return;
    }

    this._controlador.agregarCategoria({
      categoriaData: { nombre } as iCategoria,
      callback: (error: string | false) => {
        if (error) {
          this.mostrarMensaje(error);
        } else {
          this.mostrarMensaje("Categoría guardada correctamente.");
          (document.getElementById("formCategoria") as HTMLFormElement)?.reset();
          this.mostrarCategoriasRegistradas();
        }
      },
    });
  }

  /**
   * 📋 Mostrar categorías registradas
   * - Limpia el contenedor.
   * - Obtiene la lista desde el controlador.
   * - Si no hay categorías, muestra un mensaje.
   * - Si existen, las renderiza como párrafos.
   */
  mostrarCategoriasRegistradas() {
    this.divCategorias.innerHTML = "";
    const categorias: iCategoria[] = this._controlador?.categoriasRegistradas() ?? [];

    if (!categorias.length) {
      this.divCategorias.textContent = "Sin categorías registradas.";
      return;
    }

    for (const c of categorias) {
      const p = document.createElement("p");
      p.textContent = c.nombre;
      this.divCategorias.appendChild(p);
    }
  }

  /**
   * ❌ Cancelar operación
   * - Resetea el formulario.
   * - Limpia mensajes.
   */
  cancelar() {
    (document.getElementById("formCategoria") as HTMLFormElement)?.reset();
    this.mostrarMensaje("");
  }

  /**
   * 🗑️ Vaciar todas las categorías
   * - Llama al controlador para eliminar todas.
   * - Refresca la vista.
   * - Muestra mensaje de confirmación.
   */
  vaciarCategorias() {
    this._controlador.vaciarCategorias();
    this.mostrarCategoriasRegistradas();
    this.mostrarMensaje("Lista vaciada.");
  }

  /**
   * 🌱 Cargar ejemplos (seed)
   * - Inserta varias categorías de prueba con diferentes formatos de texto.
   * - Refresca la vista y muestra mensaje de confirmación.
   */
  cargarSeed() {
    const ejemplos = ["alimento", "Alimentos", "ALIMENTOS", "servicio", "Servicios", "SERVICIOS"];
    ejemplos.forEach((nom) => {
      this._controlador.agregarCategoria({
        categoriaData: { nombre: nom } as iCategoria,
        callback: () => {},
      });
    });
    this.mostrarCategoriasRegistradas();
    this.mostrarMensaje("Seed cargado.");
  }

  /**
   * 💬 Mostrar mensajes en pantalla o consola
   * - Si existe el contenedor de mensajes, lo actualiza.
   * - Si no, imprime en consola.
   */
  private mostrarMensaje(msg: string) {
    if (this.divMensajes) {
      this.divMensajes.textContent = msg;
      this.divMensajes.style.color = "red"; // personalizable
    } else {
      console.log(msg);
    }
  }
}