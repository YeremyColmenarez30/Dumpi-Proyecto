// Importaciones de las clases necesarias
import Cl_controlador from "./Cl_controlador.js";   // Controlador principal que conecta modelos y vistas
import Cl_vRegistro from "./Cl_vRegistro.js";       // Vista para manejar registros
import Cl_vCategoria from "./Cl_vCategoria.js";     // Vista para manejar categorías
import Cl_mRegistro from "./Cl_mRegistro.js";       // Modelo que gestiona registros
import Cl_mCategoria from "./Cl_mCategorias.js";    // Modelo que gestiona categorías
import Cl_vDashboard from "./Cl_vDashboard.js";     // Vista del dashboard (interfaz principal)
import Cl_seedData from "./Cl_seedData.js";         // Clase para cargar datos iniciales de prueba

// Clase principal que inicializa toda la aplicación
export default class Cl_index {
  // Propiedades públicas: referencias a vistas, modelos, controlador y dashboard
  public vistaRegistro: Cl_vRegistro;
  public vistaCategoria: Cl_vCategoria;
  public modeloRegistro: Cl_mRegistro;
  public modeloCategoria: Cl_mCategoria;
  public controlador: Cl_controlador;
  public dashboard: Cl_vDashboard;

  constructor() {
    // 1. Inicializar vistas y modelos
    this.vistaRegistro = new Cl_vRegistro();       // Vista de registros
    this.vistaCategoria = new Cl_vCategoria();     // Vista de categorías
    this.modeloRegistro = new Cl_mRegistro();      // Modelo de registros
    this.modeloCategoria = new Cl_mCategoria("");  // Modelo de categorías (inicial vacío)

    // 2. Crear el controlador y conectar lógica con vistas
    this.controlador = new Cl_controlador(
      this.modeloRegistro,
      this.vistaRegistro,
      this.vistaCategoria,
      this.modeloCategoria
    );

    // 3. Cargar datos de prueba (semilla) para iniciar la aplicación con ejemplos
    Cl_seedData.cargar(this.controlador);

    // 4. Inicializar el dashboard, que controla la navegación visual de la aplicación
    this.dashboard = new Cl_vDashboard();
  }
}