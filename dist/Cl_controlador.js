import Cl_mDatos from "./Cl_mDatos.js";
import Cl_mCategoria from "./Cl_mCategorias.js";
export default class Cl_controlador {
    constructor(modeloRegistro, vistaRegistro, vistaCategoria, modeloCategoria) {
        this.modeloRegistro = modeloRegistro;
        this.vistaRegistro = vistaRegistro;
        this.vistaCategoria = vistaCategoria;
        this.modeloCategoria = modeloCategoria !== null && modeloCategoria !== void 0 ? modeloCategoria : new Cl_mCategoria("");
        // Conectar vistas
        this.vistaRegistro._controlador = this;
        this.vistaCategoria._controlador = this;
    }
    /** CRUD de registros */
    agregarRegistro({ registroData, callback }) {
        const nuevoDato = new Cl_mDatos(registroData);
        const error = nuevoDato.error();
        if (error) {
            callback(error);
            return;
        }
        this.modeloRegistro.agregarRegistro({ datos: nuevoDato, callback });
    }
    datosRegistrados() {
        return this.modeloRegistro.listarRegistro();
    }
    editarTransaccion(referencia, cambios, callback) {
        this.modeloRegistro.editarRegistro(referencia, cambios, callback);
    }
    eliminarTransaccion(referencia, callback) {
        this.modeloRegistro.eliminarRegistro(referencia, callback);
    }
    filtrarTransacciones(texto) {
        return this.modeloRegistro.filtrarRegistros(texto);
    }
    /** Categorías */
    agregarCategoria({ categoriaData, callback }) {
        this.modeloCategoria.agregarCategoria({
            categoria: new Cl_mCategoria(categoriaData.nombre),
            callback,
        });
    }
    categoriasRegistradas() {
        return this.modeloCategoria.listarCategoria();
    }
    vaciarCategorias() {
        const actuales = this.modeloCategoria.listarCategoria().map(c => c.nombre);
        actuales.forEach(n => this.modeloCategoria.deleteCategoria({ nombre: n, callback: () => { } }));
        localStorage.removeItem("categoria");
    }
}
