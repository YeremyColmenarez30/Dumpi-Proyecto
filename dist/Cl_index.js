import Cl_controlador from "./Cl_controlador.js"; // Importar el controlador
import Cl_vRegistro from "./Cl_vRegistro.js"; // Importar la vista
import Cl_seedData from "./Cl_seedData.js";
export default class Cl_index {
    constructor() {
        // Crear una nueva instancia de Cl_vRegistro y asignarla a vista
        this.vista = new Cl_vRegistro();
        // Crear una nueva instancia de Cl_controlador y pasarle vista como argumento
        this.controlador = new Cl_controlador(this.vista);
        // Cargar datos de prueba (seed)
        Cl_seedData.cargar(this.controlador);
        // Mostrar los datos registrados en la vista
        this.vista.mostrarDatosRegistrados();
    }
}
