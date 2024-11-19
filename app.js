let productos = [];
let total = 0;
let historial = [];

// Formatear números con puntos como en Chile
function formatearMoneda(valor) {
    return new Intl.NumberFormat('es-CL').format(valor);  // Usando formato chileno
}

// Agregar producto a la lista
document.getElementById("agregar-producto").addEventListener("click", () => {
    const producto = document.querySelector("input[name='producto']").value.trim();
    const precio = parseFloat(document.querySelector("input[name='precio']").value);

    if (producto && !isNaN(precio) && precio > 0) {
        productos.push({ nombre: producto, precio: precio });
        total += precio;

        const lista = document.getElementById("lista-productos");
        const item = document.createElement("div");
        item.innerHTML = `<p>${producto} - $${formatearMoneda(precio)}</p>`;  // Usando el formato chileno
        lista.appendChild(item);

        document.querySelector("input[name='producto']").value = "";
        document.querySelector("input[name='precio']").value = "";

        actualizarTotal();
    } else {
        alert("Por favor, ingrese datos válidos.");
    }
});

// Actualizar el total
function actualizarTotal() {
    const totalDiv = document.getElementById("total");
    if (!totalDiv) {
        const nuevoTotal = document.createElement("div");
        nuevoTotal.id = "total";
        nuevoTotal.innerHTML = `<strong>Total: $${formatearMoneda(total)}</strong>`;  // Usando el formato chileno
        document.getElementById("lista-productos").appendChild(nuevoTotal);
    } else {
        totalDiv.innerHTML = `<strong>Total: $${formatearMoneda(total)}</strong>`;  // Usando el formato chileno
    }
}

// Generar cotización
document.getElementById("generar-cotizacion").addEventListener("click", () => {
    if (productos.length === 0) {
        alert("No hay productos. Agrega al menos uno.");
        return;
    }

    const cliente = document.querySelector("input[name='cliente']").value.trim();
    if (!cliente) {
        alert("Por favor, ingresa el nombre del cliente.");
        return;
    }

    const cotizacion = {
        cliente,
        productos: [...productos],
        total,
    };

    historial.push(cotizacion);
    actualizarHistorial();

    // Reiniciar formulario
    productos = [];
    total = 0;
    document.getElementById("lista-productos").innerHTML = "";
    document.querySelector("input[name='cliente']").value = "";
});

// Actualizar historial
function actualizarHistorial() {
    const historialDiv = document.getElementById("historial");
    historialDiv.innerHTML = "";
    historial.forEach((cotizacion, index) => {
        const item = document.createElement("div");
        item.innerHTML = `
            <h3>Cotización ${index + 1}</h3>
            <p>Cliente: ${cotizacion.cliente}</p>
            <p>Total: $${formatearMoneda(cotizacion.total)}</p> <!-- Usando formato chileno -->
            <ul>
                ${cotizacion.productos
                    .map((prod) => `<li>${prod.nombre} - $${formatearMoneda(prod.precio)}</li>`)  // Usando formato chileno
                    .join("")}
            </ul>
        `;
        historialDiv.appendChild(item);
    });
}

// Nueva cotización
document.getElementById("nueva-cotizacion").addEventListener("click", () => {
    location.reload();
});
