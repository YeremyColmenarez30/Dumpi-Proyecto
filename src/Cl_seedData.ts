import Cl_controlador from "./Cl_controlador.js";
import { iDatos } from "./Cl_mDatos.js";

/**
 * 🌱 Cl_seedData
 * ----------------
 * Clase utilitaria para cargar **datos de prueba (seed)** en la aplicación.
 * 
 * ➡️ Uso típico:
 *    Cl_seedData.cargar(controlador);
 * 
 * Función principal:
 *  - Insertar registros de ejemplo en el sistema a través del controlador.
 *  - Facilita pruebas iniciales sin necesidad de ingresar datos manualmente.
 */
export default class Cl_seedData {
  /**
   * Método estático `cargar`
   * ------------------------
   * - Recibe una instancia del controlador principal.
   * - Si no hay controlador, no hace nada.
   * - Define un conjunto de registros de ejemplo (ejemplos).
   * - Inserta cada registro usando la API pública del controlador.
   */
  static cargar(controlador: Cl_controlador) {
    // Validación: si no se pasa un controlador, se detiene la ejecución
    if (!controlador) return;

    /**
     * 📋 Conjunto de datos de ejemplo
     * Cada objeto sigue la interfaz iDatos:
     *  - referencia: identificador único del movimiento
     *  - concepto: descripción breve de la transacción
     *  - categoria: área a la que pertenece (ej. Ferretería, Servicios)
     *  - monto: cantidad numérica
     *  - fecha: fecha en formato YYYYMMDD
     *  - tipo: "cargo" (gasto) o "abono" (ingreso)
     */
    const ejemplos: iDatos[] = [
      {
        referencia: 1,
        concepto: "Compra materiales",
        categoria: "Ferretería",
        monto: 1500.5,
        fecha: "20251205",
        tipo: "cargo",
      },
      {
        referencia: 2,
        concepto: "Pago servicio",
        categoria: "Servicios",
        monto: 250.0,
        fecha: "20251130",
        tipo: "abono",
      },
      {
        referencia: 3,
        concepto: "Transporte",
        categoria: "Logística",
        monto: 100.0,
        fecha: "20251201",
        tipo: "cargo",
      },
    ];

    /**
     * 🔄 Inserción de ejemplos
     * - Se recorre el arreglo de ejemplos.
     * - Cada registro se agrega usando el método `agregarRegistro` del controlador.
     * - Se pasa un callback para capturar errores (ej. duplicados, validaciones).
     * - Si ocurre un error, se muestra en consola con `console.warn`.
     */
    for (const e of ejemplos) {
      controlador.agregarRegistro({
        registroData: e,
        callback: (error: string | false) => {
          if (error) console.warn("Seed: no se pudo agregar:", error);
        },
      });
    }
  }
}