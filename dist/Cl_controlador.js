import Cl_mDatos from "./Cl_mDatos.js"; // Modelo de datos
import Cl_mCategoria from "./Cl_mCategorias.js"; // Modelo de categorías
export default class Cl_controlador {
    constructor(modeloRegistro, vistaRegistro, vistaCategoria, modeloCategoria) {
        // Propiedades modelo
        this.modeloDatos = []; // Lista de registros
        this.modeloRegistro = modeloRegistro;
        this.vistaRegistro = vistaRegistro;
        this.vistaCategoria = vistaCategoria;
        // Inicializar modelo de categorías
        this.modeloCategoria = modeloCategoria !== null && modeloCategoria !== void 0 ? modeloCategoria : new Cl_mCategoria("");
        // Conectar vistas con el controlador
        this.vistaRegistro.controlador = this;
        this.vistaCategoria._controlador = this;
    }
    /** Agregar un nuevo registro */
    agregarRegistro({ registroData, callback, }) {
        try {
            const nuevoDato = new Cl_mDatos(registroData);
            const error = nuevoDato.error();
            if (error) {
                callback(error);
                return;
            }
            this.modeloDatos.push(nuevoDato);
            callback(false);
        }
        catch (e) {
            callback(e.message);
        }
    }
    /** Listar registros en formato JSON */
    datosRegistrados() {
        return this.modeloDatos.map((r) => r.toJSON());
    }
    /** Agregar nueva categoría */
    agregarCategoria({ categoriaData, callback, }) {
        this.modeloCategoria.agregarCategoria({
            categoria: new Cl_mCategoria(categoriaData.nombre),
            callback: (error) => {
                callback(error);
            },
        });
    }
    /** Listar categorías */
    categoriasRegistradas() {
        return this.modeloCategoria.listarCategoria();
    }
    /** Vaciar categorías */
    vaciarCategorias() {
        const actuales = this.modeloCategoria.listarCategoria().map((c) => c.nombre);
        actuales.forEach((n) => {
            this.modeloCategoria.deleteCategoria({ nombre: n, callback: () => { } });
        });
        localStorage.removeItem("categoria");
    }
}
