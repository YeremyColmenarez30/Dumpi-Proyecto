import Cl_vGeneral from "./tools/Cl_vGeneral.js";
/**
 * Vista para manejar el formulario de Categorías
 */
export default class Cl_vCategoria extends Cl_vGeneral {
    constructor() {
        super({ formName: "formCategoria" });
        // Input
        this.inNombre = document.getElementById("inNombre");
        // Botones
        this.btGuardarCategoria = document.getElementById("btGuardar");
        this.btCancelar = document.getElementById("btCancelar");
        if (this.btGuardarCategoria) {
            this.btGuardarCategoria.addEventListener("click", () => this.agregarCategoria());
        }
        if (this.btCancelar) {
            this.btCancelar.addEventListener("click", () => this.cancelar());
        }
    }
    /** Agregar nueva categoría */
    agregarCategoria() {
        var _a;
        const nombre = (_a = this.inNombre) === null || _a === void 0 ? void 0 : _a.value.trim();
        // Validación
        if (!nombre) {
            this.mostrarMensaje("El nombre de la categoría no puede estar vacío.");
            return;
        }
        // Enviar al controlador
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
        let div = document.getElementById("divCategoriasRegistradas");
        if (!div)
            return;
        div.innerHTML = "";
        const categorias = (_b = (_a = this._controlador) === null || _a === void 0 ? void 0 : _a.categoriasRegistradas()) !== null && _b !== void 0 ? _b : [];
        for (const c of categorias) {
            let p = document.createElement("p");
            p.textContent = c.nombre;
            div.appendChild(p);
        }
    }
    /** Cancelar operación */
    cancelar() {
        var _a;
        (_a = document.getElementById("formCategoria")) === null || _a === void 0 ? void 0 : _a.reset();
    }
    /** Mostrar mensajes en pantalla o consola */
    mostrarMensaje(msg) {
        let div = document.getElementById("divMensajes");
        if (div) {
            div.textContent = msg;
            div.style.color = "red"; // puedes personalizar estilo
        }
        else {
            console.log(msg);
        }
    }
}
