import Cl_mCategoria, { iCategoria } from "./Cl_mCategorias.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";

/**
 * Vista para manejar el formulario de Categorías
 */
export default class Cl_vCategoria extends Cl_vGeneral {
  private inNombre!: HTMLInputElement;
  private btGuardarCategoria!: HTMLButtonElement;
  private btCancelar!: HTMLButtonElement;
  private btVaciar!: HTMLButtonElement;
  private btSeed!: HTMLButtonElement;
  private divCategorias!: HTMLElement;
  private divMensajes!: HTMLElement;

  public _controlador: any;

  constructor() {
    super({ formName: "formCategoria" });

    // Inputs
    this.inNombre = document.getElementById("inNombre") as HTMLInputElement;

    // Botones
    this.btGuardarCategoria = document.getElementById("btGuardar") as HTMLButtonElement;
    this.btCancelar = document.getElementById("btCancelar") as HTMLButtonElement;
    this.btVaciar = document.getElementById("btVaciar") as HTMLButtonElement;
    this.btSeed = document.getElementById("btSeed") as HTMLButtonElement;

    // Contenedores
    this.divCategorias = document.getElementById("divCategoriasRegistradas")!;
    this.divMensajes = document.getElementById("divMensajes")!;

    // Eventos
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

    // Render inicial
    this.mostrarCategoriasRegistradas();
  }

  /** Agregar nueva categoría */
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

  /** Mostrar categorías registradas */
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

  /** Cancelar operación */
  cancelar() {
    (document.getElementById("formCategoria") as HTMLFormElement)?.reset();
    this.mostrarMensaje("");
  }

  /** Vaciar todas las categorías */
  vaciarCategorias() {
    this._controlador.vaciarCategorias();
    this.mostrarCategoriasRegistradas();
    this.mostrarMensaje("Lista vaciada.");
  }

  /** Cargar ejemplos (seed) */
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

  /** Mostrar mensajes en pantalla o consola */
  private mostrarMensaje(msg: string) {
    if (this.divMensajes) {
      this.divMensajes.textContent = msg;
      this.divMensajes.style.color = "red"; // personalizable
    } else {
      console.log(msg);
    }
  }
}