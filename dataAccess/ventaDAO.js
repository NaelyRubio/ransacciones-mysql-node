const pool = require('../config/db');

const crearVentaConProductos = async (venta, productos) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();


        const [ventaResult] = await connection.execute(
            'INSERT INTO Venta (Total, IVA) VALUES (?, ?)',
            [venta.total, venta.iva]
        );

        const ventaId = ventaResult.insertId;

    
        for (let producto of productos) {
            await connection.execute(
                'INSERT INTO ProductoVenta (idVenta, idProducto, CantidadVendida, Subtotal, PrecioVenta) VALUES (?, ?, ?, ?, ?)',
                [ventaId, producto.idProducto, producto.cantidad, producto.subtotal, producto.precioVenta]
            );

           
            await connection.execute(
                'UPDATE Producto SET Cantidad = Cantidad - ? WHERE ID = ?',
                [producto.cantidad, producto.idProducto]
            );
        }

        await connection.commit();
        console.log("Venta registrada exitosamente.");
        return ventaId;
    } catch (error) {
        await connection.rollback();
        console.error("Error en la transacción: ", error);
        throw error;
    } finally {
        connection.release();
    }
};

module.exports = { crearVentaConProductos };


