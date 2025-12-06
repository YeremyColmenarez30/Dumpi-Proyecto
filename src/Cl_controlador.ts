import Cl_mDatos, { iDatos } from "./Cl_mDatos.js"; // Importar el modelo de datos
import Cl_vRegistro from "./Cl_vRegistro.js"; // Importar la vista

export default class Cl_controlador {
  private registros: Cl_mDatos[] = []; // Lista privada para almacenar los registros
  public vista: Cl_vRegistro; // Propiedad para almacenar la vista

  constructor(vista: Cl_vRegistro) {
    this.vista = vista;
    this.vista.controlador = this; // Conectar la vista con el controlador
  }

  /**
   * Agregar un nuevo registro a la lista de registros.
   * @param registroData - Los datos del nuevo registro.
   * @param callback - La función de devolución de llamada para notificar el resultado.
   */
  agregarRegistro({
    registroData,
    callback,
  }: {
    registroData: iDatos;
    callback: (error: string | false) => void;
  }): void {
    try {
      // Crear una nueva instancia de Cl_mDatos a partir de los datos del registro
      const nuevoDato = new Cl_mDatos(registroData);

      // Validar el nuevo registro con el modelo Cl_mDatos
      const error = nuevoDato.error();
      if (error) {
        // Si hay algún error, llamar a la función de devolución de llamada con el error
        callback(error);
        return;
      }

      // Agregar el nuevo registro a la lista de registros
      this.registros.push(nuevoDato);

      // Llamar a la función de devolución de llamada con éxito
      callback(false);
    } catch (e: any) {
      // Si hay algún error durante el proceso, llamar a la función de devolución de llamada con el mensaje de error
      callback(e.message);
    }
  }

  /**
   * Devolver la lista de registros en formato JSON plano.
   * @returns La lista de registros.
   */
  datosRegistrados(): iDatos[] {
    // Iterar sobre la lista de registros y llamar al método toJSON de cada elemento
    return this.registros.map(r => r.toJSON());
  }
}