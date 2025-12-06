import Cl_vGeneral from "./tools/Cl_vGeneral.js";
/**
 * Vista para manejar el formulario de Categorías
 */
export default class Cl_vCategoria extends Cl_vGeneral {
    constructor() {
        super({ formName: "formCategoria" });
        // Inputs
        this.inNombre = document.getElementById("inNombre");
        // Botones
        this.btGuardarCategoria = document.getElementById("btGuardar");
        this.btCancelar = document.getElementById("btCancelar");
        this.btVaciar = document.getElementById("btVaciar");
        this.btSeed = document.getElementById("btSeed");
        // Contenedores
        this.divCategorias = document.getElementById("divCategoriasRegistradas");
        this.divMensajes = document.getElementById("divMensajes");
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
        var _a;
        const nombre = (_a = this.inNombre) === null || _a === void 0 ? void 0 : _a.value.trim();
        if (!nombre) {
            this.mostrarMensaje("El nombre de la categoría no puede estar vacío.");
            return;
        }
        this._controlador.agregarCategoria({
            categoriaData: { nombre },
            callback: (error) => {
                var _a;
                if (error) {
                    this.mostrarMensaje(error);
                }
                else {
                    this.mostrarMensaje("Categoría guardada correctamente.");
                    (_a = document.getElementById("formCategoria")) === null || _a === void 0 ? void 0 : _a.reset();
                    this.mostrarCategoriasRegistradas();
                }
            },
        });
    }
    /** Mostrar categorías registradas */
    mostrarCategoriasRegistradas() {
        var _a, _b;
        this.divCategorias.innerHTML = "";
        const categorias = (_b = (_a = this._controlador) === null || _a === void 0 ? void 0 : _a.categoriasRegistradas()) !== null && _b !== void 0 ? _b : [];
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
        var _a;
        (_a = document.getElementById("formCategoria")) === null || _a === void 0 ? void 0 : _a.reset();
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
                categoriaData: { nombre: nom },
                callback: () => { },
            });
        });
        this.mostrarCategoriasRegistradas();
        this.mostrarMensaje("Seed cargado.");
    }
    /** Mostrar mensajes en pantalla o consola */
    mostrarMensaje(msg) {
        if (this.divMensajes) {
            this.divMensajes.textContent = msg;
            this.divMensajes.style.color = "red"; // personalizable
        }
        else {
            console.log(msg);
        }
    }
}
