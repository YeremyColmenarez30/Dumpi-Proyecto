/**
 * Clase para cargar datos de prueba (seed) en la aplicación.
 * Uso: Cl_seedData.cargar(controlador);
 */
export default class Cl_seedData {
    static cargar(controlador) {
        if (!controlador)
            return;
        const ejemplos = [
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
        // Agregar cada ejemplo usando la API pública del controlador.
        for (const e of ejemplos) {
            controlador.agregarRegistro({
                registroData: e,
                callback: (error) => {
                    if (error)
                        console.warn("Seed: no se pudo agregar:", error);
                },
            });
        }
    }
}
