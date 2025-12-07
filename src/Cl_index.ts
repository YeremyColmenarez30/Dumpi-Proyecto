import Cl_controlador from "./Cl_controlador.js";
import Cl_vRegistro from "./Cl_vRegistro.js";
import Cl_vCategoria from "./Cl_vCategoria.js";
import Cl_mRegistro from "./Cl_mRegistro.js";
import Cl_mCategoria from "./Cl_mCategorias.js";
import Cl_vDashboard from "./Cl_vDashboard.js";

export default class Cl_index {
  public vistaRegistro: Cl_vRegistro;
  public vistaCategoria: Cl_vCategoria;
  public modeloRegistro: Cl_mRegistro;
  public modeloCategoria: Cl_mCategoria;
  public controlador: Cl_controlador;
  public dashboard: Cl_vDashboard;

  constructor() {
    // Inicializar vistas y modelos
    this.vistaRegistro = new Cl_vRegistro();
    this.vistaCategoria = new Cl_vCategoria();
    this.modeloRegistro = new Cl_mRegistro();
    this.modeloCategoria = new Cl_mCategoria("");

    // Controlador conecta lógica con vistas
    this.controlador = new Cl_controlador(
      this.modeloRegistro,
      this.vistaRegistro,
      this.vistaCategoria,
      this.modeloCategoria
    );

    // Dashboard controla la navegación visual
    this.dashboard = new Cl_vDashboard();
  }
}
