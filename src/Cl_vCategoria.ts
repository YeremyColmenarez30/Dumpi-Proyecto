import Cl_mCategoria, { iCategoria } from "./Cl_mCategorias.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";

/**
 * Vista para manejar el formulario de Categorías
 */
export default class Cl_vCategoria extends Cl_vGeneral {
  private inNombre!: HTMLInputElement;
  private btGuardarCategoria!: HTMLButtonElement;
  private btCancelar!: HTMLButtonElement;
  public _controlador: any;

  constructor() {
    super({ formName: "formCategoria" });

    // Input
    this.inNombre = document.getElementById("inNombre") as HTMLInputElement;

    // Botones
    this.btGuardarCategoria = document.getElementById("btGuardar") as HTMLButtonElement;
    this.btCancelar = document.getElementById("btCancelar") as HTMLButtonElement;

    if (this.btGuardarCategoria) {
      this.btGuardarCategoria.addEventListener("click", () => this.agregarCategoria());
    }
    if (this.btCancelar) {
      this.btCancelar.addEventListener("click", () => this.cancelar());
    }
  }

  /** Agregar nueva categoría */
  agregarCategoria() {
    const nombre = this.inNombre?.value.trim();

    // Validación
    if (!nombre) {
      this.mostrarMensaje("El nombre de la categoría no puede estar vacío.");
      return;
    }

    // Enviar al controlador
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
    let div = document.getElementById("divCategoriasRegistradas");
    if (!div) return;

    div.innerHTML = "";
    const categorias: iCategoria[] = this._controlador?.categoriasRegistradas() ?? [];

    for (const c of categorias) {
      let p = document.createElement("p");
      p.textContent = c.nombre;
      div.appendChild(p);
    }
  }

  /** Cancelar operación */
  cancelar() {
    (document.getElementById("formCategoria") as HTMLFormElement)?.reset();
  }

  /** Mostrar mensajes en pantalla o consola */
  private mostrarMensaje(msg: string) {
    let div = document.getElementById("divMensajes");
    if (div) {
      div.textContent = msg;
      div.style.color = "red"; // puedes personalizar estilo
    } else {
      console.log(msg);
    }
  }
}