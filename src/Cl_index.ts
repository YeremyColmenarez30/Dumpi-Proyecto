import Cl_controlador from "./Cl_controlador.js"; // Importar el controlador
import Cl_vRegistro from "./Cl_vRegistro.js"; // Importar la vista

export default class Cl_index {
  public vista: Cl_vRegistro; // Propiedad para almacenar la vista
  public controlador: Cl_controlador; // Propiedad para almacenar el controlador

  constructor() {
    // Crear una nueva instancia de Cl_vRegistro y asignarla a vista
    this.vista = new Cl_vRegistro();

    // Crear una nueva instancia de Cl_controlador y pasarle vista como argumento
    this.controlador = new Cl_controlador(this.vista);

    // Mostrar los datos registrados en la vista
    this.vista.mostrarDatosRegistrados();
  }
}