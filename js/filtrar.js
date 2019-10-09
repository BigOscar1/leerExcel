class Filtrar{

    obtenerProductosCantidad(data){
        let productosExcel = data.map(function(p){return p.producto})
        const productos = productosExcel.reduce((contadorProducto,producto) => {
            contadorProducto[producto] = (contadorProducto[producto] || 0) +1;
            return contadorProducto;
        }, {})

        console.log(productos)
    }

    obtenerProductos(data){
        let productosExcel = data.map(function(p){return p.producto})
        const productos = productosExcel.reduce((contadorProducto,producto) => {
            contadorProducto[producto] = (contadorProducto[producto] || 0) +1;
            return contadorProducto;
        }, {})

        console.log(Object.keys(productos));
    }
}