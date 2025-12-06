import Cl_mDatos from "./Cl_mDatos.js"; // Importar el modelo de datos
export default class Cl_controlador {
    constructor(vista) {
        this.registros = []; // Lista privada para almacenar los registros
        this.vista = vista;
        this.vista.controlador = this; // Conectar la vista con el controlador
    }
    /**
     * Agregar un nuevo registro a la lista de registros.
     * @param registroData - Los datos del nuevo registro.
     * @param callback - La función de devolución de llamada para notificar el resultado.
     */
    agregarRegistro({ registroData, callback, }) {
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
        }
        catch (e) {
            // Si hay algún error durante el proceso, llamar a la función de devolución de llamada con el mensaje de error
            callback(e.message);
        }
    }
    /**
     * Devolver la lista de registros en formato JSON plano.
     * @returns La lista de registros.
     */
    datosRegistrados() {
        // Iterar sobre la lista de registros y llamar al método toJSON de cada elemento
        return this.registros.map(r => r.toJSON());
    }
}
