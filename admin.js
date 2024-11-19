// admin.js

// Obtener la lista de usuarios del localStorage
function obtenerUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    return usuarios;
}

// Guardar la lista de usuarios en el localStorage
function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Mostrar los usuarios en la interfaz
function mostrarUsuarios() {
    const usuarios = obtenerUsuarios();
    const listaUsuarios = document.getElementById("user-list");
    listaUsuarios.innerHTML = ""; // Limpiar la lista actual

    usuarios.forEach((usuario, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${usuario.email} 
            <button onclick="eliminarUsuario(${index})">Eliminar</button>`;
        listaUsuarios.appendChild(li);
    });
}

// Agregar un nuevo usuario
document.getElementById("add-user-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("new-email").value.trim();
    const password = document.getElementById("new-password").value.trim();

    if (email && password) {
        const usuarios = obtenerUsuarios();
        usuarios.push({ email, password });
        guardarUsuarios(usuarios);

        // Limpiar los campos del formulario
        document.getElementById("new-email").value = "";
        document.getElementById("new-password").value = "";

        mostrarUsuarios(); // Actualizar la lista de usuarios
    } else {
        alert("Por favor ingresa un correo y una contraseña válidos.");
    }
});

// Eliminar un usuario de la lista
function eliminarUsuario(index) {
    const usuarios = obtenerUsuarios();
    usuarios.splice(index, 1); // Eliminar el usuario en la posición index
    guardarUsuarios(usuarios);
    mostrarUsuarios(); // Actualizar la lista de usuarios
}

// Inicializar la página con los usuarios
mostrarUsuarios();
