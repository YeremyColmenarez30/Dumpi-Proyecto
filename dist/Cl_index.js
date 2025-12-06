import Cl_controlador from "./Cl_controlador.js"; // Controlador
import Cl_vRegistro from "./Cl_vRegistro.js"; // Vista de registros
import Cl_seedData from "./Cl_seedData.js"; // Seed de registros
import Cl_vCategoria from "./Cl_vCategoria.js"; // Vista de categorías
import Cl_mRegistro from "./Cl_mRegistro.js"; // Modelo de registros
import Cl_mCategoria from "./Cl_mCategorias.js"; // Modelo de categorías
export default class Cl_index {
    constructor() {
        // Vista y modelo de categorías
        this.vistaCategoria = new Cl_vCategoria();
        this.modeloCategoria = new Cl_mCategoria("");
        // Vista y modelo de registros
        this.vistaRegistro = new Cl_vRegistro();
        this.modeloRegistro = new Cl_mRegistro();
        // Controlador con los 4 argumentos que espera
        this.controlador = new Cl_controlador(this.modeloRegistro, // modeloRegistro
        this.vistaRegistro, // vistaRegistro
        this.vistaCategoria, // vistaCategoria
        this.modeloCategoria // modeloCategoria
        );
        // Cargar datos de prueba (seed) en registros
        Cl_seedData.cargar(this.controlador);
        // Mostrar datos iniciales
        this.vistaRegistro.mostrarDatosRegistrados();
        this.vistaCategoria.mostrarCategoriasRegistradas();
    }
}
