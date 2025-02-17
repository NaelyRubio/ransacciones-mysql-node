const { crearVentaConProductos } = require('./dataAccess/ventaDAO');

const nuevaVenta = {
  total: 18500.00,
  iva: 2500.00
};

const productosVendidos = [
  { idProducto: 1, cantidad: 1, subtotal: 15000.00, precioVenta: 15000.00 },
  { idProducto: 2, cantidad: 2, subtotal: 701.00, precioVenta: 350.50 }
];

crearVentaConProductos(nuevaVenta, productosVendidos)
  .then((idVenta) => console.log("Venta creada con ID:", idVenta))
  .catch((err) => console.error("Error en la venta:", err));

  const pool = require('./config/db');

async function probarConexion() {
    try {
        const connection = await pool.getConnection();
        console.log(" Conexión a MySQL exitosa.");
        connection.release();
    } catch (error) {
        console.error(" Error en la conexión a MySQL:", error);
    }
}

probarConexion(); // Llamamos a la función para probar la conexión
